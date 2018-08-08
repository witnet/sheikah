import { connectRouter, routerMiddleware } from "connected-react-router"
import createHashHistory from "history/createHashHistory"
import { applyMiddleware, compose, createStore } from "redux"

import rootReducer from "app/renderer/reducers"
import { StoreState } from "app/renderer/store"

const history = createHashHistory()
const router = routerMiddleware(history)

/**
 * This function is exposed to the renderer process' index in order to let it create the store with
 * all the needed services or enhancers passed to it using dependency injection.
 * @param initialState
 * @param services
 */
function configureStore(initialState: StoreState) {

  const middlewares = [router]

  const enhancer = compose(applyMiddleware.apply(undefined, middlewares))

  return createStore(connectRouter(history)(rootReducer), initialState, enhancer)
}

export = {
  history,
  configureStore
}
