import { applyMiddleware, compose, createStore } from "redux"
import thunk from "redux-thunk"
import { push, routerMiddleware } from "react-router-redux"
import createHashHistory from "history/createHashHistory"
import { createLogger } from "redux-logger"

import { inDevelopment } from "app/common/env"
import { State, rootReducer } from "app/renderer/reducers"
import * as counterActions from "app/renderer/actions/counter"

declare const window: Window & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(a: any): void;
}

declare const module: NodeModule & {
  hot?: {
    /* tslint:disable-next-line:array-type */
    accept(...args: Array<any>): any;
  };
}

/* tslint:disable-next-line:prefer-object-spread */

const actionCreators = Object.assign({}, counterActions, { push })

const logger = (createLogger as any)({
  level: "info",
  collapsed: true
})

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

export const history = inDevelopment ?
  createHashHistory({ basename: "/" }) :
  createHashHistory()

const enhancer = inDevelopment ?
  composeEnhancers(
    applyMiddleware(thunk, routerMiddleware(history), logger)
  ) :
  applyMiddleware(thunk, routerMiddleware(history))

export function configureStore(initialState: State) {
  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept("../reducers", () => {
      // eslint-disable-line global-require
      store.replaceReducer(require("../reducers"))
    })
  }

  return store
}