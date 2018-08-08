import * as React from "react"
import { Store } from "redux"
import { Switch } from "react-router"

import * as urls from "app/renderer/constants/urls"
import { StoreState } from "app/renderer/store"
import App from "app/renderer/ui/containers/App"
import Forms from "./ui/containers/Forms"
import MainPage from "./ui/pages/main"
import { ifWallets } from "./utils/guards"
import { RedirectedRoute } from "./utils/redirectedRoute"
import { PropsRoute } from "app/renderer/utils/propsRoute"
import { Services } from "app/renderer/services"

export type RoutesProps = {
  store: Store<StoreState>,
  services: Services
}

export default (props: RoutesProps) => {
  return (
    <App>
      <Switch>
        <PropsRoute
          path={urls.MAIN}
          ownProps={props}
          component={MainPage}
        />
        <PropsRoute
          path={urls.FORMS}
          ownProps={props}
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