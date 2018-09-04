import * as React from "react"
import { Popover } from "antd"

export interface Iprops {
  className?: string
  placement?: "top" | "left" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" |
    "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom"
  title?: string
  content: any
  trigger?: "hover" | "focus" | "click" | "contextMenu"
}

/**
 * Default input UI component
 *
 * @export
 * @class DefaultInput
 * @extends {React.Component<Iprops>}
 */

export default class PopoverDefault extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs
  public render() {
    return (
      <Popover
        placement={this.props.placement}
        title={this.props.title}
        content={this.props.content}
        trigger={this.props.trigger}
      >
        {this.props.children}
      </Popover>
    )
  }
}
