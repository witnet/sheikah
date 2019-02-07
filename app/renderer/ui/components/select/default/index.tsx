import * as React from "react"
import { Select } from "antd"
const Option = Select.Option

// const styles = require("./style.scss")

export interface SelectDefaultProps {
  className?: string,
  defaultValue?: string,
  onChange?: any,
}

/**
 * Select default ui component
 *
 * @export
 * @class SelectDerfault
 * @extends {React.Component<SelectDefaultProps>}
 */
export default class SelectDefault extends React.Component<SelectDefaultProps> {
  public render() {
    return (
      <Select
        className={this.props.className}
        defaultValue={this.props.defaultValue}
        onChange={this.props.onChange}
      >
        {this.props.children}
      </Select>
    )
  }
}

export {
  Option,
  SelectDefault as Select,
}
