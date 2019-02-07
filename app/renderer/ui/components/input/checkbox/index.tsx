import * as React from "react"

import { Checkbox } from "antd"
import { CheckboxChangeEvent } from "antd/lib/checkbox"

export interface Iprops {
  className?: string,
  onChange?: (e: CheckboxChangeEvent) => void,
  name?: string,

}

/**
 * Checkbox UI component
 *
 * @export
 * @class InputCheck
 * @extends {React.Component<Iprops>}
 */
export default class InputCheck extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs
  public render() {
    return (
      <Checkbox
        className={this.props.className}
        onChange={this.props.onChange}
        name={this.props.name}
      />
    )
  }
}
