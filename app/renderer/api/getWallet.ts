import * as t from "io-ts"

import { Contexts, asRuntimeType } from "app/common/runtimeTypes"
import { ApiClient } from "app/renderer/api"
import {
  GetWalletResponse,
  getWalletErrors,
  GetWalletErrors,
  buildGetWalletError,
} from "app/common/runtimeTypes/ipc/wallets"

/**
 * Function to request the unlock of a wallet through the API Client
 * @param client
 */
export async function getWallet(client: ApiClient, id: string, password: string): Promise<GetWalletResponse> {
  return client.request("getWallet", { id, password })
    .then(parseResponse)
    .catch(buildError)
}

/**
 * Function to check that the received response is a valid response
 * @param response
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseResponse(response: any) {
  try {
    return asRuntimeType(response, GetWalletResponse, Contexts.IPC)
  } catch (error) {
    throw getWalletErrors.GENERIC_IPC_ERROR
  }
}

/**
 * Function to build a generic IPC error that abstracts from IPC errors
 */
function buildError() {
  return buildGetWalletError(t.literal<GetWalletErrors>(getWalletErrors.GENERIC_IPC_ERROR.value))
}
