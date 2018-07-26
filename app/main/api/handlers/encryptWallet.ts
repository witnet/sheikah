import { SubSystems } from "app/main/system"
import { asRuntimeType } from "app/common/runtimeTypes"
import {
  EncryptWalletParams,
  EncryptWalletResponse,
  encryptWalletErrors
} from "app/common/runtimeTypes/ipc/wallets"
import { AesCipher, AesCipherSettings, defaultAesCipherSettings } from "app/main/ciphers/aes"
import { jsonBufferSerializer } from "app/main/serializers/jsonBuffer"
import { LevelPersister } from "app/main/persisters/level"
import * as path from "path"
import { homedir } from "os"
import { ensurePath } from "app/main/storage/utils"
import * as level from "level"
import { JsonAesLevelStorage } from "app/main/subsystems/jsonAesLevel"
import { Storage } from "app/main/storage"
import { sha256BufferHasher } from "app/main/hashers/sha256Buffer"
import {
  ExtendedKey,
  Wallet,
  WalletInfo,
  UnconsolidatedWallet,
  Seed,
  Wip3SeedInfo,
  KeyPath,
} from "app/common/runtimeTypes/storage/wallets"
import * as assert from "assert"
import * as CryptoSeed from "app/main/crypto/seed"
import * as PrivateKey from "app/main/crypto/key/privateKey"
import { ExtendedKey as CryptoExtendedKey } from "app/main/crypto/key/key"
import * as AccountFactory from "app/common/factories/account"
import { JsonSerializable } from "app/common/serializers"

/**
 * Handler function for "encryptWallet" method.
 * @param {SubSystems} system
 * @param params
 * @returns {Promise<void>}
 */
export default async function encryptWallet(system: SubSystems, params: any):
  Promise<JsonSerializable> {

  return Promise.all([
    Promise.resolve(params)
      .then((p) => {
        try {
          return asRuntimeType(params, EncryptWalletParams)
        } catch (error) {
          throw encryptWalletErrors.WRONG_TYPE_PARAMS.value
        }
      })
      .then(async (encryptWalletParams) => {
        try {
          return {encryptWalletParams, walletStorage: await newWalletStorage(encryptWalletParams)}
        } catch (error) {
          throw encryptWalletErrors.STORAGE_CREATION_FAILURE.value
        }
      }),
    Promise.resolve()
      .then(() => {
        try {
          return system.appStateManager.get("unconsolidatedWallet")
        } catch (error) {
          throw encryptWalletErrors.INVALID_KEY.value
        }
      })
      .then((unconsolidatedWallet) => {
        try {
          return asRuntimeType(unconsolidatedWallet, UnconsolidatedWallet)
        } catch (error) {
          throw encryptWalletErrors.WRONG_UNCONSOLIDATED_WALLET.value
        }
    })
  ]).then(([vars, unconsolidatedWallet]) => {
    try {
      assert(vars.encryptWalletParams.id === unconsolidatedWallet.id, "Invalid encrypted wallet ID")

      return {...vars, unconsolidatedWallet}
    } catch (error) {
      throw encryptWalletErrors.INVALID_WALLET_ID.value
    }
  }).then((vars) => {
    try {
      return {
        ...vars,
        wallet: newWallet(system, vars.encryptWalletParams, vars.unconsolidatedWallet)
      }
    } catch (error) {
      throw encryptWalletErrors.WALLET_CREATION_FAILURE.value
    }
  }).then((vars) => {
    try {
      return {...vars, storage: Wallet.encode(vars.wallet)}
    } catch (error) {
      throw encryptWalletErrors.ENCODE_FAILURE.value
    }
  }).then(async (vars) => Promise.all([
    Promise.resolve(vars)
      .then(async (vars) => {
        try {
          await vars.walletStorage.put("wallet", vars.storage)

          return vars
        } catch (error) {
          throw encryptWalletErrors.WALLET_STORE_FAILURE.value
        }
    }),
    Promise.resolve(vars)
      .then(async (vars) => {
        try {
          await system.walletStorage.replace(vars.walletStorage)
        } catch (error) {
            throw encryptWalletErrors.WALLET_REPLACE_FAILURE.value
        }
    })
    ])).then(([ vars ]) => {
      system.appStateManager.update({unconsolidatedWallet: {} as UnconsolidatedWallet})

      return vars
    }).then((vars) => {
      return {
        kind: "SUCCESS",
        wallet: vars.wallet
      } as EncryptWalletResponse
  }).catch((e) => {
      return {
        kind: "ERROR",
        error: e
      } as EncryptWalletResponse
  })
}

