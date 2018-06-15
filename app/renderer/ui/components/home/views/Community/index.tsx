import * as React from "react"

export interface Iprops {
  className?: string
}

/**
 * Community UI component
 *
 * @export
 * @class Community
 * @extends {React.Component<Iprops>}
 */

export default class Community extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs
  public render() {
    return (
      <div className={this.props.className}>
        Community
      </div>
    )
  }
}