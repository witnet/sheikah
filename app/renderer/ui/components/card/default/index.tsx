import * as React from "react"

import { Card } from "antd"

const styles = require("./style.scss")

export interface Iprops {
  className?: string
  title?: string
  style?: React.CSSProperties
  contentStyle?: React.CSSProperties
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
    return (
      <div className={this.props.className}>
        <Card
          className={styles.card}
          style={this.props.style}
          title={this.props.title}
          bordered={false}
        >
          <div className={`${styles.content} ${this.props.contentStyle}`}>
            {this.props.children}
          </div>
        </Card>
      </div>
    )
  }
}
