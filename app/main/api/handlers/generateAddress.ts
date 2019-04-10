import { asRuntimeType, asObject } from "app/common/runtimeTypes"
import { Wallet, ExternalFinalKey } from "app/common/runtimeTypes/storage/wallets"
import { JsonSerializable } from "app/common/serializers/json"

import { inject } from "app/main/utils/utils"
import { AppStateS, WalletStorageS } from "app/main/system"
import * as publicKey from "app/main/crypto/key/publicKey"
import * as privateKey from "app/main/crypto/key/privateKey"
import * as key from "app/main/crypto/key/key"
import * as keyPath from "app/main/crypto/keyPath"
import {
  buildGenerateAddressError,
  GenerateAddressResponse,
  GenerateAddressParams,
  GenerateAddressSuccess,
  generateAddressErrors,
} from "app/common/runtimeTypes/ipc/address"

import { computePkh } from "app/main/crypto/address/p2pkh"

// Maximum expiration date difference is set to 2 years
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  system: System, params: any
): Promise<JsonSerializable> {
  return Promise.resolve(params)
    .then(parseParams)
    .then(inject(validateParams, system))
    .then(createFinalKeyAddress)
    .then(inject(updateWallet, system))
    .then(inject(storeWallet, system))
    .then(resultAsResponse)
    .catch(buildGenerateAddressError)
    .then((response) => asObject(response, GenerateAddressResponse))
}

/** Parse params into the GenerateAddressParams type */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  if (requestedAmount !== undefined && requestedAmount <= 0) {
    throw generateAddressErrors.NON_POSITIVE_AMOUNT
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
  [params, wallet]: [GenerateAddressParams, Wallet]
): Promise<[ExternalFinalKey, Wallet]> {
  try {
    const { account, ...metadata } = { ...params }

    const creationDate = Math.floor(Date.now() / 1000)
    const seed = wallet.seed.seed
    const masterKey: key.ExtendedKey<privateKey.PrivateKey> = {
      chainCode: seed.chainCode,
      key: {
        type: "private",
        bytes: seed.masterSecret,
      },
    }
    const finalKeys = wallet.accounts[account].keyChains[0].finalKeys
    const finalKeyIndex = finalKeys.length
    const path = `m/3'/4919'/${account}'/0/${finalKeyIndex}`
    const extendedFinalPrivateKey = privateKey.derive(masterKey, path)
    const keyPathStruct = keyPath.fromString(path)
    const extendedFinalPublicKey = publicKey.create(extendedFinalPrivateKey)
    const pkh = computePkh(extendedFinalPublicKey.key)

    // If label is undefined, then set it to Payment request #${k+1}
    metadata.label = metadata.label || `Payment request #${finalKeyIndex + 1}`

    const externalFinalPrivKey: ExternalFinalKey = {
      kind: "external",
      extendedKey: {
        type: "private",
        chainCode: extendedFinalPrivateKey.chainCode,
        key: extendedFinalPrivateKey.key.bytes,
      },
      keyPath: keyPathStruct,
      pkh,
      metadata: {
        ...metadata,
        creationDate,
      },
    }
    finalKeys.push(externalFinalPrivKey)

    return [externalFinalPrivKey, wallet]
  } catch (e) {
    throw generateAddressErrors.ADDRESS_GENERATION_FAILURE
  }
}

/** Update the wallet in the app state */
async function updateWallet(
  [finalKey, wallet]: [ExternalFinalKey, Wallet],
  system: System
): Promise<[ExternalFinalKey, Wallet]> {
  try {
    system.appStateManager.update({
      wallet,
    })

    return [finalKey, wallet]
  } catch (e) {
    throw generateAddressErrors.WALLET_UPDATE_FAILURE
  }
}

/** Store the wallet in the system storage */
async function storeWallet(
  [finalKey, wallet]: [ExternalFinalKey, Wallet],
  system: System
): Promise<ExternalFinalKey> {
  try {
    const storage = system.walletStorage.storage
    if (storage) {
      await storage.put("wallet", asObject(wallet, Wallet))
    }

    return finalKey
  } catch (e) {
    throw generateAddressErrors.WALLET_STORE_FAILURE
  }
}

/** Build the response GenerateAddressSuccess type  */
async function resultAsResponse(finalKey: ExternalFinalKey): Promise<GenerateAddressSuccess> {
  return {
    kind: "SUCCESS",
    finalKey,
  }
}
