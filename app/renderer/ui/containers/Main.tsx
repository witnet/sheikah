import * as React from "react"
import { RouteComponentProps } from "react-router"

export const PATHS = {
  MAIN: "/main"
}

/**
 * Wallet Form UI component
 *
 * @export
 * @class MainContainer
 * @extends {React.Component<RouteComponentProps<any>, void>}
 */

export class MainContainer extends React.Component<RouteComponentProps<any>, void> {
  /** render */
  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    return ""
  }
}

export default (
  MainContainer as any as React.StatelessComponent<RouteComponentProps<any>>
)