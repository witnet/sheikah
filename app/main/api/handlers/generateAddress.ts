import log from "app/common/logging"

import { asRuntimeType, asObject } from "app/common/runtimeTypes"
import { Wallet, KeyPath } from "app/common/runtimeTypes/storage/wallets"
import { ChainType } from "app/common/chain/chainType"
import { JsonSerializable } from "app/common/serializers/json"

import { inject } from "app/main/utils/utils"
import { AppStateS, WalletStorageS } from "app/main/system"
import * as publicKey from "app/main/crypto/key/publicKey"
import * as privateKey from "app/main/crypto/key/privateKey"
import * as key from "app/main/crypto/key/key"
import * as p2pkh from "app/main/crypto/address/p2pkh"
import * as keyPath from "app/main/crypto/keyPath"
import * as t from "app/common/runtimeTypes/ipc/address"

type System = AppStateS & WalletStorageS

/**
 * Handler function for "generateAddress" method.
 *
 * @export
 * @param {System} system
 * @param {any} params
 * @returns {Promise<JsonSerializable>}
 */
export default async function generateAddress(
  system: System, params: any
): Promise<JsonSerializable> {
  return Promise.resolve(params)
    .then(parseParams)
    .then(inject(validateParams, system))
    .then(inject(createFinalKeyAddress, system))
    .then(resultAsResponse)
    .catch(t.buildGenerateAddressError)
    .then((response) => asObject(response, t.GenerateAddressResponse))
}

/** Parse params into the GenerateAddressParams type */
async function parseParams(params: any): Promise<t.GenerateAddressParams> {
  try {
    return asRuntimeType(params, t.GenerateAddressParams)
  } catch (e) {
    throw t.generateAddressErrors.WRONG_PARAMS
  }
}

/** Validate that the parsed parsed params are semantically correct */
async function validateParams(
  params: t.GenerateAddressParams,
  system: System
): Promise<[t.GenerateAddressParams, Wallet]> {
  const { account, amount, expirationDate } = params
  const wallet = system.appStateManager.state.wallet
  const now = Date.now()

  if (amount && amount < 0) {
    throw t.generateAddressErrors.NEGATIVE_AMOUNT
  }

  if (expirationDate) {
    if (expirationDate < now) {
      throw t.generateAddressErrors.PAST_EXPIRATION_DATE
    }
    if (expirationDate > now + 31_536_000_000) {
      throw t.generateAddressErrors.TOO_FAR_EXPIRATION_DATE
    }
  }

  if (!wallet) {
    throw t.generateAddressErrors.NO_UNLOCKED_WALLET
  }

  if (!wallet.accounts[account]) {
    throw t.generateAddressErrors.WRONG_ACCOUNT
  }

  return [params, wallet]
}

/** Generate a final key, store it, and return its corresponding address  */
async function createFinalKeyAddress(
  [params, wallet]: [t.GenerateAddressParams, Wallet],
  system: System
): Promise<[KeyPath, string, number]> {
  try {
    const creationDate = Date.now()
    const account = params.account
    const seed = wallet.seed.seed
    const masterKey: key.ExtendedKey<privateKey.PrivateKey> = {
      chainCode: seed.chainCode,
      key: {
        type: "private",
        bytes: seed.masterSecret
      }
    }
    const finalKeys = wallet.accounts[account].keyChains[0].finalKeys
    const finalKeyIndex = finalKeys.length
    const path = `m/3'/4919'/${account}'/0/${finalKeyIndex}`
    const extendedFinalPrivateKey = privateKey.derive(masterKey, path)
    const finalPrivateKeyPath = keyPath.fromString(path)
    const extendedFinalPublicKey = publicKey.create(extendedFinalPrivateKey)
    const address = p2pkh.encode(extendedFinalPublicKey.key, ChainType.test)
    const pkh = p2pkh.decode(address)[1]

    finalKeys.push({
      kind: "external",
      extendedKey: {
        type: "private",
        chainCode: extendedFinalPrivateKey.chainCode,
        key: extendedFinalPrivateKey.key.bytes
      },
      keyPath: finalPrivateKeyPath,
      pkh,
      metadata: {
        label: params.label,
        requestedAmount: params.amount,
        expirationDate: params.expirationDate,
        creationDate
      }
    })
    system.appStateManager.update({
      wallet
    })
    const storage = system.walletStorage.storage
    if (storage) {
      await storage.put("wallet", asObject(wallet, Wallet))
    }

    return [finalPrivateKeyPath, address, creationDate]
  } catch (e) {
    log.error(e)
    throw t.generateAddressErrors.GENERIC_IPC_ERROR
  }
}

/** Build the response GenerateAddressSuccess type  */
async function resultAsResponse(
  [keyPath, address, creationDate]: [KeyPath, string, number]
): Promise<t.GenerateAddressSuccess> {
  return {
    kind: "SUCCESS",
    keyPath,
    address,
    creationDate
  }
}
