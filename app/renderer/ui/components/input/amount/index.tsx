import * as React from "react"
import { Input } from "antd"

const styles = require("./style.scss")

export interface InputAmountProps {
  className?: string,
  max?: string,
  min?: string,
  name?: string,
  onBlur?: React.ChangeEventHandler,
  onChange?: React.ChangeEventHandler,
  onKeyUp?: React.KeyboardEventHandler,
  type?: string,
  units?: string,
  value?: string | number,
}

/**
 * Input with amount (and units) UI component
 *
 * @export
 * @class InputAmount
 * @extends {React.Component<InputAmountProps>}
 */

export default class InputAmount extends React.Component<InputAmountProps> {
  public render() {
    return (
      <div>
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
