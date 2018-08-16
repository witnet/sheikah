import * as React from "react"

import { SideBarLink, SideBarLinkProps } from "./sidebarLink"
import { PathNameProp } from "app/renderer/ui/components/commonTypes"
import Icon from "app/renderer/ui/components/icons"
import { DotIndicator } from "app/renderer/ui/components/dotIndicator"
const styles = require("./style.scss")

export interface SidebarProps {
  className?: string
  linksProps: Array<SideBarLinkProps>
}

/**
 * Sidebar UI component
 *
 * @export
 * @class Sidebar
 * @extends {React.Component<SidebarProps>}
 */

export default class Sidebar extends React.Component<SidebarProps & PathNameProp> {

  // tslint:disable-next-line: completed-docs
  public render() {
    return (
      <div className={`${this.props.className} ${styles.sidebar}`}>
        <div className={styles.brand}>
          {/* TODO: load svg from their own file #378 */}
          <Icon className={styles.logo} type="sheikah" />
          <span className={styles.name}>Sheikah</span>
          <span className={styles.label}>[TECHNOLOGY PREVIEW]</span>
        </div>
        <div className={styles["current-wallet"]}>
          My hot wallet
        </div>
        <div className={styles["link-list"]}>
          {linksRender(this.props.linksProps, this.props.pathName)}
        </div>
        <div>
          <hr className={styles.hr}/>
          <div className={styles.settings}>
            <i className={`fa fa-cog ${styles["settings-icon"]}`} />
            <div className={styles["net-status"]}>
              <span className={styles.mainnet}>PROTOTYPE</span>
              <span className={styles.synced}>SYNCED</span>
              <DotIndicator mood="warning"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const linksRender = (linksProps: Array<SideBarLinkProps>, pathName: string) => {
  return linksProps.map((props) => {
    return <SideBarLink key={props.key} {...props} pathName={pathName} />
  })
}