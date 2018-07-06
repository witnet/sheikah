import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import { routerMiddleware } from "react-router-redux"
import rootReducer from "../reducers"
import { connectRouter } from "connected-react-router"
import createHashHistory from "history/createHashHistory"

const history = createHashHistory()
const router = routerMiddleware(history)
const enhancer = applyMiddleware(thunk, router)

export = {
  history,
  configureStore(initialState: {} | void) {
    return createStore(rootReducer, initialState || {}, enhancer)
  }
}
