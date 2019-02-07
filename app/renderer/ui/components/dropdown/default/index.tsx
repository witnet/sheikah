import { Dropdown, Menu } from "antd"
import * as React from "react"
import { ClickParam } from "antd/lib/menu"

export interface DefaultDropdownProps {
  borderer?: boolean,
  className?: string,
  classNameItem?: string,
  classNameList?: string,
  dataSource: Array<{ text: any, onClick: any }>,
  menu?: JSX.Element,
  menuItemStyle?: string,
  menuStyle?: string,
  placement: "topLeft" | "topCenter" | "topRight" | "bottomLeft" | "bottomCenter" | "bottomRight",
  renderItem?: any,
  trigger: Array<("click" | "hover")>,
}

/**
 * Dropdown UI component
 *
 * @export
 * @class Dropdown
 * @extends {React.Component<DefaultDropdownProps>}
 */

export default class DefaultDropdown extends React.Component<DefaultDropdownProps> {
  /**
   * Component State
   *  visible is set to true if the dropdown menu is being shown
   */
  public state = {
    visible: false,
  }

  /**
   * List item handle click method
   * @param e click params
   */
  private handleClick = (e: ClickParam) => {
    this.props.dataSource[Number(e.key)].onClick()
    this.setState({ visible: false })
  }

  /**
   * Sets the state `visible` when the dropdown is shown
   */
  private onVisibleChange = (visible: boolean | undefined) => {
    this.setState({ visible })
  }

  public render() {
    /**
     * Menu items of the dropdown
     */
    const menuItems = (
      this.props.dataSource.map((data: { text: any, onClick: any }, index: number) => (
        <Menu.Item key={index} className={this.props.menuItemStyle}>
          {data.text}
        </Menu.Item>
      ))
    )

    /**
     * Menu of the dropdown
     * The list item key is the position in the data source array
     */
    const menu = (
      <Menu onClick={this.handleClick} className={this.props.menuStyle}>
        {menuItems}
      </Menu>
    )

    return (
      <Dropdown
        className={this.props.className}
        trigger={this.props.trigger}
        overlay={this.props.menu || menu}
        placement={this.props.placement}
        onVisibleChange={this.onVisibleChange}
      >
        {this.props.children}
      </Dropdown>
    )
  }
}

export { DefaultDropdown as Dropdown }
