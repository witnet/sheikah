import * as React from "react"

export interface Iprops {
  className?: string
}

/**
 * Attestations UI component
 *
 * @export
 * @class Attestations
 * @extends {React.Component<Iprops>}
 */

export default class Attestations extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs
  public render() {
    return (
      <div className={this.props.className}>
        Attestations
      </div>
    )
  }
}