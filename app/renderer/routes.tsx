import * as React from "react"
import { Switch, Route } from "react-router"

import App from "./containers/App"
import SignupPage from "./ui/containers/SignupPage"
import CounterPage from "./containers/CounterPage"
// import HomePage from "./containers/HomePage"
import TestPage from "./ui/containers/TestPage"

export default () => (
  <App>
    <Switch>
      <Route path="/counter" component={CounterPage} />
      <Route path="/" component={TestPage} />
      <Route path="/signup" component={SignupPage} />
    </Switch>
  </App>
)
