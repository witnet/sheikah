import { Dropdown, Menu } from "antd"
import * as React from "react"
import { ClickParam } from "antd/lib/menu"

export interface Iprops {
  className?: string
  classNameList?: string
  classNameItem?: string
  dataSource: Array<{ text: any; onClick: any }>
  borderer?: boolean
  renderItem?: any
  menu?: JSX.Element
  menuStyle?: string
  menuItemStyle?: string
  trigger: Array<("click" | "hover")>
  placement: "topLeft" | "topCenter" | "topRight" | "bottomLeft" | "bottomCenter" | "bottomRight"
}

/**
 * Dropdown UI component
 *
 * @export
 * @class Dropdown
 * @extends {React.Component<Iprops>}
 */

export default class DefaultDropdown extends React.Component<Iprops> {

  /**
   * Component State
   *  visible is set to true if the dropdown menu is being shown
   */
  public state = {
    visible: false
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

  // tslint:disable-next-line: completed-docs
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