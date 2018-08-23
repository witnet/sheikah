import { combineReducers, Reducer } from "redux"
import { TransactionsReducer } from "app/renderer/reducers/transactions"
import { walletsReducer } from "app/renderer/reducers/wallets"
import { walletReducer } from "app/renderer/reducers/wallet"
import { StoreState } from "app/renderer/store"

// Combine all the relevant Redux reducers
const rootReducer = combineReducers({
  walletInfos: walletsReducer,
  wallet: walletReducer,
  transactions: TransactionsReducer
}) as Reducer<StoreState>

export default rootReducer
