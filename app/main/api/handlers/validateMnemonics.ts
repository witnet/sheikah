import * as crypto from "crypto"
import { config } from "app/common/config"
import { asRuntimeType, Contexts } from "app/common/runtimeTypes"
import {
  ValidateMnemonicsParams,
  ValidateMnemonicsResponse,
  ValidateMnemonicsResponses
} from "app/common/runtimeTypes/ipc/wallets"
import { AppStateS } from "app/main/system"
import * as mnemonic from "app/main/crypto/mnemonic"

/**
 * Handler function for `validateMnemonics` method.
 * It receives a param with the mnemonic words and check they are valid.
 * If there is an `UnconsolidatedWallet` in the app state it will also validate that they are the
 * same.
 * If there is no `UnconsolidatedWallet` in the app state, it will create one with the mnemonics.
 * In both cases it will also generate a wallet ID and return it.
 */
export default async function validateMnemonics({ appStateManager }: AppStateS, params: any) {
  const { mnemonics } = asRuntimeType(params, ValidateMnemonicsParams, Contexts.IPC)
  const id = generateId(mnemonics)
  const unconsolidatedWallet = { mnemonics, id }
  let response: ValidateMnemonicsResponse = ValidateMnemonicsResponses.id(id)

  if (mnemonic.isValid(mnemonics)) {
    if (appStateManager.state.unconsolidatedWallet
      && appStateManager.state.unconsolidatedWallet.mnemonics !== mnemonics) {
      response = ValidateMnemonicsResponses.matchError()
    } else {
      appStateManager.update({ unconsolidatedWallet })
    }
  } else {
    response = ValidateMnemonicsResponses.invalid()
  }

  return ValidateMnemonicsResponse.encode(response)
}

/**
 * Generate a string id given a mnemonics string.
 */
export function generateId(mnemonics: string): string {
  return crypto.pbkdf2Sync(
    mnemonics,
    config.mnemonicsIdGeneration.salt,
    config.mnemonicsIdGeneration.hashIterations,
    config.mnemonicsIdGeneration.keyByteLength,
    config.mnemonicsIdGeneration.hashFunctionName
  ).toString("hex")
}
