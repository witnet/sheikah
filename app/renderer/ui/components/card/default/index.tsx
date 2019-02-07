import * as React from "react"

import { Card } from "antd"

const styles = require("./style.scss")

export interface CardDefaultProps {
  className?: string,
  title?: string,
  style?: React.CSSProperties,
  contentStyle?: React.CSSProperties,
}

/**
 * Default card UI component
 *
 * @export
 * @class CardDefault
 * @extends {React.Component<CardDefaultProps>}
 */
export default class CardDefault extends React.Component<CardDefaultProps> {
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
