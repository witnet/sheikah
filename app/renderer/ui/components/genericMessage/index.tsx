import * as React from "react"

const styles = require("./style.scss")

export interface OwnProps {
  className: string
  msg: string
}

/**
 * Component that renders a message passed as props
 */
export default class GenericMessage extends React.Component<OwnProps> {
  // tslint:disable-next-line: completed-docs
  public render() {
    return (
      <p className={styles[this.props.className]}>
        {this.props.msg}
      </p>
    )
  }
}