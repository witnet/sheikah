import * as React from "react"
import {Link} from "react-router-dom"
import {SectionInfo} from "../main/sections/index"
import {join} from "../../../utils/list"
import {PathNameProp} from "../commonTypes"

const styles = require("./style.scss")

export interface SideBarLinkProps extends SectionInfo {
  link: string
}

export class SideBarLink extends React.Component<SideBarLinkProps & PathNameProp> {

  private get active() {
    return this.props.pathName.indexOf(this.props.link) === 0 && styles.active
  }

  private get icon() {
    return this.props.icon && `fa-${this.props.icon}`
  }

  render () {
    return (
      <Link className={join([styles.link, this.active])} to={this.props.link}>
        <i className={join(["fa", this.icon])} />
        <span className={styles["option-icon"]}>{this.props.caption}</span>
      </Link>
    )
  }
}