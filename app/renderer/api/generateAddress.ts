import * as t from "io-ts"

import { Contexts, asRuntimeType } from "app/common/runtimeTypes"
import { ApiClient } from "app/renderer/api"
import {
  GenerateAddressResponse,
  generateAddressErrors,
  buildGenerateAddressError,
  GenerateAddressErrors
} from "app/common/runtimeTypes/ipc/address"

/**
 * Function to request the generation of an address through the API Client
 * @param client
 * @param account
 * @param label
 * @param amount
 * @param expirationDate
 */
export async function generateAddress(
  client: ApiClient,
  account: number,
  label?: string,
  amount?: number,
  expirationDate?: number
): Promise<GenerateAddressResponse> {
  return client.request("generateAddress", { account, label, amount, expirationDate })
    .then(parseResponse)
    .catch(buildError)
}

/**
 * Function to check that the received response is a valid response
 * @param response
 */
function parseResponse(response: any) {
  try {
    return asRuntimeType(response, GenerateAddressResponse, Contexts.IPC)
  } catch (error) {
    throw generateAddressErrors.GENERIC_IPC_ERROR
  }
}

/**
 * Function to build a generic IPC error that abstracts from IPC errors
 */
function buildError() {
  return buildGenerateAddressError(
    t.literal<GenerateAddressErrors>(generateAddressErrors.GENERIC_IPC_ERROR.value)
  )
}