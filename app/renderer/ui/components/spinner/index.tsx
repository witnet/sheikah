import * as React from "react"

const styles = require("./style.scss")

export interface Iprops {
  active: boolean
  className?: string
}

/**
 * Spinner UI component
 *
 * @export
 * @class Spinner
 * @extends {React.Component<Iprops>}
 */

export default class Spinner extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs prefer-function-over-method
  public render() {
    return (
      <div className={`${this.props.className} ${this.props.active ? styles.spinner : ""}`} />
    )
  }
}

export { Spinner }