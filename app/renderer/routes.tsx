import * as React from "react"
import { Store } from "redux"
import { Route, Switch } from "react-router"

import { StoreState } from "app/renderer/store"
import App from "app/renderer/ui/containers/App"
import {
  default as LoginFormContainer,
  PATHS as PATHS_LOGIN_FORM
} from "app/renderer/ui/containers/LoginForm"
import MainPage from "./ui/pages/main"
import { SignupPage } from "./ui/pages/signup"
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
          // TODO: update with PATHS from new wallet form container
          path="/forms/wallet"
          render={newWalletRenderer}
        />
        <Route
          // TODO: update with PATHS from Main container
          path="/main"
          render={mainRenderer}
        />
        <Route
          path={PATHS_LOGIN_FORM.ROOT}
          render={loginRenderer}
        />
        <RedirectedRoute
          exact={true}
          path="/"
          guard={ifWallets(props.store)}
          locationA={PATHS_LOGIN_FORM.WALLET_SELECTION}
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

/**
 * Function to render the Login form (wallet infos available)
 */
const loginRenderer = (props: any) => {
  return <LoginFormContainer {...props} />
}

/**
 * Function to render the New Wallet form (wallet infos not available)
 */
const newWalletRenderer = (props: any) => {
  return <SignupPage {...props} />
}