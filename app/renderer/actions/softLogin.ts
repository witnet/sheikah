import { actionCreator } from "./helpers"
import * as Actions from "app/renderer/actions/actionNames"
import * as api from "app/renderer/api"
import { Wallet } from "app/common/runtimeTypes/storage/wallets"
import { Services } from "app/renderer/services"
import {
  FormsAction,
  SaveWalletAction,
  SoftLoginAction,
  SoftLoginKey
} from "app/renderer/actions/actionTypes"
import { SoftLoginForm } from "app/renderer/store"
import { push } from "connected-react-router"

// Action creators to set/delete fields in form
export const setId = (id: string) => setField({ id })
export const setPassword = (password: string) => setField({ password })
export const setErrorMessage = (errorMessage: string) => setField({ errorMessage })
export const setUnlockInProgress = (unlockInProgress: boolean) => setField({ unlockInProgress })
export const deleteId = () => deleteField("id")
export const deletePassword = () => deleteField("password")
export const deleteUnlockInProgress = () => deleteField("unlockInProgress")

// Internal action creators to set/delete a generic field in form
const setField = (field: Partial<SoftLoginForm>): FormsAction => {
  const softLoginAction = actionCreator<Partial<SoftLoginForm>>(Actions.SET_FIELD)(field)

  return actionCreator<SoftLoginAction>(Actions.UPDATE_SOFT_LOGIN)(softLoginAction)
}
const deleteField = (key: SoftLoginKey): FormsAction => {
  const softLoginAction = actionCreator<SoftLoginKey>(Actions.DELETE_FIELD)(key)

  return actionCreator<SoftLoginAction>(Actions.UPDATE_SOFT_LOGIN)(softLoginAction)
}

// Action creator to unlock a wallet
export const unlockWallet = (id: string, password: string) => {
  return async (dispatch: any, getState: any, services: Services) => {
    return new Promise((resolve, reject) => {
      // Try to retrieve wallet from renderer API & dispatch wallet or error
      api.getWallet(services.apiClient, id, password)
        .then((wallet: Wallet) => {
          dispatch(saveWallet(wallet))
          dispatch(push("/"))
          resolve()
        })
        .catch((err: Error) => {
          dispatch(setErrorMessage(err.message))
          reject()
        })
    })
  }
}

// Internal action creator to save wallet
const saveWallet = (wallet: Wallet): SaveWalletAction => {
  return actionCreator<Wallet>(Actions.SAVE_WALLET)(wallet)
}