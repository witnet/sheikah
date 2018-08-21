import { Contexts, asRuntimeType } from "app/common/runtimeTypes"
import { ApiClient } from "app/renderer/api"
import { WalletInfos } from "app/common/runtimeTypes/storage/wallets"

/**
 * Function to request the unlock of a wallet through the API Client
 * @param client
 */
export async function getWalletInfos(client: ApiClient): Promise<WalletInfos> {
  // Request all available wallets
  const walletInfos = await client.request("getWalletInfos")

  // Cast return value to runtime type
  return asRuntimeType(walletInfos, WalletInfos, Contexts.IPC)
}
