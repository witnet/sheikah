import { StoreState } from "app/renderer/reducers"
import { SignupPage } from "app/renderer/ui/pages/signup"
import { GuardedRoute, ifWallets } from "app/renderer/utils/guardedRoute"
import * as React from "react"
import { Route, Switch } from "react-router"
import { Store } from "redux"

import App from "./ui/containers/App"
import { MainPage } from "./ui/pages/main"

type RoutesProps = {
  store: Store<StoreState>
}

export default (props: RoutesProps) => {
  const { store } = props

  return (
    <App>
      <Switch>
        <GuardedRoute path="/" guard={ifWallets(store)} aCompo={MainPage} bCompo={SignupPage} />
        <GuardedRoute path="/main" guard={ifWallets(store)} aCompo={MainPage} bCompo={SignupPage} />
        <Route path="/wallets/new" component={SignupPage} />
      </Switch>
    </App>
  )
}
