import { Wallet, Account, KeyChain } from "app/common/runtimeTypes/storage/wallets"
import { ChainType } from "app/common/chain/chainType"
import { WalletStorage } from "app/main/subsystems/wallets"
// import createJsonAesLevelStorage from "app/main/storage/jsonAesLevel"
import * as privKey from "app/main/crypto/key/privateKey"
import * as pubKey from "app/main/crypto/key/publicKey"
import * as p2pkh from "app/main/crypto/address/p2pkh"
import { generateAddress } from "app/main/api/handlers"
import { AppStateManager } from "app/main/appState"

import { JsonSerializable } from "app/common/serializers/json"
import { PlainCipher } from "app/main/ciphers/plain"
import { InMemoryPersister } from "app/main/persisters/inMemory"
import { Storage } from "app/main/storage"
import { jsonBufferSerializer } from "app/main/serializers/jsonBuffer"
import { sha256BufferHasher } from "app/main/hashers/sha256Buffer"

describe("GenerateAddress Handler", () => {
  global.Date.now = jest.fn(() => 0)

  const keyChain: KeyChain = {
    kind: "external",
    keyPath: [1, 2, 3],
    finalKeys: []
  }

  const account: Account = {
    keyPath: [1, 2, 3],
    keyChains: [keyChain],
    balance: 0
  }

  const masterSecret = Buffer.alloc(32)
  const chainCode = Buffer.alloc(32)
  const wallet: Wallet = {
    _v: 1,
    id: "123",
    caption: "test wallet",
    seed: { kind: "Wip3", seed: { masterSecret, chainCode } },
    epochs: { last: 123 },
    purpose: 0x80000003,
    accounts: [account]
  }

  const keyHasher = sha256BufferHasher
  const serializer = jsonBufferSerializer
  const cipher = new PlainCipher<Buffer>()
  const persister = new InMemoryPersister()

  const plainMemoryStorage = new Storage<Buffer, JsonSerializable, Buffer, Buffer>(
    keyHasher, serializer, cipher, persister)

  const noWalletSystem = {
    appStateManager: new AppStateManager(),
    walletStorage: new WalletStorage(),
    storageFactory: async () => plainMemoryStorage
  }

  const system = {
    appStateManager: new AppStateManager({ wallet }),
    walletStorage: new WalletStorage(),
    storageFactory: async () => plainMemoryStorage
  }

  it("should respond with WRONG_PARAMS if request isn't valid", async () => {
    const params = "invalid params"
    const expected = {
      kind: "ERROR",
      error: "WRONG_PARAMS"
    }
    const response = await generateAddress(system, params)

    expect(response).toMatchObject(expected)
  })

  it("should respond with NEGATIVE_AMOUNT if amount < 0", async () => {
    const params = { account: 0, amount: -1 }
    const expected = {
      kind: "ERROR",
      error: "NEGATIVE_AMOUNT"
    }
    const response = await generateAddress(system, params)

    expect(response).toMatchObject(expected)
  })

  it("should respond with PAST_EXPIRATION_DATE if date expired", async () => {
    const params = { account: 0, expirationDate: -1 }
    const expected = {
      kind: "ERROR",
      error: "PAST_EXPIRATION_DATE"
    }
    const response = await generateAddress(system, params)

    expect(response).toMatchObject(expected)
  })

  it("should respond with TOO_FAR_EXPIRATION_DATE if date not valid", async () => {
    const params = { account: 0, expirationDate: 31_536_000_001 }
    const expected = {
      kind: "ERROR",
      error: "TOO_FAR_EXPIRATION_DATE"
    }
    const response = await generateAddress(system, params)

    expect(response).toMatchObject(expected)
  })

  it("should respond with NO_UNLOCKED_WALLET if no wallet is present", async () => {
    const params = { account: 0 }
    const expected = {
      kind: "ERROR",
      error: "NO_UNLOCKED_WALLET"
    }
    const response = await generateAddress(noWalletSystem, params)

    expect(response).toMatchObject(expected)
  })

  it("should respond with WRONG_ACCOUNT if account doesn't exist", async () => {
    const params = { account: 1 }
    const expected = {
      kind: "ERROR",
      error: "WRONG_ACCOUNT"
    }
    const response = await generateAddress(system, params)

    expect(response).toMatchObject(expected)
  })

  it("should respond with the generated address and put it in the storage", async () => {
    const params = { account: 0, amount: 20, expirationDate: 1 }
    const keyPath = `m/3'/4919'/0'/0/0`
    const masterKey = {
      chainCode,
      key: {
        type: "private" as "private",
        bytes: masterSecret
      }
    }
    const address = p2pkh.encode(
      pubKey.create(privKey.derive(masterKey, keyPath)).key,
      ChainType.test
    )
    const expected = {
      kind: "SUCCESS",
      creationDate: 0,
      keyPath,
      address
    }
    await system.walletStorage.replace(plainMemoryStorage)
    const response = await generateAddress(system, params)

    expect(response).toMatchObject(expected)
    expect(keyChain.finalKeys.length).toBe(1)
    expect(system.walletStorage.storage).toBeTruthy()

    if (system.walletStorage.storage) {
      const wallet = await system.walletStorage.storage.get("wallet")

      expect(wallet).toMatchObject({
        caption: "test wallet",
        accounts: [{
          balance: 0,
          keyChains: [{
            keyPath: "m/1/2/3",
            kind: "external",
            finalKeys: [{
              extendedKey: {
                chainCode: "f55975c2fda883d73495932af3974762003dfd715505ea262b1fa3105e157e04",
                key: "15ac4f758a96f6606e36db3922432cc3ee81a6c7e23169164e5eeeedfcc5b7a5",
                type: "private"
              },
              keyPath: "m/3'/4919'/0'/0/0",
              kind: "external",
              metadata: {
                creationDate: 0,
                requestedAmount: 20,
                expirationDate: 1
              },
              pkh: "1c31abe5cefb699ec7a787d3ad1f1105ee851a2e"
            }]
          }]
        }]
      })
    }
  })
})
