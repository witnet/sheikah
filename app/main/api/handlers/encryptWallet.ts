import { AppStateS, WalletStorageS } from "app/main/system"
import { asRuntimeType, asObject } from "app/common/runtimeTypes"
import {
  EncryptWalletParams,
  EncryptWalletResponse,
  encryptWalletErrors,
  EncryptWalletError
} from "app/common/runtimeTypes/ipc/wallets"
import { JsonAesLevelStorage } from "app/main/subsystems/jsonAesLevel"
import { Storage } from "app/main/storage"
import {
  ExtendedKey,
  Wallet,
  WalletInfo,
  UnconsolidatedWallet,
  Seed,
  Wip3SeedInfo,
  KeyPath,
  KeyChain,
  Account,
  CURRENT_WALLET_VERSION
} from "app/common/runtimeTypes/storage/wallets"
import * as AccountFactory from "app/common/factories/account"
import { JsonSerializable } from "app/common/serializers"
import * as t from "io-ts"
import { inject, asType } from "app/main/utils/utils"
import { AppStateManager } from "app/main/appState"
import * as crypto from "crypto"
import { config } from "app/common/config"

/**
 * Handler function for "encryptWallet" method.
 * @param {SubSystems} system
 * @param params
 * @returns {Promise<void>}
 */
export default async function encryptWallet(system: AppStateS & WalletStorageS, params: any):
  Promise<JsonSerializable> {

  return parseParams(params)
    .then(async (p) => Promise.all([
      Promise.resolve(p)
        .then(inject(newWalletStorage, system.storageFactory)),
      Promise.resolve(p)
        .then(inject(getUnconsolidatedData, system.appStateManager))
        .then(inject(newWallet, system.appStateManager))
    ]))
    .then(storeWallet)
    .then(inject(replaceWallet, system))
    .then(buildSuccessResponse)
    .catch(buildErrorResponse)
    .then(encodeResponse)
}

/**
 * Wrapper around asType to parse params as EncryptWalletParams
 */
async function parseParams(params: any): Promise<EncryptWalletParams> {
  return asType(params, EncryptWalletParams, encryptWalletErrors.WRONG_TYPE_PARAMS)
}

/** Data required to build a wallet, union of WalletParams and UnconsolidatedWallet */
type UnconsolidatedData = { password: string, caption: string, seed: Seed }
/**
 * Update and validate unconsolidated wallet
 * @param params
 * @param appStateManager
 */
function getUnconsolidatedData(params: EncryptWalletParams, appStateManager: AppStateManager):
  UnconsolidatedData {

  if (!appStateManager.state.unconsolidatedWallet) {
    throw encryptWalletErrors.UNAVAILABLE_UNCONSOLIDATED_WALLET
  }
  if (appStateManager.state.unconsolidatedWallet.seed === undefined) {
    throw encryptWalletErrors.INVALID_SEED
  }

  return {
    ...params,
    caption: params.caption || newCaption(appStateManager.state.wallets.infos.length),
    seed: appStateManager.state.unconsolidatedWallet.seed
  }
}

/**
 * Stores wallet in WalletStorage.
 */
async function storeWallet([walletStorage, wallet]: [JsonAesLevelStorage, Wallet]) {
  try {
    const storableWallet = Wallet.encode(wallet)
    await walletStorage.put("wallet", storableWallet)

    return { walletStorage, wallet }
  } catch (error) {
    throw encryptWalletErrors.WALLET_STORE_FAILURE
  }
}

/**
 * Replaces the walletStorage and remove the unconsolidated wallet.
 */
async function replaceWallet(
  { walletStorage, wallet }: { walletStorage: JsonAesLevelStorage, wallet: Wallet },
  system: AppStateS & WalletStorageS
): Promise<Wallet> {

  try {
    await system.walletStorage.replace(walletStorage)
    // as the wallet has been stored with success the unconsolidated wallet is removed
    system.appStateManager.update({ unconsolidatedWallet: {} as UnconsolidatedWallet })

    return wallet
  } catch  {
    throw encryptWalletErrors.WALLET_REPLACE_FAILURE
  }
}

