import * as React from "react"

import * as _ from "lodash"
import { Button } from "antd"

const styles = require("./style.scss")

export interface Iprops {
  className?: string
  onClick?: any
  recommended?: boolean
  secondaryText?: string
  text: any,
}

/**
 * Option button UI component
 *
 * @export
 * @class ButtonWit
 * @extends {React.Component<Iprops>}
 */

export default class ButtonOption extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs
  public render() {
    const recommendedStyle = _.get(this, "props.recommended", "")

    const className = `${styles.button} ${recommendedStyle} ${this.props.className}`
    const text = (
      <>
        <span>{this.props.text}</span> <span>{_.get(this, "props.secondaryText", "")}</span>
      </>
    )

    return (
      <Button className={className} onClick={this.props.onClick}>
        {text}
      </Button>
    )
  }
}