/**
 * Generate a new wallet.
 * @param system
 * @param encryptWalletParams
 * @param unconsolidatedWallet
 */
function newWallet(system: SubSystems,
  encryptWalletParams: EncryptWalletParams,
  unconsolidatedWallet: UnconsolidatedWallet): Wallet {

  const privateKey = newPrivateKey(unconsolidatedWallet.mnemonics)
  const walletInfo: WalletInfo = {
    id: encryptWalletParams.id,
    caption: encryptWalletParams.caption || newCaption(system)
  }
  const seed: Seed = {
    masterSecret: privateKey.key.bytes,
    chainCode: privateKey.chainCode
  }
  const seedInfo: Wip3SeedInfo = {
    kind: "Wip3",
    mnemonics: unconsolidatedWallet.mnemonics,
    seed
  }
  const extendedKey: ExtendedKey = {
    type: "private",
    key: privateKey.key.bytes,
    chainCode: privateKey.chainCode
  }
  const path = "m/3'/4919'/0'"
  const account = createAccount(path, extendedKey)

  return {
    ...walletInfo,
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
 * Generate private key from mnemonics.
 * @param mnemonics
 */
function newPrivateKey(mnemonics: string): CryptoExtendedKey<PrivateKey.PrivateKey> {
  const {masterSecret, chainCode} = CryptoSeed.fromMnemonics(mnemonics)

  return PrivateKey.extend(PrivateKey.fromBytes(masterSecret), chainCode)
}

/**
 * Generate default caption.
 * @param {SubSystems} system
 * @returns {string}
 */
function newCaption(system: SubSystems) {
  const index = system.appStateManager.state.wallets.length as number + 1

  return `Wallet #${index}`
}

/**
 * Create account.
 * @param keyPath
 * @param extendedKey
 */
function createAccount(keyPath: string, extendedKey: ExtendedKey) {
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
function createKeyChain(keyPath: string) {
  return AccountFactory.createKeyChain(asKeyPath(keyPath), [])
}

/**
 * Wrapper around asRuntimeType for KeyPath.
 * @param keyPath
 */
function asKeyPath(keyPath: string) {
  return asRuntimeType(keyPath, KeyPath)
}

/**
 * Create a new wallet storage.
 * @param {EncryptWalletParams} params
 * @returns {Promise<JsonAesLevelStorage>}
 */
async function newWalletStorage(params: EncryptWalletParams): Promise<JsonAesLevelStorage> {
  const aesSettings: AesCipherSettings = {
    ...defaultAesCipherSettings,
    pbkdPassword: params.password
  }

  const connection = await getConnection(params.id)
  const keyHasher = sha256BufferHasher
  const serializer = jsonBufferSerializer
  const cipher = new AesCipher(aesSettings)
  const persister = new LevelPersister(connection)

  return new Storage(keyHasher, serializer, cipher, persister)
}

/**
 * Create a new connection to level db.
 * @param {string} id
 * @returns {Promise<levelup.LevelUp>}
 */
async function getConnection(id: string) {
  // Compose the absolute path of the LevelDB directory
  const dbPath = path.normalize(`${homedir()}/.sheikah/storage/${id}`)

  // Ensure the path exists
  await ensurePath(dbPath)

  // Create the LevelDB connection
  return level(dbPath, {
    keyEncoding: "binary",
    valueEncoding: "binary"
  })
}