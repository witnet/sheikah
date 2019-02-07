import * as React from "react"
import { SettingsOptions } from "app/renderer/ui/components/sidebar"
import { Dropdown } from "app/renderer/ui/components/dropdown"

const styles = require("./style.scss")

interface Iprops {
  title: string,
  menuIcon?: string,
  settingsOptions: SettingsOptions,
  menuText: string,
  collapeSidebar?: boolean,
}

/**
 * Sidebar layout UI component
 * At the left: sidebar with a title and a menu
 * At the right: content defined by the children
 *
 * @export
 * @class SidebarLayout
 * @extends {React.Component<Iprops>}
 */
export default class SidebarLayout extends React.Component<Iprops> {
  public render() {
    const gridStyles = `${styles.grid} ${this.props.collapeSidebar ? styles.collapse : ""}`

    return (
      <div className={gridStyles}>
        {/* TODO: Check potential refactor of existing sidebar component */}
        <div className={styles.sidebar}>
          <p className={styles.titleText}>{this.props.title}</p>
          <Dropdown
            className={styles.settings}
            trigger={["hover"]}
            placement="topCenter"
            dataSource={this.props.settingsOptions}
          >
            <div className={styles.settings} >
              <i className={`${this.props.menuIcon} ${styles.icon}`} />
              <span className={styles.label}>{this.props.menuText}</span>
            </div>
          </Dropdown>
        </div>
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
