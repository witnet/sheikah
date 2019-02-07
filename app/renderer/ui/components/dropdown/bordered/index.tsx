import { Dropdown, Menu } from "antd"
import { ButtonDefault } from "app/renderer/ui/components/button"
import * as React from "react"
import { ClickParam } from "antd/lib/menu"

const styles = require("./style.scss")

export interface DropdownBorderedProps {
  borderer?: boolean,
  className?: string,
  classNameItem?: string,
  classNameList?: string,
  dataSource: Array<({ text: any, onClick: any })>,
  renderItem?: any,
}

/**
 * Dropdown UI component
 *
 * @export
 * @class Dropdown
 * @extends {React.Component<DropdownBorderedProps>}
 */

export default class DropdownBordered extends React.Component<DropdownBorderedProps> {
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
        <Menu.Item key={index} className={styles.menuItem}>
          {data.text}
        </Menu.Item>
      ))
    )

    /**
     * Menu of the dropdown
     * The list item key is the position in the data source array
     */
    const menu = (
      <Menu onClick={this.handleClick} className={styles.menu}>
        {menuItems}
      </Menu>
    )

    /**
     * Dropdown trigger mode
     */
    const triggerMode: Array<"click" | "hover"> = [
      "click",
    ]

    return (
      <Dropdown
        className={`${styles.dropdown} ${this.state.visible && styles.active}`}
        trigger={triggerMode}
        overlay={menu}
        placement="bottomRight"
        onVisibleChange={this.onVisibleChange}
      >
        <ButtonDefault className={`${this.props.className} ${styles.button}`}>
          <span>···</span> <i className="fa fa-angle-down" />
        </ButtonDefault>
      </Dropdown>
    )
  }
}

export { DropdownBordered }
