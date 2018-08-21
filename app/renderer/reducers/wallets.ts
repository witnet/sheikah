import { WalletInfos, CURRENT_WALLETS_VERSION } from "app/common/runtimeTypes/storage/wallets"
import { IAction } from "app/renderer/actions/helpers"

const defaultWalletsState: WalletInfos = { _v: CURRENT_WALLETS_VERSION, infos: [] }

export const walletsReducer = (state = defaultWalletsState, action: IAction): WalletInfos => {
  return state
}
