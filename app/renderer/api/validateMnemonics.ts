import { NewMnemonicsResponse } from "app/common/runtimeTypes/storage/wallets"
import { Client } from "app/renderer/api"

/**
 * Encrypt Wallet.
 * @param client
 * @param id
 * @param password
 * @param caption
 */
export const validateMnemonics = async (client: Client, mnemonics: string):
  Promise<NewMnemonicsResponse> => {
  const validateMnemonicsParams = { mnemonics }

  return client.request("validateMnemonics", validateMnemonicsParams)
}