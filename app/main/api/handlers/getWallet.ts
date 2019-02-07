import { asRuntimeType, asObject } from "app/common/runtimeTypes"
import { inject } from "app/main/utils/utils"
import { SubSystems } from "app/main/system"
import { JsonSerializable } from "app/common/serializers/json"
import { WalletInfo, Wallet } from "app/common/runtimeTypes/storage/wallets"
import {
  GetWalletParams, GetWalletResponse,
  GetWalletSuccess, getWalletErrors,
  buildGetWalletError,
} from "app/common/runtimeTypes/ipc/wallets"
import { JsonAesLevelStorage } from "app/main/subsystems/jsonAesLevel"

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
    // check if params type matches GetWalletParams runtime type
    .then(parseParams)
    // check if there exists a wallet with chosen id
    .then(inject(checkWalletInfo, system))
    // create a new storage and replace app storage with it
    .then(inject(replaceStorage, system))
    // search wallet in db
    .then(searchWallet)
    // validate wallet type
    .then(inject(parseWallet, system))
    // create response steps
    .then(buildSuccess)
    .catch(buildGetWalletError)
    .then(encodeResponse)
}

/**
 * search wallet info in state
 *
 * @param {Array<WalletInfo>} walletInfos
 * @param {string} id
 * @returns {(WalletInfo | undefined)}
 */
function searchWalletInfo(walletInfos: Array<WalletInfo>, id: string): WalletInfo | undefined {
  return walletInfos.find((wallet: WalletInfo) => wallet.id === id)
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
  const walletInfos: Array<WalletInfo> = system.appStateManager.state.walletInfos.infos
  const walletInfo: WalletInfo | undefined = searchWalletInfo(walletInfos, id)
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
async function replaceStorage(params: GetWalletParams, system: SubSystems): Promise<{ storage: JsonAesLevelStorage, id: string }> {
  const { id, password } = params

  try {
    const storage = await system.walletStorage.replaceWith(
      async () => system.storageFactory({ id, password }))

    return { storage, id }
  } catch (e) {
    throw getWalletErrors.INSUFFICIENT_PERMISSIONS
  }
}

/**
 * search wallet in db
 *
 * @param {{ storage: JsonAesLevelStorage, id: string }}
 * @returns {Promise<JsonSerializable>}
 */
async function searchWallet(
  { storage, id }: { storage: JsonAesLevelStorage, id: string }
): Promise<JsonSerializable> {
  try {
    return await storage.get("wallet")
  } catch (error) {
    throw getWalletErrors.WRONG_PASSWORD
  }
}

/**
 * parse the wallet retrieved from the db
 * @param {data: JsonSerializable}
 * @returns {Promise<Wallet>}
 */
async function parseWallet(data: JsonSerializable, system: SubSystems): Promise<Wallet> {
  try {
    const wallet = asRuntimeType(data, Wallet)
    system.appStateManager.update({ wallet })

    return wallet
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
    throw getWalletErrors.CANNOT_ENCODE_WALLET
  }
}

/**
 * build handler success response
 *
 * @param {Wallet} wallet
 * @returns {GetWalletSucccess}
 */
function buildSuccess(wallet: Wallet): GetWalletSuccess {
  return {
    kind: "SUCCESS",
    wallet,
  }
}
