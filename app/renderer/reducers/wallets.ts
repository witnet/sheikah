import { Wallets } from "app/common/runtimeTypes/storage/wallets"
import { IAction } from "../actions/helpers"

export type WalletsState = Wallets

const defaultWalletsState: WalletsState = []

export const walletsReducer = (state = defaultWalletsState, action: IAction): WalletsState => {
  return state
}