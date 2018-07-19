import rootReducer, { StoreState } from "app/renderer/reducers"
import { Services } from "app/renderer/services"
import { connectRouter, routerMiddleware } from "connected-react-router"
import createHashHistory from "history/createHashHistory"
import { applyMiddleware, compose, createStore } from "redux"
import thunk from "redux-thunk"

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

  const enhancer = compose(applyMiddleware.apply(undefined, middlewares))

  return createStore(connectRouter(history)(rootReducer), initialState, enhancer)
}

export = {
  history,
  configureStore
}
