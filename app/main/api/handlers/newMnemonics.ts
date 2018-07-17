import { asObject } from "app/common/runtimeTypes"
import { SubSystems } from "app/main/system"
import { generate } from "app/main/crypto/mnemonic"
import { NewMnemonicsResponse } from "app/common/runtimeTypes/storage/wallets"

/**
 * Handler function for "newMnemonics" method.
 * It retrieves and returns a list of mnemonics words.
 * @param system
 * @param params
 */
export default async function newMnemonics(system: SubSystems, params: any) {
  // Get mnemonics from crypto library
  const mnemonicsResponse = { mnemonics: generate() }

  // Update app state with unconsolidated wallet entry
  system.appStateManager.update({ unconsolidatedWallet: mnemonicsResponse })

  return asObject(mnemonicsResponse, NewMnemonicsResponse)
}