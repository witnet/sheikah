import * as React from "react"

import { Button } from "antd"

const styles = require("./style.scss")

export interface ButtonNavigationProps {
  className?: string,
  onClick?: any,
  text: any,
}

/**
 * Navigation button UI component
 *
 * @export
 * @class ButtonNavigation
 * @extends {React.Component<ButtonNavigationProps>}
 */

export default class ButtonNavigation extends React.Component<ButtonNavigationProps> {
  public render() {
    const navigationClasses = `
      ${styles.button}
      ${this.props.className}
    `

    return (
      <Button className={navigationClasses} onClick={this.props.onClick}>
        {this.props.text}
      </Button>
    )
  }
}
