import * as React from "react"

import { DropdownBordered } from "app/renderer/ui/components/dropdown"

const styles = require("./style.scss")
const receiveStyles =
  require("app/renderer/ui/components/main/sections/wallet/tabs/receive/style.scss")

export interface WrapperProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions?: Array<{ text: any, onClick: any }>,
  caption?: string,
  className?: string,
  contentClassName?: string,
  empty?: boolean,
  title?: string,
}

/**
 * Wrapper UI component
 *
 * @export
 * @class Wrapper
 * @extends {React.Component<WrapperProps>}
 */
export default class Wrapper extends React.Component<WrapperProps> {
  public render() {
    const contentStyles = `${!this.props.empty ? styles.content : styles.empty}
    ${this.props.contentClassName}`
    const actions = this.props.actions && !this.props.empty && (
      <DropdownBordered
        className={`${styles.actions} ${receiveStyles.actions}`}
        dataSource={this.props.actions}
      />
    )

    return (
      <div className={`${this.props.className}`}>
        <div className={`${styles.header}`}>
          <p className={`${styles.title}`}>{this.props.title}</p>
          {!this.props.empty && (<p className={styles.caption}>{this.props.caption}</p>)}
          {actions}
        </div>
        <div className={contentStyles}>{this.props.children}</div>
      </div>
    )
  }
}
