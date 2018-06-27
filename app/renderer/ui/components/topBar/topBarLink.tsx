import * as React from "react"
import {Link} from "react-router-dom"
import {join} from "../../../utils/list"
import {PathNameProp} from "../commonTypes"

const styles = require("./style.scss")

export type TopBarLinkProps = {
  key: string
  caption: string
  link: string
}

export class TopBarLink extends React.Component<TopBarLinkProps & PathNameProp> {

  private get active() {
    return this.props.pathName.indexOf(this.props.link) === 0 && styles.active
  }

  render () {
    return (
      <Link className={join([styles["link-box"], this.active])} to={this.props.link}>
        {this.props.caption}
      </Link>
    )
  }
}