import * as React from "react"

const styles = require("./style.scss")

export interface Iprops {
  className?: string
  onChange?: (e: React.ChangeEvent) => void
  value?: string
}

/**
 * Big input UI component
 *
 * @export
 * @class InputWit
 * @extends {React.Component<Iprops>}
 */
export default class InputBig extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs
  public render() {
    const className = `${styles.big} ${this.props.className}`

    return (
      <textarea
        className={className}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    )
  }
}