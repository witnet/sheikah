import * as React from "react"

import { Card } from "antd"

const styles = require("./style.scss")

export interface Iprops {
  className?: string
  navigation?: boolean
  nextStep?: any
  previousStep?: any
  title: string
}

/**
 * Default card UI component
 *
 * @export
 * @class CardDefault
 * @extends {React.Component<Iprops>}
 */
export default class CardDefault extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs

  public render() {
    console.log(this.props)
    return (
      <div className={this.props.className}>
        <Card title={this.props.title}>
          <div className={styles.content}>
            {this.props.children}
          </div>
        </Card>
      </div>
    )
  }
}