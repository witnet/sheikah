import * as Actions from "app/renderer/actions/actionNames"
import { SaveFinalKeyAction, SaveWalletAction } from "app/renderer/actions/actionTypes"
import { WalletOption } from "app/renderer/store"
import * as _ from "lodash"

const defaultWalletState: WalletOption = false

type saveWalletOptions = SaveWalletAction | SaveFinalKeyAction
export const walletReducer = (state: WalletOption = defaultWalletState, action: saveWalletOptions): WalletOption => {
  switch (action.type) {
    case Actions.SAVE_WALLET:
      return action.payload ? action.payload : false
    case Actions.SAVE_FINALKEY:
      const newState = _.cloneDeep(state)
      if (newState && action.payload) {
        newState.accounts[action.payload.account]
          .keyChains[action.payload.keyChain]
          .finalKeys.push(action.payload.finalKey)
      }

      return newState
    default:
      return state
  }
}
