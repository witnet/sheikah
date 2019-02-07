import * as Actions from "app/renderer/actions/actionNames"
import { WalletInfos, CURRENT_WALLETS_VERSION } from "app/common/runtimeTypes/storage/wallets"
import { SaveWalletInfosAction, SaveWalletInfoAction } from "app/renderer/actions/actionTypes"
import * as _ from "lodash"

const defaultWalletsState: WalletInfos = { _v: CURRENT_WALLETS_VERSION, infos: [] }

type walletsReducerActions = SaveWalletInfosAction | SaveWalletInfoAction

export const walletsReducer = (
  state = defaultWalletsState,
  action: walletsReducerActions
): WalletInfos => {
  switch (action.type) {
    case Actions.SAVE_WALLET_INFOS:
      return action.payload ? action.payload : state
    case Actions.SAVE_WALLET_INFO:
      const newState = _.cloneDeep(state)

      if (newState && action.payload) {
        newState.infos.push(action.payload)
      }

      return newState
    default:
      return state
  }
}
