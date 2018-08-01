import * as React from "react"

import { Input } from "antd"

export interface Iprops {
  className?: string
  type?: string
  onChange?: any
  onBlur?: any
}

/**
 * Default input UI component
 *
 * @export
 * @class InputDefault
 * @extends {React.Component<Iprops>}
 */

export default class InputDefault extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs
  public render() {
    return (
      <Input
        className={this.props.className}
        type={this.props.type}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
      />
    )
  }
}