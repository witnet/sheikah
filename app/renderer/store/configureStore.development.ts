import { Services } from "app/renderer/services"
import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { createHashHistory } from "history"
import { connectRouter, push, routerMiddleware } from "connected-react-router"
import { createLogger } from "redux-logger"
import rootReducer, { StoreState } from "app/renderer/reducers"

declare const window: Window & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(a: any): void
}

declare const module: NodeModule & {
  hot?: {
    /* tslint:disable-next-line:array-type */
    accept(...args: Array<any>): any
  }
}

/* tslint:disable-next-line:prefer-object-spread */
const actionCreators = Object.assign({},
  { push }
)

const logger = (createLogger as any)({
  level: "info",
  collapsed: true
})

const history = createHashHistory()
const router = routerMiddleware(history)

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers: typeof compose =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    /* tslint:disable-next-line:no-void-expression */
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      /* tslint:disable-next-line:max-line-length */
      // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
      actionCreators
    }) as any
    : compose

/**
 * This function is exposed to the renderer process' index in order to let it create the store with
 * all the needed services or enhancers passed to it using dependency injection.
 * @param initialState
 * @param services
 */
function configureStore(initialState: StoreState, services: Services) {

  const middlewares: Array<any> = [thunk.withExtraArgument(services), router]
  if (process.env.NODE_ENV === "development") {
    middlewares.push(logger)
  }

  const enhancer = composeEnhancers(
    applyMiddleware.apply(undefined, middlewares)
  )

  const store = createStore<StoreState>(connectRouter(history)(rootReducer), initialState, enhancer)

  if (module.hot) {
    module.hot.accept("app/renderer/reducers", () => {
      // eslint-disable-line global-require
      store.replaceReducer(require("app/renderer/reducers"))
    })
  }

  return store
}

export = {
  history,
  configureStore
}
