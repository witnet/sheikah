import * as Actions from "app/renderer/actions/actionNames"
import { WalletOption } from "app/renderer/store"
import { SaveWalletAction } from "app/renderer/actions/actionTypes"

const defaultWalletState: WalletOption = false

export const walletReducer = (state: WalletOption = defaultWalletState, action: SaveWalletAction)
  : WalletOption => {
  switch (action.type) {
    case Actions.SAVE_WALLET:
      return action.payload
    default:
      return state
  }
}