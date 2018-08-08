import * as React from "react"
import { Store } from "redux"
import { Route, Switch } from "react-router"

import { StoreState } from "app/renderer/store"
import App from "app/renderer/ui/containers/App"
import Forms from "./ui/containers/Forms"
import MainPage from "./ui/pages/main"
import { ifWallets } from "./utils/guards"
import { RedirectedRoute } from "./utils/redirectedRoute"

type RoutesProps = {
  store: Store<StoreState>
}

export default (props: RoutesProps) => {

  return (
    <App>
      <Switch>
        <Route
          // TODO: update with PATHS from Main container
          path="/main"
          render={mainRenderer}
        />
        <Route
          path="/forms"
          component={Forms}
        />
        <RedirectedRoute
          exact={true}
          path="/"
          guard={ifWallets(props.store)}
          locationA="/forms/login"
          // TODO: update with PATHS from new wallet form container
          locationB="/forms/wallet"
        />
      </Switch>
    </App>
  )
}

/**
 * Function to render the Main component (wallet unlocked)
 */
const mainRenderer = (props: any) => {
  return <MainPage {...props} />
}
