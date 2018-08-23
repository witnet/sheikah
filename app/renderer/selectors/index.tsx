import { createSelector } from "reselect"

import { StoreState } from "app/renderer/store/index"
import { Transactions } from "app/common/runtimeTypes/storage/transactions"

const getTransactions = (state: StoreState) => {
  console.log("Memoize transactions", state.transactions)

  return state.transactions
}

export const filterConfirmedTransactions = createSelector(
  [getTransactions],
  (transactions: Transactions) => {
      return transactions || {}
    }
)
export const filterPendingTransactions = createSelector(
  [getTransactions],
  (transactions: Transactions) => {
      return transactions || {}
    }
)
