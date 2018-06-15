import * as React from "react"
import { Switch, Route } from "react-router"
import App from "./containers/App"
import SignupPage from "./ui/containers/SignupPage"
import CounterPage from "./containers/CounterPage"
// import HomePage from "./containers/HomePage"

export default () => (
  <App>
    <Switch>
      <Route path="/counter" component={CounterPage} />
      <Route path="/" component={SignupPage} />
    </Switch>
  </App>
)
