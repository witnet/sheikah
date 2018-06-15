import * as React from "react"

import { Input } from "antd"

export interface Iprops {
  className?: string
  type?: string
}

/**
 * Default input UI component
 *
 * @export
 * @class InputuDefault
 * @extends {React.Component<Iprops>}
 */

export default class InputuDefault extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs
  public render() {
    return (
      <Input className={this.props.className} />
    )
  }
}