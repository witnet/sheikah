
import { RouterState } from "connected-react-router"

export const rootReducer = (state: State) => state
// combineReducers({})
export interface State {
  router?: RouterState
}

export default rootReducer