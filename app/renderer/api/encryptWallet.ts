import { EncryptWalletParams, EncryptWalletResponse } from "app/common/runtimeTypes/ipc/wallets"
import { Client } from "app/renderer/api"

/**
 * Encrypt Wallet.
 * @param client
 * @param password
 * @param caption
 */
export const encryptWallet = async (client: Client, password: string, caption?: string):
  Promise<EncryptWalletResponse> => {
  const encryptedWalletParams: EncryptWalletParams = { password, caption }

  return client.request("encryptWallet", encryptedWalletParams)
}