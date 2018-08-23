import { actionCreator } from "./helpers"
import * as Actions from "./actionNames"
import { Transactions } from "app/common/runtimeTypes/storage/transactions"
import {
  SaveTransactionsAction,
} from "./actionTypes"

// Action creator to save wallet
export const getTransactions = (transactions: Transactions): SaveTransactionsAction => {
  return actionCreator<Transactions>(Actions.SAVE_TRANSACTIONS)(transactions)
}