import { Contexts, asRuntimeType } from "app/common/runtimeTypes"
import { ApiClient } from "app/renderer/api"
import { Wallet } from "app/common/runtimeTypes/storage/wallets"

/**
 * Function to request the unlock of a wallet through the API Client
 * @param client
 */
export async function getWallet(client: ApiClient, id: string, password: string): Promise<Wallet> {
  // Request the unlock of a wallet
  const wallet = await client.request("getWallet", { id, password })

  // Cast return value to runtime type
  return asRuntimeType(wallet, Wallet, Contexts.IPC)
}
