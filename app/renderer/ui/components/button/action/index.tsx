import * as React from "react"

import { Button } from "antd"

const styles = require("./style.scss")

export interface Iprops {
  className?: string,
  onClick?: any,
  disabled?: boolean,
}

/**
 * Action button UI component
 *
 * @export
 * @class ActionButton
 * @extends {React.Component<Iprops>}
 */

export default class ActionButton extends React.Component<Iprops> {
  public render() {
    return (
      <Button
        className={`${styles.button} ${this.props.className}`}
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </Button>
    )
  }
}
