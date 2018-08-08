import { History } from "history"
import * as React from "react"
import { Provider } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import { Store } from "redux"
import { hot } from "react-hot-loader"

import Routes from "app/renderer/routes"
import { Services } from "app/renderer/services"

interface IRootType {
  store: Store,
  history: History,
  services: Services
}

const Root = ({ store, history, services }: IRootType) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes services={services} store={store} />
      </ConnectedRouter>
    </Provider>
  )
}
export default hot(module)(Root)
