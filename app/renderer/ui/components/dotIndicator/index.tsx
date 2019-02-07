import * as React from "react"

const styles = require("./style.scss")

export interface DotIndicatorProps {
  mood: "positive" | "neutral" | "warning" | "negative",
}

/**
 * Dot indicator UI component
 *
 * @export
 * @class DotIndicator
 * @extends {React.Component<DotIndicatorProps>}
 */

export default class DotIndicator extends React.Component<DotIndicatorProps> {
  public render() {
    const dotStyle = `fa fa-circle dot ${styles[this.props.mood]}`

    return (
      <i className={dotStyle} />
    )
  }
}

export { DotIndicator }
