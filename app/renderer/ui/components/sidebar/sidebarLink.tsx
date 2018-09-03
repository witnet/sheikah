import * as React from "react"
import { Link } from "react-router-dom"

import { SectionInfo } from "app/renderer/ui/components/main/sections"
import { join } from "app/renderer/utils/list"
import { PathNameProp } from "app/renderer/ui/components/commonTypes"

const styles = require("./style.scss")

/**
 * SidebarLink's props
 *
 * @export
 * @interface SideBarLinkProps
 * @extends {SectionInfo}
 */
export type SideBarLinkProps = SectionInfo

/**
 * SideBarLink class used to list links in sidebar component
 *
 * @export
 * @class SideBarLink
 * @extends {(React.Component<SideBarLinkProps & PathNameProp>)}
 */
export class SideBarLink extends React.Component<SideBarLinkProps & PathNameProp> {

  /**
   * Private method whick checks if current path and link match
   *
   * @readonly
   * @private
   * @memberof SideBarLink
   */
  private get active() {
    return this.props.pathName.indexOf(this.props.sectionPath) === 0 && styles.active
  }

  /**
   * Private method that generates icon from props
   *
   * @readonly
   * @private
   * @memberof SideBarLink
   */
  private get icon() {
    return this.props.icon && `fa-${this.props.icon}`
  }

  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {
    return (
      <Link className={join([styles.link, this.active])} to={this.props.path} replace={true}>
        <i className={join(["fa", this.icon])} />
        <span className={styles["option-icon"]}>{this.props.caption}</span>
      </Link>
    )
  }
}