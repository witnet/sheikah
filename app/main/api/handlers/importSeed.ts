import { asObject, asRuntimeType, Contexts } from "app/common/runtimeTypes"
import {
  ImportSeedError,
  importSeedErrors,
  ImportSeedParams,
  ImportSeedResponse,
} from "app/common/runtimeTypes/ipc/wallets"
import { JsonSerializable } from "app/common/serializers"
import { AppStateManager } from "app/main/appState"
import * as mnemonic from "app/main/crypto/mnemonic"

import { AppStateS } from "app/main/system"
import { inject } from "app/main/utils/utils"
import { LiteralType } from "io-ts"
import { Seed } from "app/common/runtimeTypes/storage/wallets"
import * as Slip32 from "slip32"
import { fromMnemonics } from "app/main/crypto/seed"

/**
 * Handler function for `importSeed` method.
 * It receives a param with the mnemonic words and check they are valid.
 * If there is an `UnconsolidatedWallet` in the app state it will also validate that they are the
 * same.
 * If there is no `UnconsolidatedWallet` in the app state, it will create one with the mnemonics.
 * In both cases it will also generate a wallet ID and return it.
 */
export default async function importSeed({ appStateManager }: AppStateS, params: any): Promise<JsonSerializable> {
  // First of all, parse method parameters
  return parseParams(params)
    // Get the seed from the params
    .then(getSeed)
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

// Function to assert a never value
const assertNever = (_x: never) => undefined

/**
 * Get seed from params
 * @param params
 * @param appStateManager
 */
async function getSeed(params: ImportSeedParams): Promise<Seed> {
  let seed: Promise<Seed>
  switch (params.kind) {
    case "mnemonics":
      seed = processMnemonics(params.mnemonics)
      break
    case "xprv":
      seed = processXprv(params.xprv)
      break
    default:
      // compiler instruction to ensure exhaustiveness
      assertNever(params)
      throw importSeedErrors.INVALID_METHOD_PARAMS
  }

  return seed
}

/**
 * Validate mnemonics and get seed
 * @param mnemonics
 * @param appStateManager
 */
async function processMnemonics(mnemonics: string):
Promise<Seed> {
  return Promise.resolve(mnemonics)
    .then(validateMnemonicsString)
    .then(seedFromMnemonics)
}

/**
 * Get seed from xprv
 * @param xprv
 */
async function processXprv(xprv: string): Promise<Seed> {
  try {
    const key = Slip32.importKeyFromSlip32(xprv)

    return {
      chainCode: Buffer.from(key.extendedKey.chainCode),
      masterSecret: Buffer.from(key.extendedKey.key.bytes),
    }
  } catch (error) {
    throw importSeedErrors.INVALID_XPRV
  }
}

/**
 * Get seed from mnemonics
 * @param param0
 */
function seedFromMnemonics(mnemonics: string): Seed {
  try {
    return fromMnemonics(mnemonics)
  } catch (error) {
    throw importSeedErrors.INVALID_MNEMONICS
  }
}

/**
 * Parse handler parameters as ValidateMnemonicsParams runtime type.
 * @param params
 */
async function parseParams(params: any): Promise<ImportSeedParams> {
  try { return asRuntimeType(params, ImportSeedParams, Contexts.IPC) } catch { throw importSeedErrors.INVALID_METHOD_PARAMS }
}

/**
 * Validate if a string is a valid mnemonics string.
 * @param mnemonics
 */
function validateMnemonicsString(mnemonics: string): string {
  if (!mnemonic.isValid(mnemonics)) {
    throw importSeedErrors.INVALID_MNEMONICS
  }

  return mnemonics
}

/**
 * Update or insert seed into unconsolidated wallet in app state.
 * @param seed
 * @param unconsolidated
 */
function upsertUnconsolidated(seed: Seed, appStateManager: AppStateManager) {
  try {
    const unconsolidatedWallet = { ...appStateManager.state.unconsolidatedWallet, seed }
    appStateManager.update({ unconsolidatedWallet })
  } catch {
    throw importSeedErrors.UNCONSOLIDATED_UPDATE_FAILURE
  }
}

/**
 * Build success response.
 * @param id
 */
function buildSuccessResponse(): ImportSeedResponse {
  return { kind: "SUCCESS" }
}

/**
 * Build error response.
 * @param error
 */
export function buildErrorResponse(error: LiteralType<ImportSeedError["error"]>): ImportSeedResponse {
  return { kind: "ERROR", error: error.value }
}

/**
 * Encode final response as a serializable object.
 * @param response
 */
function encodeResponse(response: ImportSeedResponse): JsonSerializable {
  return asObject(response, ImportSeedResponse)
}
