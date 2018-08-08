import * as React from "react"
import { Route, Switch, match } from "react-router"
import { Store } from "redux"

import * as urls from "app/common/constants/urls"
import { StoreState } from "app/renderer/store"
import {
  default as LoginFormContainer
} from "app/renderer/ui/containers/LoginForm"
import { SignupPage } from "app/renderer/ui/pages/signup"

export type Props = {
  match: match<unknown>,
  store: Store<StoreState>
}

export const Forms = ({ match, store }: Props) => (
  <div>
    <Switch>
      <Route
        path={urls.login}
        component={LoginFormContainer}
      />
      <Route
        path={urls.newWallet}
        component={SignupPage}
      />
    </Switch>
  </div>
)

export default Forms
