import { SignupPage } from "app/renderer/ui/pages/signup"
import * as React from "react"
import { Route } from "react-router"
import { Store } from "redux"

import App from "./ui/containers/App"
import { MainPage } from "./ui/pages/main"
import { StoreState } from "./store"

import { RedirectedRoute } from "app/renderer/utils/redirectedRoute"
import { ifWallet, ifWallets } from "app/renderer/utils/guards"
import SoftLoginPage from "app/renderer/ui/containers/SoftLoginPage"

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
        aCompo={SoftLoginPage}
        redirect="/wallets/new"
      />
      <Route
        path="/wallets/new"
        component={SignupPage}
      />
    </App>
  )
}
