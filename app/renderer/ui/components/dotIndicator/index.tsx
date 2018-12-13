import * as React from "react"

const styles = require("./style.scss")

export interface Props {
  mood: "positive" | "neutral" | "warning" | "negative"
}

/**
 * Dot indicator UI component
 *
 * @export
 * @class DotIndicator
 * @extends {React.Component<Props>}
 */

export default class DotIndicator extends React.Component<Props> {
  // tslint:disable-next-line: completed-docs
  public render() {
    const dotStyle = `fa fa-circle dot ${styles[this.props.mood]}`

    return (
      <i className={dotStyle} />
    )
  }
}

export { DotIndicator }