import { actionCreator } from "./helpers"
import * as Actions from "./actionNames"
import * as api from "app/renderer/api"
import { Wallet } from "app/common/runtimeTypes/storage/wallets"
import { Services } from "app/renderer/services"
import {
  SaveWalletAction,
} from "./actionTypes"
import { push } from "connected-react-router"

// Action creator to unlock a wallet
export const unlockWallet = (id: string, password: string) => {
  return async (dispatch: any, getState: any, services: Services) => {
    return new Promise((resolve, reject) => {
      // Try to retrieve wallet from renderer API & dispatch wallet or error
      // TODO dispatch(push("/")) needs to be replaced by dispatch(push(MAIN_PATHS.MAIN)
      api.getWallet(services.apiClient, id, password)
        .then((wallet: Wallet) => {
          dispatch(saveWallet(wallet))
          dispatch(push("/"))
          resolve("")
        })
        .catch((err: Error) => {
          reject(err.message)
        })
    })
  }
}

// Internal action creator to save wallet
const saveWallet = (wallet: Wallet): SaveWalletAction => {
  return actionCreator<Wallet>(Actions.SAVE_WALLET)(wallet)
}