import * as React from "react"
import {Provider, Store} from "react-redux"
import {History} from "history"
import {ConnectedRouter} from "connected-react-router"
import routes from "../../routes"

interface RootProps {
  store: Store<any>
  history: History
}

const Root = ({store, history}: RootProps) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {routes}
      </ConnectedRouter>
    </Provider>
  )
}

export default Root