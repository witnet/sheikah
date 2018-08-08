import * as React from "react"
import { Route, Switch, match } from "react-router"
import { Store } from "redux"

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
        path={`${match.url}/login`}
        component={LoginFormContainer}
      />
      <Route
        path={`${match.url}/wallet`}
        component={SignupPage}
      />
    </Switch>
  </div>
)

export default Forms
