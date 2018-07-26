import { Wallets, CURRENT_WALLETS_VERSION } from "app/common/runtimeTypes/storage/wallets"
import { IAction } from "app/renderer/actions/helpers"

const defaultWalletsState: Wallets = []

const defaultWalletsState: WalletsState = { _v: CURRENT_WALLETS_VERSION, infos: [] }

export const walletsReducer = (state = defaultWalletsState, action: IAction): WalletsState => {
  return state
}