import * as React from "react"
import { Select } from "antd"
const Option = Select.Option

const styles = require("./style.scss")

export type SelectOptionData = {
  fee: string | number
  text: string
  unit: string
  value: string
}

export interface Iprops {
  className?: string
  defaultValue?: string
  onChange?: any
  dataSource: Array<SelectOptionData>
  value: string
}

/**
 * Select fees ui component
 *
 * @export
 * @class SelectFees
 * @extends {React.Component<Iprops>}
 */
export default class SelectFees extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs prefer-function-over-method
  public render() {
    const selectOptions = this.props.dataSource.map(item => {
      return (
        <Option key={item.fee} value={item.value}>
          <p className={styles.option}>
            <span className={styles["fee-text"]}>{item.text}</span>
            <span className={styles["fee-number"]}>{`${item.fee}${item.unit}`}</span>
          </p>
        </Option>
      )
    })

    return (
      <Select
        className={this.props.className}
        defaultValue={this.props.defaultValue}
        onChange={this.props.onChange}
        value={this.props.value}
      >
        {selectOptions}
      </Select>
    )
  }
}

export {
  SelectFees
}
