import { actionCreator } from "./helpers"
import * as Actions from "./actionNames"
import * as api from "app/renderer/api"
import { Wallet } from "app/common/runtimeTypes/storage/wallets"
import { Services } from "app/renderer/services"
import {
  SaveWalletAction,
} from "./actionTypes"
import { GetWalletResponse } from "app/common/runtimeTypes/ipc/wallets"

// Function to assert a never value
const assertNever = (x: never) => undefined

// Function to return a function which allows a async conditional dispatch to unlock a wallet
export const unlockWallet = (id: string, password: string) => {
  return async (dispatch: any, getState: any, services: Services) => {
    return new Promise((resolve, reject) => {
      // Try to retrieve wallet from renderer API & dispatch wallet or error
      api.getWallet(services.apiClient, id, password)
        .then((walletResponse: GetWalletResponse) => {
          // Check wallet response type
          switch (walletResponse.kind) {
            case "SUCCESS":
              resolve(walletResponse.wallet)
              break
            case "ERROR":
              reject(walletResponse.error)
              break
            default:
              assertNever(walletResponse)
          }
        })
        .catch((error) => {
          reject(`UNLOCK_WALLET_UNEXPECTED_ERROR ${error.message}`)
        })
    })
  }
}

// Action creator to save wallet
export const saveWallet = (wallet: Wallet): SaveWalletAction => {
  return actionCreator<Wallet>(Actions.SAVE_WALLET)(wallet)
}