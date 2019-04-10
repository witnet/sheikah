import * as t from "io-ts"

import { Contexts, asRuntimeType } from "app/common/runtimeTypes"
import { ApiClient } from "app/renderer/api"
import { buildError as buildNewMnemonicsError } from "app/main/api/handlers/newMnemonics"
import {
  NewMnemonicsResponse,
  newMnemonicsErrors,
  NewMnemonicsErrors,
} from "app/common/runtimeTypes/storage/wallets"

/**
 * request the new mnemonics through the API Client
 *
 * @export
 * @param {ApiClient} client
 * @returns {Promise<NewMnemonicsResponse>}
 */
export async function newMnemonics(client: ApiClient): Promise<NewMnemonicsResponse> {
  return client.request("newMnemonics")
    .then(parseResponse)
    .catch(buildError)
}

/**
 * Success request handler
 *
 * @param {*} response
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseResponse(response: any) {
  try {
    return asRuntimeType(response, NewMnemonicsResponse, Contexts.IPC)
  } catch (error) {
    throw newMnemonicsErrors.GENERIC_ERROR
  }
}

/**
 * Error request handler
 *
 * @returns
 */
function buildError() {
  return buildNewMnemonicsError(
    t.literal<NewMnemonicsErrors>(newMnemonicsErrors.GENERIC_ERROR.value)
  )
}
