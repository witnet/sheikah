import * as React from "react"

import { TopBarLink } from "./topBarLink"
import { join } from "app/renderer/utils/list"
import {
  PathNameProp,
  TopBarLinkProps,
  TopBarProps,
} from "app/renderer/ui/components/commonTypes"

const styles = require("./style.scss")

const linksRender = (linksProps: Array<TopBarLinkProps>, pathName: string) => {
  return linksProps.map((props) => {
    return <TopBarLink key={props.key} {...props} pathName={pathName} />
  })
}

/**
 * topBar UI component
 *
 * @export
 * @class TopBar
 * @extends {React.Component<TopBarProps>}
 */
export default class TopBar extends React.Component<TopBarProps & PathNameProp> {
  public render() {
    return (
      <div className={join([styles["top-bar"], this.props.className])}>
        {linksRender(this.props.linksProps, this.props.pathName)}
      </div>
    )
  }
}
