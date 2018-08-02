import { Wallets, CURRENT_WALLETS_VERSION } from "app/common/runtimeTypes/storage/wallets"
import { IAction } from "app/renderer/actions/helpers"

const defaultWalletsState: Wallets = { _v: CURRENT_WALLETS_VERSION, infos: [] }

export const walletsReducer = (state = defaultWalletsState, action: IAction): Wallets => {
  return state
}