import { asObject } from "app/common/runtimeTypes"
import { AppStateS } from "app/main/system"
import { NewMnemonicsResponse } from "app/common/runtimeTypes/storage/wallets"
import * as mnemonic from "app/main/crypto/mnemonic"

/**
 * Handler function for "newMnemonics" method.
 * It retrieves and returns a list of mnemonics words.
 * @param system
 * @param params
 */
export default async function newMnemonics(system: AppStateS, params: any) {
  // Get mnemonics from crypto library
  const mnemonicsResponse: NewMnemonicsResponse = { mnemonics: mnemonic.generate() }

  // Update app state with unconsolidated wallet entry
  system.appStateManager.update({ unconsolidatedWallet: mnemonicsResponse })

  return asObject(mnemonicsResponse, NewMnemonicsResponse)
}
