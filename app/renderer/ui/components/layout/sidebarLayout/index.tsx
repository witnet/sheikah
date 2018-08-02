import * as React from "react"

const styles = require("./style.scss")

interface Iprops {
  title: string
  menuIcon?: string
  menuText: string
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
  /** render */
  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {
    return (
      <div className={styles.grid}>
        {/* TODO: Check potential refactor of existing sidebar component */}
        <div className={styles.sidebar}>
          <p className={styles.titleText}>{this.props.title}</p>
          <div className={styles.settings}>
            <i className={`${this.props.menuIcon} ${styles.icon}`} />
            <span className={styles.label}>{this.props.menuText}</span>
          </div>
        </div>
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    )
  }
}