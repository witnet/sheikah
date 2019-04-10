import * as t from "io-ts"

import { Client } from "app/renderer/api"
import { Contexts, asRuntimeType } from "app/common/runtimeTypes"
import {
  buildErrorResponse as buildValidateMnemonicsErrorResponse,
} from "app/main/api/handlers/importSeed"
import {
  ImportSeedResponse, importSeedErrors, ImportSeedErrors, ImportSeedParams,
} from "app/common/runtimeTypes/ipc/wallets"

/**
 * Validate mnemonics
 *
 * @param client
 * @param mnemonics
 */
export const validateMnemonics = async (client: Client, mnemonics: string): Promise<ImportSeedResponse> => {
  const validateMnemonicsParams: ImportSeedParams = {
    kind: t.literal("mnemonics").value, mnemonics,
  }

  return client.request("importSeed", validateMnemonicsParams)
    .then(parseResponse)
    .catch(buildError)
}

/**
 * Validate xprv
 *
 * @param client
 * @param mnemonics
 */
export const validateXprv = async (client: Client, xprv: string): Promise<ImportSeedResponse> => {
  const validateMnemonicsParams: ImportSeedParams = {
    kind: t.literal("xprv").value, xprv,
  }

  return client.request("importSeed", validateMnemonicsParams)
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
    return asRuntimeType(response, ImportSeedResponse, Contexts.IPC)
  } catch (error) {
    throw importSeedErrors.INVALID_MNEMONICS
  }
}

/**
 * Error request handler
 *
 * @returns
 */
function buildError() {
  return buildValidateMnemonicsErrorResponse(
    t.literal<ImportSeedErrors>(importSeedErrors.INVALID_MNEMONICS.value)
  )
}
