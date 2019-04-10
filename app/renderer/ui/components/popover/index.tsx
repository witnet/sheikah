import * as React from "react"
import { Popover } from "antd"

export interface PopoverDefaultProps {
  className?: string,
  content: React.ReactNode,
  placement?: "top" | "left" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" |
  "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom",
  title?: string,
  trigger?: "hover" | "focus" | "click" | "contextMenu",
}

/**
 * Default input UI component
 *
 * @export
 * @class DefaultInput
 * @extends {React.Component<PopoverDefaultProps>}
 */
export default class PopoverDefault extends React.Component<PopoverDefaultProps> {
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
