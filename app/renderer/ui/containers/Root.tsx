import * as React from "react"
import * as Redux from "react-redux"
import { History } from "history"
import routes from '../../routes';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

// tslint:disable-next-line:no-duplicate-imports
interface IRootType {
  store: Redux.Store<any>
  history: History
}

const Root = ( { store, history }: IRootType) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */ }
        <div>
          {routes}
        </div>
      </ConnectedRouter>
    </Provider>
  )
}
export default Root
