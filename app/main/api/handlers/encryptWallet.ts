import { AppStateS, WalletStorageS, AppStorageS } from "app/main/system"
import { asObject } from "app/common/runtimeTypes"
import {
  EncryptWalletParams,
  EncryptWalletResponse,
  encryptWalletErrors,
  EncryptWalletError
} from "app/common/runtimeTypes/ipc/wallets"
import { JsonAesLevelStorage } from "app/main/subsystems/jsonAesLevel"
import {
  ExtendedKey,
  Wallet,
  WalletInfos,
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
export default async function encryptWallet(
  system: AppStateS & WalletStorageS & AppStorageS, params: any
): Promise<JsonSerializable> {

  return parseParams(params)
    .then(inject(getUnconsolidatedData, system.appStateManager))
    .then(newWallet)
    .then(inject(newWalletStorage, system.storageFactory))
    .then(storeWallet)
    .then(inject(replaceWallet, system))
    .then(inject(storePlainInfo, system))
    .then(buildSuccessResponse)
    .catch(buildErrorResponse)
    .then(encodeResponse)
}

/**
 * Wrapper around asType to parse params as EncryptWalletParams
 */
async function parseParams(params: any): Promise<EncryptWalletParams> {
  return asType(params, EncryptWalletParams, encryptWalletErrors.INVALID_METHOD_PARAMS)
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
    caption: params.caption || newCaption(appStateManager.state.walletInfos.infos.length),
    seed: appStateManager.state.unconsolidatedWallet.seed
  }
}

/**
 * Stores wallet in WalletStorage.
 */
async function storeWallet(
  { walletStorage, wallet }: { walletStorage: JsonAesLevelStorage, wallet: Wallet }
) {
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
 * Store plain info
 * @param wallet
 * @param system
 */
async function storePlainInfo(wallet: Wallet, system: AppStorageS & AppStateS) {
  const walletInfos = asType(
    system.appStateManager.get("walletInfos"),
    WalletInfos,
    encryptWalletErrors.UNAVAILABLE_WALLET_INFOS
  )
  const walletInfosUpdate = {
    _v: walletInfos._v,
    infos: walletInfos.infos.concat({ id: wallet.id, caption: wallet.caption })
  }
  try {
    system.appStateManager.update({ walletInfos: walletInfosUpdate })
    await system.appStorage.put("walletInfos", walletInfosUpdate)
  } catch {
    throw encryptWalletErrors.WALLET_PLAIN_STORAGE_FAILURE
  }

  return wallet
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
) {

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
  const wallet: Wallet = {
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

  return { wallet, password }
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
  const externalKeyChain = createKeyChain("external", `${keyPath}/0`)
  const internalKeyChain = createKeyChain("internal", `${keyPath}/1`)
  // rad => retrieve, attest, deliver
  const radKeyChain = createKeyChain("rad", `${keyPath}/2`)
  const keyChains = [externalKeyChain, internalKeyChain, radKeyChain]

  return AccountFactory.createAccount(asKeyPath(keyPath), keyChains)
}

/**
 * Create key chain.
 * @param keyPath
 */
function createKeyChain(kind: KeyChain["kind"], keyPath: string): KeyChain {
  return AccountFactory.createKeyChain(kind, asKeyPath(keyPath), [])
}

/**
 * Wrapper around asRuntimeType for KeyPath.
 * @param keyPath
 */
function asKeyPath(keyPath: string): KeyPath {
  return asType(keyPath, KeyPath, encryptWalletErrors.INVALID_KEY_PATH)
}

/**
 * Create a new wallet storage.
 * @param {EncryptWalletParams} params
 * @returns {Promise<JsonAesLevelStorage>}
 */
async function newWalletStorage(
  { wallet, password }: { wallet: Wallet, password: string },
  storageFactory: WalletStorageS["storageFactory"]
) {
  try {
    const walletStorage: JsonAesLevelStorage = await storageFactory({ id: wallet.id, password })

    return { walletStorage, wallet }
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
      config.walletIdGeneration.salt,
      config.walletIdGeneration.hashIterations,
      config.walletIdGeneration.keyByteLength,
      config.walletIdGeneration.hashFunctionName
    ).toString("hex")
  } catch { throw encryptWalletErrors.ID_GENERATION_ERROR }
}
