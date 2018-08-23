import { actionCreator } from "./helpers"
import * as Actions from "./actionNames"
import { ComputedTransactions } from "app/renderer/prefilledTransactions"

import { Wallet } from "app/common/runtimeTypes/storage/wallets"
import {
  SaveTransactionsAction,
  SaveWalletAction,
} from "./actionTypes"

// Action creator to save wallet
export const saveWallet = (wallet: Wallet): SaveWalletAction => {
  return actionCreator<Wallet>(Actions.SAVE_WALLET)(wallet)
}

// Action creator to save wallet
export const saveTransactions = (transactions: ComputedTransactions): SaveTransactionsAction => {
  return actionCreator<ComputedTransactions>(Actions.SAVE_TRANSACTIONS)(transactions)
}