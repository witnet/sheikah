import { Wallets } from "app/common/runtimeTypes/storage/wallets"
import { IAction } from "app/renderer/actions/helpers"

const defaultWalletsState: Wallets = []

export const walletsReducer = (state = defaultWalletsState, action: IAction): Wallets => {
  return state
}