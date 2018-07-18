import { walletsReducer, WalletsState } from "app/renderer/reducers/wallets"
import { combineReducers, Reducer } from "redux"

// Combine all the relevant Redux reducers
const rootReducer = combineReducers({
  wallets: walletsReducer,
}) as Reducer<StoreState>

export interface StoreState {
  wallets: WalletsState
}

export default rootReducer