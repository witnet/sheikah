import * as React from "react"
import { Input } from "antd"

const styles = require("./style.scss")

export interface Iprops {
  className?: string
  type?: string
  name?: string
  value?: string | number
  onChange?: React.ChangeEventHandler
  onBlur?: React.ChangeEventHandler
  onKeyUp?: React.KeyboardEventHandler
  min?: string
  max?: string
  units?: string
}

/**
 * Input with amount (and units) UI component
 *
 * @export
 * @class InputAmount
 * @extends {React.Component<Iprops>}
 */

export default class InputAmount extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs
  public render() {
    return (
      <div className={styles.grid}>
        <Input
          className={this.props.className}
          type={this.props.type}
          name={this.props.name}
          value={this.props.value}
          min={this.props.min}
          max={this.props.max}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          onKeyUp={this.props.onKeyUp}
        />
        <span className={styles.units}>
          {this.props.units ? this.props.units : "WIT"}
        </span>
      </div>
    )
  }
}