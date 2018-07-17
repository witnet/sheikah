import { Contexts, asRuntimeType } from "app/common/runtimeTypes"
import { ApiClient } from "app/renderer/api"
import { NewMnemonicsResponse } from "app/common/runtimeTypes/storage/wallets"

/**
 * Function to request the creation of new mnemonic words through the API Client
 * @param client
 */
export async function newMnemonics(client: ApiClient): Promise<NewMnemonicsResponse> {
  // Request the creation of new mnemonics
  const mnemonicsResponse = await client.request("newMnemonics")

  // Cast return value to a new mnemonics response
  return asRuntimeType(mnemonicsResponse, NewMnemonicsResponse, Contexts.IPC)
}