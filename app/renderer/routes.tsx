import * as React from "react"
import {Route, Switch} from "react-router"

import WalletWizard from "./ui/containers/WalletWizard"
import MainUI from "./ui/containers/MainUI"
import {State} from "./reducers"
import {connect, Dispatch} from "react-redux"
import {push} from "connected-react-router"

type StateProps = {}
type DispatchProps = {
  goTo: Function
}

const Splash = (props: StateProps & DispatchProps) => (
  <div>
    <h1>Splash!</h1>
    <button onClick={props.goTo("/main")}>Go to main</button>
    <button onClick={props.goTo("/walletWizard")}>Go to FTU</button>
  </div>
)

const mapStateToProps = (state: State): StateProps => ({})
const mapDispatchToProps = (dispatch: Dispatch<State>): DispatchProps => ({
  goTo: (path: string) => () => dispatch(push(path))
})
const ConnectedSplash = connect(mapStateToProps, mapDispatchToProps)(Splash)

const NoMatch = () => (
  <div>
    No match
  </div>
)

export default (
  <Switch>
    <Route path="/" component={ConnectedSplash} exact={true} />
    <Route path="/main" component={MainUI} />
    <Route path="/walletWizard" component={WalletWizard} />
    <Route component={NoMatch} />
  </Switch>
)