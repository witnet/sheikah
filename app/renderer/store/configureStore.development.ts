import {applyMiddleware, compose, createStore} from "redux"
import thunk from "redux-thunk"
import {createLogger} from "redux-logger"
import rootReducer from "../reducers"

import * as counterActions from "../actions/counter"
import {connectRouter, push, routerMiddleware} from "connected-react-router"
import createHashHistory from "history/createHashHistory"

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
const actionCreators = Object.assign({},
  counterActions,
  { push }
)

const logger = (createLogger as any)({
  level: "info",
  collapsed: true
})

const history = createHashHistory({basename: "/"})
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

const middlewares: Array<any> = [thunk, router]
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger)
}

/* eslint-enable no-underscore-dangle */
const enhancer = composeEnhancers(
  applyMiddleware.apply(undefined, middlewares)
)

export = {
  history,
  configureStore(initialState: Object | void) {
    const store = createStore(connectRouter(history)(rootReducer), initialState, enhancer)

    if (module.hot) {
      module.hot.accept("../reducers", () => {
        // eslint-disable-line global-require
        store.replaceReducer(require("../reducers"))
      })
    }

    return store
  }
}
