import * as React from "react"
import { Select } from "antd"
const Option = Select.Option

const styles = require("./style.scss")

export interface SelectOptionData {
  fee: string | number,
  text: string,
  unit: string,
  value: string,
}

export interface SelectFeesProps {
  className?: string,
  dataSource: Array<SelectOptionData>,
  defaultValue?: string,
  onChange?: any,
  value: string,
}

/**
 * Select fees ui component
 *
 * @export
 * @class SelectFees
 * @extends {React.Component<SelectFeesProps>}
 */
export default class SelectFees extends React.Component<SelectFeesProps> {
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
  SelectFees,
}
