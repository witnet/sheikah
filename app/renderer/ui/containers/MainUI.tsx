import * as React from "react"
import Main from "../components/main"
import {RouteComponentProps} from "react-router"

/**
 * Home page UI component
 *
 * @export
 * @class WalletWizard
 * @extends {React.Component<RouteComponentProps<any>, void>}
 */

export class MainUI extends React.Component<RouteComponentProps<any>> {

  /** render */
  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    return (
      <Main {...this.props} />
    )
  }
}

export default (
  MainUI as any as React.StatelessComponent
)