import * as React from "react"
import { Select } from "antd"
const Option = Select.Option

// const styles = require("./style.scss")

export interface Iprops {
  className?: string
  defaultValue?: string
  onChange?: any
}

/**
 * Select default ui component
 *
 * @export
 * @class SelectDerfault
 * @extends {React.Component<Iprops>}
 */
export default class SelectDefault extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs prefer-function-over-method
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
  SelectDefault as Select
}