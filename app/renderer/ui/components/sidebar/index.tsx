import * as React from "react"
import { SideBarLink, SideBarLinkProps } from "./sidebarLink"
import { PathNameProp } from "app/renderer/ui/components/commonTypes"

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
          <i className={`fa fa-bullseye ${styles.logo}`} />
          <span className={styles.name}>Sheikah</span>
          <span className={styles.label}>[TECHNOLOGY PREVIEW]</span>
        </div>
        <div className={styles["current-wallet"]}>
          My hot wallet
        </div>
        <div className={styles["link-list"]}>
          {linksRender(this.props.linksProps, this.props.pathName)}
        </div>
        <div className={styles.settings}>
          <i className={`fa fa-cog ${styles["settings-icon"]}`} />
          <div className={styles["net-status"]}>
            <span className={styles.mainnet}>MAINNET</span>
            <span className={styles.synced}>SYNCED</span>
            <i className={`fa fa-circle ${styles.status}`} />
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