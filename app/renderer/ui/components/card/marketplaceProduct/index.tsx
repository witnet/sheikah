import * as React from "react"

import { Card, } from "antd"
const styles = require("./style.scss")

export interface Iprops {
  cover: string
  alt: string
  title: string
  author: string
  rating: string
  tags: string[]
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
      <Card style={{ width: 240 }}
        cover={<img style={{ height: 100}} alt={this.props.alt} src={this.props.cover} />}
      >
        <div className={styles.content}>
          <p>{this.props.title}</p>
          <p>by {this.props.author}</p>
          <p>{this.props.rating}</p>
          <p>{this.props.tags}</p>
        </div>
      </Card>
    )
  }
}
