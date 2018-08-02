import * as t from "io-ts"

import { asObject } from "app/common/runtimeTypes"
import { inject } from "app/main/utils/utils"
import { AppStateS } from "app/main/system"
import {
  NewMnemonicsResponse, Mnemonics, NewMnemonicsErrors, newMnemonicsErrors, NewMnemonicsSuccess,
  NewMnemonicsError
} from "app/common/runtimeTypes/storage/wallets"
import * as mnemonic from "app/main/crypto/mnemonic"
import { JsonSerializable } from "app/common/serializers"

/**
 * Handler function for "newMnemonics" method.
 * It retrieves and returns a list of mnemonics words.
 * @param system
 * @param params
 */
export default async function newMnemonics(system: AppStateS, params: any) {
  return Promise.resolve()
    // Get mnemonics from crypto library
    .then(generateMnemonics)
    // Update app state with unconsolidated wallet entry
    .then(inject(updateUnconsolidatedWallet, system))
    // create response steps
    .then(buildSuccess)
    .catch(buildError)
    .then(encodeResponse)
}

/**
 * Get mnemonics from crypto library
 *
 * @returns {Mnemonics}
 */
function generateMnemonics(): Mnemonics {
  try {
    return { mnemonics: mnemonic.generate() }
  } catch (err) {
    throw newMnemonicsErrors.DEPENDENCY_ERROR_GENERATE_MNEMONICS
  }
}

/**
 * update app state with unconsolidated wallet entry
 *
 * @param {Mnemonics} mnemonics
 * @param {AppStateS} system
 * @returns {Mnemonics}
 */
function updateUnconsolidatedWallet(mnemonics: Mnemonics, system: AppStateS): Mnemonics {
  try {
    system.appStateManager.update({ unconsolidatedWallet: mnemonics })

    return mnemonics
  } catch (err) {
    throw newMnemonicsErrors.ERROR_UPDATING_UNCONSOLIDATED_WALLET
  }
}

/**
 * build handler success response
 *
 * @param {Mnemonics} mnemonics
 * @returns {NewMnemonicsSuccess}
 */
function buildSuccess(mnemonics: Mnemonics): NewMnemonicsSuccess {
  try {
    return {
      kind: "SUCCESS",
      mnemonics: mnemonics.mnemonics
    }
  } catch (error) {
    throw newMnemonicsErrors.INVALID_MNEMONICS_TYPE
  }
}

/**
 * build handler error response
 *
 * @param {t.LiteralType<NewMnemonicsErrors>} error
 * @returns {NewMnemonicsError}
 */
function buildError(error: t.LiteralType<NewMnemonicsErrors>): NewMnemonicsError {
  return {
    kind: "ERROR",
    error: error.value
  }
}

/**
 * encode a NewMnemonicsResponse to be JsonSerializable
 *
 * @param {NewMnemonicsResponse} response
 * @returns {JsonSerializable}
 */
function encodeResponse(response: NewMnemonicsResponse): JsonSerializable {
  return asObject(response, NewMnemonicsResponse)
}