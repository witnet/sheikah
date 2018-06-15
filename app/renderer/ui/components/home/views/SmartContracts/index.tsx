import * as React from "react"

export interface Iprops {
  className?: string
}

/**
 * SmartContracts UI component
 *
 * @export
 * @class SmartContracts
 * @extends {React.Component<Iprops>}
 */

export default class SmartContracts extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs
  public render() {
    return (
      <div className={this.props.className}>
        SmartContracts
      </div>
    )
  }
}