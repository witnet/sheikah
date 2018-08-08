import * as React from "react"
import { Switch } from "react-router"
import { Store } from "redux"

import * as urls from "app/renderer/constants/urls"
import { StoreState } from "app/renderer/store"
import {
  default as LoginFormContainer
} from "app/renderer/ui/containers/LoginForm"
import WalletFormContainer from "app/renderer/ui/containers/WalletForm"
import { PropsRoute } from "app/renderer/utils/propsRoute"
import { Services } from "app/renderer/services"
import { ifWallets } from "app/renderer/utils/guards"
import { RedirectedRoute } from "app/renderer/utils/redirectedRoute"

export type Props = {
  store: Store<StoreState>
  services: Services
}

export const Forms = (props: Props) => (
  <div>
    <Switch>
      <PropsRoute
        path={urls.LOGIN}
        ownProps={props}
        component={LoginFormContainer}
      />
      <PropsRoute
        path={urls.NEW_WALLET}
        ownProps={props}
        component={WalletFormContainer}
      />
      <RedirectedRoute
        exact={true}
        path={urls.FORMS}
        guard={ifWallets(props.store)}
        locationA={urls.LOGIN}
        locationB={urls.NEW_WALLET}
      />
    </Switch>
  </div>
)

export default Forms