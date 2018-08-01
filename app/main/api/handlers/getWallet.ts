import { LiteralType } from "io-ts"

import { asRuntimeType, asObject } from "app/common/runtimeTypes"
import { inject } from "app/main/utils/utils"
import { SubSystems } from "app/main/system"
import { JsonSerializable } from "app/common/serializers/json"
import { WalletInfo, Wallet } from "app/common/runtimeTypes/storage/wallets"
import { Storage } from "app/main/storage"
import {
  GetWalletError, GetWalletParams, GetWalletResponse, GetWalletSucccess, getWalletErrors,
  GetWalletErrors
} from "app/common/runtimeTypes/ipc/wallets"

/**
 * Handler function for "getWallet" method.
 *
 * @export
 * @param {SubSystems} system
 * @param {GetWalletParams} params
 * @returns {Promise<JsonSerializable>}
 */
export default async function getWallet(
  system: SubSystems, params: any
): Promise<JsonSerializable> {
  return Promise.resolve({ params })
    .then(parseParams)
    .then(inject(checkWalletInfo, system))
    .then(inject(replaceStorage, system))
    .then(searchWallet)
    .then(encodeResponse)
    .catch(buildError)
}

/**
 * search wallet info in state
 *
 * @param {Array<WalletInfo>} wallets
 * @param {string} id
 * @returns {(WalletInfo | undefined)}
 */
function searchWalletInfo(wallets: Array<WalletInfo>, id: string): WalletInfo | undefined {
  return wallets.find((wallet: WalletInfo) => wallet.id === id)
}

/**
 * check if params type matches GetWalletParams runtime type
 *
 * @param {{ params: any }} { params }
 * @returns {GetWalletParams}
 */
function parseParams({ params }: { params: any }): GetWalletParams {
  try {
    return asRuntimeType(params, GetWalletParams)
  } catch (error) {
    throw getWalletErrors.INVALID_PARAMS_TYPE
  }
}

/**
 * check if exists a wallet with chosen id
 *
 * @param {GetWalletParams} params
 * @param {SubSystems} system
 * @returns {GetWalletParams}
 */
function checkWalletInfo(params: GetWalletParams, system: SubSystems): GetWalletParams {
  const { id } = params
  const wallets: Array<WalletInfo> = system.appStateManager.state.wallets.infos
  const walletInfo: WalletInfo | undefined = searchWalletInfo(wallets, id)
  if (walletInfo) {
    return params
  } else {
    throw getWalletErrors.WALLET_NOT_FOUND
  }
}

/**
 * create a new storage and replace app storage with it
 *
 * @param {GetWalletParams} params
 * @param {SubSystems} system
 * @returns {Promise<{ storage: Storage<Buffer, JsonSerializable, Buffer, Buffer>, id: string }>}
 */
async function replaceStorage(
  params: GetWalletParams, system: SubSystems
): Promise<{ storage: Storage<Buffer, JsonSerializable, Buffer, Buffer>, id: string }> {
  const { id, password } = params

  try {
    const storage = await system.storageFactory({ id, password })
    await system.walletStorage.replace(storage)

    return { storage, id }
  } catch (e) {
    throw getWalletErrors.INSUFFICIENT_PERMISSIONS
  }
}

/**
 * search wallet in db
 *
 * @param {{ storage: Storage<Buffer, JsonSerializable, Buffer, Buffer>, id: string }}
 * @returns {Promise<GetWalletSucccess>}
 */
async function searchWallet(
  { storage, id }: { storage: Storage<Buffer, JsonSerializable, Buffer, Buffer>, id: string }
) {
  // Search wallet in db
  const wallet = await storage.get(id)

  // Check run time type
  try {
      wallet

  } catch (error) {
    throw getWalletErrors.INVALID_WALLET_TYPE
  }
}

/**
 * encode response to ensure that handler returns a JsonSerializable
 *
 * @param {GetWalletResponse} response
 * @returns {JsonSerializable}
 */
function encodeResponse(response: GetWalletResponse): JsonSerializable {
  try {
    return asObject(response, GetWalletResponse)
  } catch (err) {
    throw getWalletErrors.INVALID_WALLET_TYPE
  }
}

/**
 * build handler error response
 *
 * @param {LiteralType<GetWalletErrors>} error
 * @returns
 */
function buildError(error: LiteralType<GetWalletErrors>) {
  const resultErrror: GetWalletError = {
    kind: "error",
    error: error.value
  }

  return resultErrror
}