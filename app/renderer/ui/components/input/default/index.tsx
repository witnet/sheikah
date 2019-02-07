import * as React from "react"

import { Input } from "antd"

export interface DefaultInputProps {
  className?: string,
  disabled?: boolean,
  min?: any,
  name?: string,
  onBlur?: React.ChangeEventHandler,
  onChange?: React.ChangeEventHandler,
  onKeyUp?: React.KeyboardEventHandler,
  type?: string,
  value?: any,
}

/**
 * Default input UI component
 *
 * @export
 * @class DefaultInput
 * @extends {React.Component<DefaultInputProps>}
 */

export default class DefaultInput extends React.Component<DefaultInputProps> {
  public render() {
    return (
      <Input
        className={this.props.className}
        type={this.props.type}
        name={this.props.name}
        min={this.props.min}
        value={this.props.value}
        disabled={this.props.disabled}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        onKeyUp={this.props.onKeyUp}
      />
    )
  }
}
