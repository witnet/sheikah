import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { createBrowserHistory } from "history"
import { routerMiddleware } from "react-router-redux"
import rootReducer, { StoreState } from "app/renderer/reducers"

const history = createBrowserHistory()
const router = routerMiddleware(history)
const enhancer = applyMiddleware(thunk, router)

export = {
  history,
  configureStore(initialState: StoreState) {
    return createStore<StoreState>(rootReducer, initialState, enhancer)
  }
}
