import * as React from "react"
import { RouteComponentProps } from "react-router"

import Home from "../components/home/index"

/**
 * Home page UI component
 *
 * @export
 * @class HomePage
 * @extends {React.Component<RouteComponentProps<any>, void>}
 */

export class HomePage extends React.Component<RouteComponentProps<any>, void> {
  /** render */
  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    return (
      <Home location={this.props.location} />
    )
  }
}

export default (
  HomePage as any as React.StatelessComponent<RouteComponentProps<any>>
)