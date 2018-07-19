import { asObject } from "app/common/runtimeTypes"
import { Wallets } from "app/common/runtimeTypes/storage/wallets"
import { AppStateS } from "app/main/system"

/**
 * Handler function for "getWallets" methods.
 * It retrieves and returns a list of wallet info objects taken from app state.
 * @param system
 * @param params
 */
export default async function getWallets(system: AppStateS, params: any) {
  return asObject(system.appStateManager.state.wallets, Wallets)
}
