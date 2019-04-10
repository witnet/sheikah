import * as React from "react"

import * as _ from "lodash"
import { Button } from "antd"

const styles = require("./style.scss")

export interface ButtonOptionProps {
  className?: string,
  onClick?: React.MouseEventHandler,
  recommended?: boolean,
  secondaryText?: string,
}

/**
 * Option button UI component
 *
 * @export
 * @class ButtonWit
 * @extends {React.Component<ButtonOptionProps>}
 */

export default class ButtonOption extends React.Component<ButtonOptionProps> {
  public render() {
    const recommendedStyle = _.get(this, "props.recommended", "")
      ? styles.recommended
      : ""

    const className = `${styles.button} ${recommendedStyle} ${this.props.className}`

    return (
      <Button className={className} onClick={this.props.onClick}>
        <span>
          {this.props.children}</span> <span>{this.props.secondaryText}
        </span>
      </Button>
    )
  }
}
