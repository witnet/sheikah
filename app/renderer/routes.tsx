import { SignupPage } from "app/renderer/ui/pages/signup"
import * as React from "react"
import { Route } from "react-router"
import { Store } from "redux"

import App from "app/renderer/ui/containers/App"
import { MainPage } from "app/renderer/ui/pages/main"
import { StoreState } from "app/renderer/store"

import { RedirectedRoute } from "app/renderer/utils/redirectedRoute"
import { ifWallet, ifWallets } from "app/renderer/utils/guards"
import LoginFormContainer from "app/renderer/ui/containers/LoginForm"

type RoutesProps = {
  store: Store<StoreState>
}

export default (props: RoutesProps) => {
  const { store } = props

  return (
    <App>
      <RedirectedRoute
        path="/"
        guard={ifWallet(store)}
        aCompo={MainPage}
        redirect="/login"
      />
      <RedirectedRoute
        path="/login"
        guard={ifWallets(store)}
        aCompo={LoginFormContainer}
        redirect="/wallets/new"
      />
      <Route
        path="/wallets/new"
        component={SignupPage}
      />
    </App>
  )
}
