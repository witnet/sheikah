import * as React from "react"
import { Switch, Route } from "react-router"

import App from "./containers/App"
import SignupPage from "./ui/containers/SignupPage"
import HomePage from "./ui/containers/HomePage"

export default () => (
  <App>
    <Switch>
      <Route path="/signup" component={SignupPage} />
      <Route path="/" component={HomePage} />
      <Route path="/home/:path" component={HomePage} />
    </Switch>
  </App>
)
