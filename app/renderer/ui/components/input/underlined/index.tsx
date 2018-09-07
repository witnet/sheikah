import * as React from "react"

import { Input } from "antd"

const styles = require("./style.scss")

export interface Iprops {
  value?: string
  className?: string
  onChange?: (e: React.ChangeEvent) => void
  type?: string
  readOnly?: boolean
}

/**
 * Underlined input UI component
 *
 * @export
 * @class InputUnderlined
 * @extends {React.Component<Iprops>}
 */

export default class InputUnderlined extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs
  public render() {
    const className = `${styles.underlined} ${this.props.className}`

    return (
      <Input
        className={className}
        type={this.props.type}
        value={this.props.value}
        onChange={this.props.onChange}
        readOnly={this.props.readOnly}
      />
    )
  }
}
