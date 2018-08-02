import * as React from "react"

export interface Iprops {
  className?: string
}

/**
 * Alert default UI component
 *
 * @export
 * @class AlertDefault
 * @extends {React.Component<Iprops>}
 */
export default class AlertDefault extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs
  public render() {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    )
  }
}