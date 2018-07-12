import * as React from "react"
import { RouteComponentProps } from "react-router"
import Home from "app/renderer/ui/components/home/Home"

/** Class HomePage */
export class HomePage extends React.Component<RouteComponentProps<any>, void> {
  /** render */
  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    return (
      <Home />
    )
  }
}

export default (
  HomePage as any as React.StatelessComponent<RouteComponentProps<any>>
)
