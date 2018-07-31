import { config } from "app/common/config"
import { asObject, asRuntimeType, Contexts } from "app/common/runtimeTypes"
import {
  ValidateMnemonicsError,
  validateMnemonicsErrors,
  ValidateMnemonicsParams,
  ValidateMnemonicsResponse
} from "app/common/runtimeTypes/ipc/wallets"
import { JsonSerializable } from "app/common/serializers"
import { AppStateManager } from "app/main/appState"
import * as mnemonic from "app/main/crypto/mnemonic"

import { AppStateS } from "app/main/system"
import { fanOut, inject, pick } from "app/main/utils/utils"
import * as crypto from "crypto"
import { LiteralType } from "io-ts"

/**
 * Handler function for `validateMnemonics` method.
 * It receives a param with the mnemonic words and check they are valid.
 * If there is an `UnconsolidatedWallet` in the app state it will also validate that they are the
 * same.
 * If there is no `UnconsolidatedWallet` in the app state, it will create one with the mnemonics.
 * In both cases it will also generate a wallet ID and return it.
 */
export default async function validateMnemonics
  ({ appStateManager }: AppStateS, params: any): Promise<JsonSerializable> {

  // First of all, parse method parameters
  return parseParams(params)
    // Pick only the value of the mnemonics key from the handler parameters
    .then(pick("mnemonics"))
    // In parallel: validate mnemonic, check mnemonic against unconsolidated wallet and generate id
    .then(fanOut([validateMnemonicsString, inject(matchMnemonics, appStateManager), generateId]))
    // Update or insert unconsolidated wallet into app state
    .then(inject(upsertUnconsolidated, appStateManager))
    // The handler logic ends here. What follows is response building and encoding.

    // If everything was OK, return success
    .then(buildSuccessResponse)
    // If anything failed, return error
    .catch(buildErrorResponse)
    // Encode response
    .then(encodeResponse)
}

/**
 * Parse handler parameters as ValidateMnemonicsParams runtime type.
 * @param params
 */
async function parseParams(params: any): Promise<ValidateMnemonicsParams> {
  try { return asRuntimeType(params, ValidateMnemonicsParams, Contexts.IPC) }
  catch { throw validateMnemonicsErrors.INVALID_METHOD_PARAMS }
}

/**
 * Generate an id string given a mnemonics string.
 * @param mnemonics
 */
function generateId(mnemonics: string): string {
  try {
    return crypto.pbkdf2Sync(
      mnemonics,
      config.mnemonicsIdGeneration.salt,
      config.mnemonicsIdGeneration.hashIterations,
      config.mnemonicsIdGeneration.keyByteLength,
      config.mnemonicsIdGeneration.hashFunctionName
    ).toString("hex")
  } catch { throw validateMnemonicsErrors.ID_GENERATION_ERROR }
}

/**
 * Validate if a string is a valid mnemonics string.
 * @param mnemonics
 */
function validateMnemonicsString(mnemonics: string): string {
  if (!mnemonic.isValid(mnemonics)) {
    throw validateMnemonicsErrors.INVALID_MNEMONICS
  }

  return mnemonics
}

/**
 * Check if received mnemonics match the mnemonics from a former unconsolidated wallet.
 * @param mnemonics
 * @param appStateManager
 */
function matchMnemonics(mnemonics: string, appStateManager: AppStateManager): string {
  if (appStateManager.state.unconsolidatedWallet
    && mnemonics !== appStateManager.state.unconsolidatedWallet.mnemonics) {
    throw validateMnemonicsErrors.MISMATCHING_MNEMONICS
  }

  return mnemonics
}

/**
 * Update or insert unconsolidated wallet into app state.
 * @param appStateManager
 * @param unconsolidated
 */
function upsertUnconsolidated
  ([_, mnemonics, id]: Array<string>, appStateManager: AppStateManager): string {
  try {
    appStateManager.update({ unconsolidatedWallet: { id, mnemonics } })

    return id
  } catch {
    throw validateMnemonicsErrors.UNCONSOLIDATED_UPDATE_FAILURE
  }
}

/**
 * Build success response.
 * @param id
 */
function buildSuccessResponse(id: string): ValidateMnemonicsResponse {
  return { kind: "SUCCESS", id }
}

/**
 * Build error response.
 * @param error
 */
function buildErrorResponse
  (error: LiteralType<ValidateMnemonicsError["error"]>): ValidateMnemonicsResponse {
  return { kind: "ERROR", error: error.value }
}

/**
 * Encode final response as a serializable object.
 * @param response
 */
function encodeResponse(response: ValidateMnemonicsResponse): JsonSerializable {
  return asObject(response, ValidateMnemonicsResponse)
}