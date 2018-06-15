import * as React from "react"

export interface Iprops {
  className?: string
}

/**
 * BlockExplorer UI component
 *
 * @export
 * @class BlockExplorer
 * @extends {React.Component<Iprops>}
 */

export default class BlockExplorer extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs
  public render() {
    return (
      <div className={this.props.className}>
        BlockExplorer
      </div>
    )
  }
}