/**
 * Builds a success response.
 * @param wallet
 */
function buildSuccessResponse(wallet: Wallet): EncryptWalletResponse {
  return {
    kind: "SUCCESS",
    wallet
  }
}

/**
 * Builds an error response.
 * @param error
 */
function buildErrorResponse(error: t.LiteralType<EncryptWalletError["error"]>):
  EncryptWalletResponse {
  return {
    kind: "ERROR",
    error: error.value
  }
}

/**
 * Encodes a response as JsonSerializable.
 * @param response
 */
function encodeResponse(response: EncryptWalletResponse): JsonSerializable {
  return asObject(response, EncryptWalletResponse)
}

/**
 * Generate a new wallet.
 * @param appStateManage
 * @param encryptWalletParams
 * @param unconsolidatedWallet
 */
function newWallet(
  { password, caption, seed }: UnconsolidatedData,
  appStateManager: AppStateManager
): Wallet {

  const walletInfo: WalletInfo = {
    id: generateId(seed),
    caption
  }
  const seedInfo: Wip3SeedInfo = {
    kind: "Wip3",
    seed
  }
  const extendedKey: ExtendedKey = {
    type: "private",
    key: seed.masterSecret,
    chainCode: seed.chainCode
  }
  const path = "m/3'/4919'/0'"
  const account = createAccount(path, extendedKey)

  return {
    ...walletInfo,
    _v: CURRENT_WALLET_VERSION,
    seed: seedInfo,
    epochs: {
      last: 0,
      born: 0,
    },
    purpose: 0x80000003,
    accounts: [account]
  }
}

/**
 * Generate default caption.
 * @param {SubSystems} system
 * @returns {string}
 */
function newCaption(index: number): string {
  return `Wallet #${index + 1}`
}

/**
 * Create account.
 * @param keyPath
 * @param extendedKey
 */
function createAccount(keyPath: string, extendedKey: ExtendedKey): Account {
  const externalKeyChain = createKeyChain(`${keyPath}/0`)
  const internalKeyChain = createKeyChain(`${keyPath}/1`)
  // rad => retrieve, attest, deliver
  const radKeyChain = createKeyChain(`${keyPath}/2`)
  const keyChains = [externalKeyChain, internalKeyChain, radKeyChain]

  return AccountFactory.createAccount(asKeyPath(keyPath), keyChains)
}

/**
 * Create key chain.
 * @param keyPath
 */
function createKeyChain(keyPath: string): KeyChain {
  return AccountFactory.createKeyChain(asKeyPath(keyPath), [])
}

/**
 * Wrapper around asRuntimeType for KeyPath.
 * @param keyPath
 */
function asKeyPath(keyPath: string): KeyPath {
  return asRuntimeType(keyPath, KeyPath)
}

/**
 * Create a new wallet storage.
 * @param {EncryptWalletParams} params
 * @returns {Promise<JsonAesLevelStorage>}
 */
async function newWalletStorage(
  params: EncryptWalletParams,
  storageFactory: WalletStorageS["storageFactory"]
): Promise<Storage<Buffer, JsonSerializable, Buffer, Buffer>> {

  try {
    return storageFactory(params)
  } catch {
    throw encryptWalletErrors.STORAGE_CREATION_FAILURE
  }
}

/**
 * Generate an id string given a mnemonics string.
 * @param mnemonics
 */
function generateId(seed: Seed): string {
  try {
    return crypto.pbkdf2Sync(
      Buffer.concat([seed.chainCode, seed.masterSecret]),
      config.mnemonicsIdGeneration.salt,
      config.mnemonicsIdGeneration.hashIterations,
      config.mnemonicsIdGeneration.keyByteLength,
      config.mnemonicsIdGeneration.hashFunctionName
    ).toString("hex")
  } catch { throw encryptWalletErrors.ID_GENERATION_ERROR }
}