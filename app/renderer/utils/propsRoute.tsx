import * as React from "react"
import { Route, RouteComponentProps } from "react-router"

import { RoutesProps } from "app/renderer/routes"

/**
 * A PropsRoute component renders a Route in a path given by props.
 *
 * The render function of that Route will render a component given by props to PropsRoute
 * and the props of that component will be a merge between RouteComponentProps and
 * additional props (RoutesProps)
 */
export class PropsRoute extends React.Component<any> {
  /**
   * Function to render a component combining RouteComponentProps with RoutesProps
   * as props
   */
  private withOwnProps = (A: typeof React.Component, routesProps: RoutesProps, children: any) =>
    (props: RouteComponentProps<any>) => (<A {...routesProps} {...props}>{children}</A>)

  /**
   * PropsRoute render function.
   */
  public render() {
    const { path, ownProps, component, children } = this.props

    return <Route path={path} render={this.withOwnProps(component, ownProps, children)}/>
  }
}
