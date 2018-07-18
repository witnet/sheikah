import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { createHashHistory } from "history"
import { connectRouter, routerMiddleware } from "connected-react-router"
import { createLogger } from "redux-logger"
import rootReducer, { StoreState } from "app/renderer/reducers"

const logger = (createLogger as any)({
  level: "info",
  collapsed: true
})

const history = createHashHistory()
const router = routerMiddleware(history)

const middlewares: Array<any> = [thunk, router]
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger)
}

/* eslint-enable no-underscore-dangle */
const enhancer = compose(
  applyMiddleware.apply(undefined, middlewares)
)

export = {
  history,
  configureStore(initialState: StoreState) {
    const store = createStore<StoreState>(
      connectRouter(history)(rootReducer),
      initialState,
      enhancer
    )

    return store
  }
}
