import * as React from "react"

import { Input } from "antd"

const styles = require("./style.scss")

export interface Iprops {
  className?: string
}

/**
 * Big input UI component
 *
 * @export
 * @class InputWit
 * @extends {React.Component<Iprops>}
 */
export default class InputBig extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs
  public render() {
    const className = `${styles.big} ${this.props.className}`

    return (
      <Input className={className} />
    )
  }
}