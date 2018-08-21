import { asObject } from "app/common/runtimeTypes"
import { WalletInfos } from "app/common/runtimeTypes/storage/wallets"
import { AppStateS } from "app/main/system"

/**
 * Handler function for "getWalletInfos" methods.
 * It retrieves and returns a list of wallet info objects taken from app state.
 * @param system
 * @param params
 */
export default async function getWalletInfos(system: AppStateS, params: any) {
  return asObject(system.appStateManager.state.walletInfos, WalletInfos)
}
