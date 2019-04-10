import * as React from "react"
import { Select } from "antd"

const Option = Select.Option

// const styles = require("./style.scss")

export interface SelectDefaultProps {
  className?: string,
  defaultValue?: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataSource: Array<any>,
}

/**
 * Select default ui component
 *
 * @export
 * @class SelectDerfault
 * @extends {React.Component<SelectDefaultProps>}
 */
class SelectDefault extends React.Component<SelectDefaultProps> {
  public render() {
    const selectOptions = this.props.dataSource.map(item => {
      return (
        <Option key={item.key} value={item.value}>
          <span>{item.text}</span>
        </Option>
      )
    })

    return (
      <Select
        className={this.props.className}
        defaultValue={this.props.defaultValue}
        onChange={this.props.onChange}
      >
        {selectOptions}
      </Select>
    )
  }
}

export {
  Option,
  SelectDefault as Select,
}
