import * as React from "react"
import { Redirect, Route } from "react-router"

/**
 * Route with a redirect to location A or B depending on the result of executing a guard function
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class RedirectedRoute extends React.Component<any> {
  /**
   * RedirectedRoute render function.
   */
  public render() {
    const { locationA, locationB, guard, ...props } = this.props
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderer = (props: any) => {
      return guard(props)
        ? <Redirect to={{ pathname: locationA }} />
        : <Redirect to={{ pathname: locationB }} />
    }

    return <Route {...props} render={renderer} />
  }
}
