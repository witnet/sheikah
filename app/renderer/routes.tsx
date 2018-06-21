import * as React from "react"
import { Switch, Route } from "react-router"

import App from "./containers/App"
import SignupPage from "./ui/containers/SignupPage"
import HomePage from "./ui/containers/HomePage"
/* import TestPage from "./ui/containers/TestPage" */

export default () => (
  <App>
    <Switch>
      {/* <Route path="/" component={TestPage} /> */}
      <Route path="/" component={HomePage} />
      <Route path="/signup" component={SignupPage} />
    </Switch>
  </App>
)
