import * as React from "react"
import { Switch } from "antd"

export interface Iprops {
  className?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  size?: "small" | "default"
}

/**
 * Switch UI Component
 *
 * @export
 * @class SwitchSelector
 * @extends {React.Component<Iprops>}
 */
export default class SwitchSelector extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs
  public render() {
    return (
      <Switch
        className={this.props.className}
        checked={this.props.checked}
        onChange={this.props.onChange}
        size={this.props.size}
      />
    )
  }
}
