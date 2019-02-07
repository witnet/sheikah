import * as React from "react"

import { Button } from "antd"

const styles = require("./style.scss")

export interface Iprops {
  className?: string,
  onClick?: any,
}

/**
 * Link button UI component
 *
 * @export
 * @class ButtonLink
 * @extends {React.Component<Iprops>}
 */

export default class ButtonLink extends React.Component<Iprops> {
  public render() {
    return (
      <Button className={`${styles.button} ${this.props.className}`} onClick={this.props.onClick}>
        {this.props.children}
      </Button>
    )
  }
}
