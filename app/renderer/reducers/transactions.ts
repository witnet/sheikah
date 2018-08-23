import * as Actions from "app/renderer/actions/actionNames"
import { TransactionsOption } from "app/renderer/store"
import { SaveTransactionsAction } from "app/renderer/actions/actionTypes"

const defaultTransactions: TransactionsOption = {}

export const TransactionsReducer = (state: TransactionsOption = defaultTransactions,
  action: SaveTransactionsAction
): TransactionsOption => {
  switch (action.type) {
    case Actions.SAVE_TRANSACTIONS:
      return action.payload.transactions || {}
    default:
      return state
  }
}