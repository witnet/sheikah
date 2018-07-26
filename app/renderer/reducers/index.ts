import { combineReducers, Reducer } from "redux"
import { walletsReducer } from "app/renderer/reducers/wallets"
import { walletReducer } from "app/renderer/reducers/wallet"
import { formsReducer } from "app/renderer/reducers/forms"
import { StoreState } from "app/renderer/store"

// Combine all the relevant Redux reducers
const rootReducer = combineReducers({
  wallets: walletsReducer,
  wallet: walletReducer,
  forms: formsReducer,
}) as Reducer<StoreState>

export default rootReducer