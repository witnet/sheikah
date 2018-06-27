import * as React from "react"
import { RouteComponentProps } from "react-router"

import Signup from "../components/signup/index"

/**
 * Sigup page UI component
 *
 * @export
 * @class SignupPage
 * @extends {React.Component<RouteComponentProps<any>, void>}
 */

export class WalletWizard extends React.Component<RouteComponentProps<any>, void> {
  /** render */
  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    return (
      <Signup />
    )
  }
}

export default (
  WalletWizard as any as React.StatelessComponent<RouteComponentProps<any>>
)
