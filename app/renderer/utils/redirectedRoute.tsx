import * as React from "react"
import { Redirect, Route } from "react-router"

/**
 * A guarded route renders component A or B depending on the result of executing a guard function
 * with the arguments passed to the route.
 */
export class RedirectedRoute extends React.Component<any> {

  /**
   * Guarded route render function.
   */
  public render() {
    const { component: A, redirect: location, guard, ...props } = this.props

    const renderer = (props: any) => {
      return guard(props) ? <A {...props} /> : location ? <Redirect to={{ pathname: location }} /> :
        <div>The guard of a guarded route failed without a redirect</div>
    }

    return <Route {...props} render={renderer} />
  }
}
