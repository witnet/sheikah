import * as React from "react"

import { Button as AntdButton } from "antd"

const styles = require("./style.scss")

export interface Props {
  className?: string,
  type?: "action" | "default" | "link" | "navigation" | "option",
  onClick?: any,
  disabled?: boolean,
  secondaryText?: string,
  recommended?: boolean,
}

/**
 * Generic button UI component
 *
 * @export
 * @class ActionButton
 * @extends {React.Component<Props>}
 */

export default class Button extends React.Component<Props> {
  public render() {
    const style = styles[this.props.type || "default"]

    return (
      <AntdButton
        className={`${style} ${this.props.className}`}
        onClick={this.props.onClick}
        disabled={this.props.disabled || false}
      >
        {this.props.children}
      </AntdButton>
    )
  }
}

export {
  Button,
}
