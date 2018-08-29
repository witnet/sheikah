import * as Actions from "app/renderer/actions/actionNames"
import { SaveTransactionsAction } from "app/renderer/actions/actionTypes"
import { ComputedTransactions } from "app/renderer/prefilledTransactions"

const defaultTransactions: ComputedTransactions = []

export const transactionsReducer = (state: ComputedTransactions = defaultTransactions,
  action: SaveTransactionsAction): ComputedTransactions => {
  switch (action.type) {
    case Actions.SAVE_TRANSACTIONS:
      return action.payload ? action.payload : state
    default:
      return state
  }
}