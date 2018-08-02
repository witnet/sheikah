import Routes from "app/renderer/routes"
import { History } from "history"
import * as React from "react"
import { Provider } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import { Store } from "redux"
import { hot } from "react-hot-loader"

interface IRootType {
  store: Store,
  history: History
}

const Root = ({ store, history }: IRootType) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes store={store} />
      </ConnectedRouter>
    </Provider>
  )
}
export default hot(module)(Root)
