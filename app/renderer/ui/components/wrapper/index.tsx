import * as React from "react"

const styles = require("./style.scss")

export interface Iprops {
  title?: string
  caption?: string
  actions?: any[]
}

/**
 * Wrapper UI component
 *
 * @export
 * @class Wrapper
 * @extends {React.Component<Iprops>}
 */

export default class Wrapper extends React.Component<Iprops> {

  // tslint:disable-next-line: completed-docs
  public render() {
    const actions = this.props.actions
      ? <div className={styles.actions}>Actions</div>
      : ""

    return (
      <div className={styles.layout}>
        <div className={styles.header}>
          <p className={styles.title}>{this.props.title}</p>
          <p className={styles.caption}>{this.props.caption}</p>
          {actions}
        </div>
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    )
  }
}