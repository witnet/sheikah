import log from "app/common/logging"

import { asRuntimeType, asObject } from "app/common/runtimeTypes"
import { Wallet, ExternalFinalKey } from "app/common/runtimeTypes/storage/wallets"
import { ChainType } from "app/common/chain/chainType"
import { JsonSerializable } from "app/common/serializers/json"

import { inject } from "app/main/utils/utils"
import { AppStateS, WalletStorageS } from "app/main/system"
import * as publicKey from "app/main/crypto/key/publicKey"
import * as privateKey from "app/main/crypto/key/privateKey"
import * as key from "app/main/crypto/key/key"
import * as p2pkh from "app/main/crypto/address/p2pkh"
import * as keyPath from "app/main/crypto/keyPath"
import {
  buildGenerateAddressError,
  GenerateAddressResponse,
  GenerateAddressParams,
  GenerateAddressSuccess,
  generateAddressErrors
} from "app/common/runtimeTypes/ipc/address"

export const MAX_EXPIRATION_DATE_DIFF = 63_072_000

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
    .catch(buildGenerateAddressError)
    .then((response) => asObject(response, GenerateAddressResponse))
}

/** Parse params into the GenerateAddressParams type */
async function parseParams(params: any): Promise<GenerateAddressParams> {
  try {
    return asRuntimeType(params, GenerateAddressParams)
  } catch (e) {
    throw generateAddressErrors.WRONG_PARAMS
  }
}

/** Validate that the parsed parsed params are semantically correct */
async function validateParams(
  params: GenerateAddressParams,
  system: System
): Promise<[GenerateAddressParams, Wallet]> {
  const { account, requestedAmount, expirationDate } = params
  const wallet = system.appStateManager.state.wallet
  const now = Math.floor(Date.now() / 1000)

  if (requestedAmount && requestedAmount < 0) {
    throw generateAddressErrors.NEGATIVE_AMOUNT
  }

  if (expirationDate) {
    if (expirationDate < now) {
      throw generateAddressErrors.PAST_EXPIRATION_DATE
    }
    if (expirationDate > now + MAX_EXPIRATION_DATE_DIFF) {
      throw generateAddressErrors.TOO_FAR_EXPIRATION_DATE
    }
  }

  if (!wallet) {
    throw generateAddressErrors.NO_UNLOCKED_WALLET
  }

  if (!wallet.accounts[account]) {
    throw generateAddressErrors.WRONG_ACCOUNT
  }

  return [params, wallet]
}

/** Generate a final key, store it, and return its corresponding address  */
async function createFinalKeyAddress(
  [params, wallet]: [GenerateAddressParams, Wallet],
  system: System
): Promise<ExternalFinalKey> {
  try {
    const { account, ...metadata } = { ...params }

    const creationDate = Math.floor(Date.now() / 1000)
    // const account = params.account
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
    const keyPathStruct = keyPath.fromString(path)
    const extendedFinalPublicKey = publicKey.create(extendedFinalPrivateKey)
    const address = p2pkh.encode(extendedFinalPublicKey.key, ChainType.test)
    const pkh = p2pkh.decode(address)[1]
    const externalFinalPrivKey: ExternalFinalKey = {
      kind: "external",
      extendedKey: {
        type: "private",
        chainCode: extendedFinalPrivateKey.chainCode,
        key: extendedFinalPrivateKey.key.bytes
      },
      keyPath: keyPathStruct,
      pkh,
      metadata: {
        ...metadata,
        creationDate
      }
    }

    finalKeys.push(externalFinalPrivKey)
    system.appStateManager.update({
      wallet
    })
    const storage = system.walletStorage.storage
    if (storage) {
      await storage.put("wallet", asObject(wallet, Wallet))
    }

    return externalFinalPrivKey
  } catch (e) {
    log.error(e)
    throw generateAddressErrors.GENERIC_IPC_ERROR
  }
}

/** Build the response GenerateAddressSuccess type  */
async function resultAsResponse(finalKey: ExternalFinalKey): Promise<GenerateAddressSuccess> {
  return {
    kind: "SUCCESS",
    finalKey
  }
}
