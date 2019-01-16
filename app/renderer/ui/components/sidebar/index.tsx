import * as React from "react"

import { SideBarLink, SideBarLinkProps } from "./sidebarLink"
import { PathNameProp } from "app/renderer/ui/components/commonTypes"
import { DotIndicator } from "app/renderer/ui/components/dotIndicator"
import { Dropdown } from "app/renderer/ui/components/dropdown"

const styles = require("./style.scss")

export type SettingsOptions = Array<{ text: string, onClick: (e: MouseEvent) => void}>

export interface SidebarProps {
  className?: string,
  linksProps: Array<SideBarLinkProps>,
  setingsOptions: SettingsOptions,
  walletName: string,
}

const linksRender = (linksProps: Array<SideBarLinkProps>, pathName: string) => {
  return linksProps.map((props) => {
    return <SideBarLink key={props.key} {...props} pathName={pathName} />
  })
}

/**
 * Sidebar UI component
 *
 * @export
 * @class Sidebar
 * @extends {React.Component<SidebarProps>}
 */
export default class Sidebar extends React.Component<SidebarProps & PathNameProp> {
  public render() {
    const src = require("svg/sheikah.svg")

    return (
      <div className={`${this.props.className} ${styles.sidebar}`}>
        <div className={styles.brand}>
          {/* TODO: load svg from their own file #378 */}
          <img src={src} />
        </div>
        <div className={styles["current-wallet"]}>
         <span className={styles["current-wallet-name"]}>{this.props.walletName}</span>
        </div>
        <div className={styles["link-list"]}>
          {linksRender(this.props.linksProps, this.props.pathName)}
        </div>
        <div className={styles.settings}>
          <Dropdown
            trigger={["hover"]}
            placement="topCenter"
            dataSource={this.props.setingsOptions}
          >
            <i className={`fa fa-cog ${styles["settings-icon"]}`} />
          </Dropdown>
          <div className={styles["net-status"]}>
            <span className={styles.mainnet}>PROTOTYPE</span>
            <span className={styles.synced}>SYNCED</span>
            <DotIndicator mood="warning"/>
          </div>
        </div>
      </div>
    )
  }
}
