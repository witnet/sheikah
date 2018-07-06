import * as React from "react"
import { PathNameProp } from "../commonTypes"
import { TopBarLink, TopBarLinkProps } from "./topBarLink"
import { join } from "../../../utils/list"

const styles = require("./style.scss")

export interface TopBarProps {
  className?: string
  linksProps: Array<TopBarLinkProps>
}

/**
 * topBar UI component
 *
 * @export
 * @class TopBar
 * @extends {React.Component<TopBarProps>}
 */

export default class TopBar extends React.Component<TopBarProps & PathNameProp> {
  // tslint:disable-next-line: completed-docs
  public render() {
    return (
      <div className={join([styles["top-bar"], this.props.className])}>
        {linksRender(this.props.linksProps, this.props.pathName)}
      </div>
    )
  }
}

const linksRender = (linksProps: Array<TopBarLinkProps>, pathName: string) => {
  return linksProps.map((props) => {
    return <TopBarLink key={props.key} {...props} pathName={pathName} />
  })
}