import * as React from "react"

export interface Iprops {
  className?: string
}

/**
 * Alert UI component
 *
 * @export
 * @class Alert
 * @extends {React.Component<Iprops>}
 */

export default class Alert extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs
  public render() {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    )
  }
}