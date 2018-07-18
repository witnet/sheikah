import rootReducer, { StoreState } from "app/renderer/reducers"
import { Services } from "app/renderer/services"
import createHashHistory from "history/createHashHistory"
import { applyMiddleware, compose, createStore } from "redux"
import { createLogger } from "redux-logger"
import { connectRouter, routerMiddleware } from "connected-react-router"
import thunk from "redux-thunk"

const logger = (createLogger as any)({
  level: "info",
  collapsed: true
})

const history = createHashHistory()
const router = routerMiddleware(history)

/**
 * This function is exposed to the renderer process' index in order to let it create the store with
 * all the needed services or enhancers passed to it using dependency injection.
 * @param initialState
 * @param services
 */
function configureStore(initialState: StoreState, services: Services) {

  const middlewares = [thunk.withExtraArgument(services), router]
  if (process.env.NODE_ENV === "development") {
    middlewares.push(logger)
  }

  const enhancer = compose(applyMiddleware.apply(undefined, middlewares))

  return createStore<StoreState>(connectRouter(history)(rootReducer), initialState, enhancer)
}

export = {
  history,
  configureStore
}
