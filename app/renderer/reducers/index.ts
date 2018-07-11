import { walletsReducer, WalletsState } from "app/renderer/reducers/wallets"
import { routerReducer, RouterState } from "react-router-redux"
import { combineReducers, Reducer } from "redux"

// Combine all the relevant Redux reducers
const rootReducer = combineReducers({
  wallets: walletsReducer,
  routing: routerReducer
}) as Reducer<StoreState>

export interface StoreState {
  wallets: WalletsState
  routing: RouterState
}

export default rootReducer