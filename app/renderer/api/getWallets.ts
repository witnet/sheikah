import { Contexts, asRuntimeType } from "app/common/runtimeTypes"
import { ApiClient } from "app/renderer/api"
import { Wallets } from "app/common/runtimeTypes/storage/wallets"

/**
 * Function to request the unlock of a wallet through the API Client
 * @param client
 */
export async function getWallets(client: ApiClient): Promise<Wallets> {
  // Request all available wallets
  const wallets = await client.request("getWallets")

  // Cast return value to runtime type
  return asRuntimeType(wallets, Wallets, Contexts.IPC)
}