import * as React from "react"
import { Store } from "redux"
import { Route, Switch } from "react-router"

import * as urls from "app/common/constants/urls"
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
          path={urls.MAIN}
          render={mainRenderer}
        />
        <Route
          path={urls.FORMS}
          component={Forms}
        />
        <RedirectedRoute
          exact={true}
          path="/"
          guard={ifWallets(props.store)}
          locationA={urls.LOGIN}
          // TODO: update with PATHS from new wallet form container
          locationB={urls.NEW_WALLET}
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
