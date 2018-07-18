import * as React from "react"

import { Button } from "antd"

export interface Iprops {
  className?: string
  onClick?: any
}

/**
 * Default button UI component
 *
 * @export
 * @class ButtonDefault
 * @extends {React.Component<Iprops>}
 */

export default class ButtonDefault extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs
  public render() {
    return (
      <Button className={this.props.className} onClick={this.props.onClick}>
        {this.props.children}
      </Button>
    )
  }
}