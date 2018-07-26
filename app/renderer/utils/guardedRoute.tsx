import * as React from "react"
import { Route } from "react-router"

/**
 * A guarded route renders component A or B depending on the result of executing a guard function
 * with the arguments passed to the route.
 */
export class GuardedRoute extends React.Component<any> {

  /**
   * Guarded route render function.
   */
  public render() {
    const { aCompo: A, bCompo: B, guard, ...props } = this.props

    const renderer = (props: any) => {
      return guard(props) ? <A {...props} /> : B ? <B {...props} /> :
        <div>The guard of a guarded route failed without a B component</div>
    }

    return <Route {...props} render={renderer} />
  }
}