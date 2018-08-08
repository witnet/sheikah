import { ValidateMnemonicsResponse } from "app/common/runtimeTypes/ipc/wallets"
import { Client } from "app/renderer/api"

/**
 * Encrypt Wallet.
 * @param client
 * @param id
 * @param password
 * @param caption
 */
export const validateMnemonics = async (client: Client, mnemonics: string):
  Promise<ValidateMnemonicsResponse> => {
  const validateMnemonicsParams = { mnemonics }

  return client.request("validateMnemonics", validateMnemonicsParams)
}