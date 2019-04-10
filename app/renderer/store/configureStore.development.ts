import { createStore, applyMiddleware, compose } from "redux"
import { createHashHistory } from "history"
import { connectRouter, push, routerMiddleware } from "connected-react-router"
import { createLogger } from "redux-logger"

import rootReducer from "app/renderer/reducers"
import { StoreState } from "app/renderer/store"

declare const window: Window & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(a: any): void,
}

declare const module: NodeModule & {
  hot?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    accept(...args: Array<any>): any,
  },
}

/* eslint-disable-next-line: prefer-object-spread */
const actionCreators = Object.assign({},
  { push }
)

const logger = createLogger({
  level: "info",
  collapsed: true,
})

const history = createHashHistory()
const router = routerMiddleware(history)

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable: no-underscore-dangle */
const composeEnhancers: typeof compose =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      /* eslint-disable-next-line:max-line-length */
      // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
      actionCreators,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any
    : compose

/**
 * This function is exposed to the renderer process' index in order to let it create the store with
 * all the needed services or enhancers passed to it using dependency injection.
 * @param initialState
 * @param services
 */
function configureStore(initialState: StoreState) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const middlewares: Array<any> = [router]
  if (process.env.NODE_ENV === "development") {
    middlewares.push(logger)
  }

  const enhancer = composeEnhancers(
    applyMiddleware.apply(undefined, middlewares)
  )

  const store = createStore(connectRouter(history)(rootReducer), initialState, enhancer)

  if (module.hot) {
    module.hot.accept("app/renderer/reducers", () => {
      // eslint-disable-line global-require
      store.replaceReducer(require("app/renderer/reducers").default)
    })
  }

  return store
}

export = {
  history,
  configureStore,
}
