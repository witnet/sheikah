import * as React from "react"

const styles = require("./style.scss")

export interface SpinnerProps {
  active: boolean,
  className?: string,
}

/**
 * Spinner UI component
 *
 * @export
 * @class Spinner
 * @extends {React.Component<SpinnerProps>}
 */

export default class Spinner extends React.Component<SpinnerProps> {
  public render() {
    return (
      <div className={`${this.props.className} ${this.props.active ? styles.spinner : ""}`} />
    )
  }
}

export { Spinner }
