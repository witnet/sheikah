import * as React from "react"

import { Input } from "antd"

const styles = require("./style.scss")

export interface UnderlinedInputProps {
  className?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  readOnly?: boolean,
  type?: string,
  value?: string,
}

/**
 * Underlined input UI component
 *
 * @export
 * @class InputUnderlined
 * @extends {React.Component<UnderlinedInputProps>}
 */

export default class InputUnderlined extends React.Component<UnderlinedInputProps> {
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
