import * as React from "react"
import {Route, Switch} from "react-router"

import SignupPage from "./ui/containers/SignupPage"
import HomePage from "./ui/containers/HomePage"

export default (
  <Switch>
    <Route path="/" component={HomePage} />
    <Route path="/signup" component={SignupPage} />
  </Switch>
)
