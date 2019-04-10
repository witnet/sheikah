import * as React from "react"
import { Alert } from "antd"

const styles = require("./style.scss")

export interface Iprops {
  className?: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type?: any,
  title: string,
  description?: string,
}

/**
 * Alert UI component which renders different types of messages with a title
 *
 * @export
 * @class AlertMessage
 * @extends {React.Component<Iprops>}
 */
export default class AlertMessage extends React.Component<Iprops> {
  public render() {
    const style = this.props.description ? {} : styles.hidden

    return (
      <Alert
        className={`${this.props.className} ${style}`}
        message={this.props.title}
        type={this.props.type}
        description={this.props.description}
      >
        {this.props.children}
      </Alert>
    )
  }
}
