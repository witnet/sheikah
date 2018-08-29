import { WalletInfos, CURRENT_WALLETS_VERSION } from "app/common/runtimeTypes/storage/wallets"
import { Action } from "redux"

const defaultWalletsState: WalletInfos = { _v: CURRENT_WALLETS_VERSION, infos: [] }

export const walletsReducer = (state = defaultWalletsState, action: Action): WalletInfos => {
  return state
}