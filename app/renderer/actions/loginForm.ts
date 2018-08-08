import { actionCreator } from "./helpers"
import * as Actions from "./actionNames"
import { Wallet } from "app/common/runtimeTypes/storage/wallets"
import {
  SaveWalletAction,
} from "./actionTypes"

// Action creator to save wallet
export const saveWallet = (wallet: Wallet): SaveWalletAction => {
  return actionCreator<Wallet>(Actions.SAVE_WALLET)(wallet)
}