import * as React from "react"
import {TopBarLink} from "../../topBar/topBarLink"
import {PathNameProp} from "../../commonTypes"
import {TopBarProps} from "../../topBar"

export interface SectionProps {
  className?: string,
}

export class SectionComponent<Props> extends React.Component<SectionProps & PathNameProp & Props> {

  public topBarProps: TopBarProps

  public topBarRender() {
    console.log(this)
    return (this.topBarProps ? this.topBarProps.linksProps : []).map((props) => {
      return <TopBarLink key={props.key} {...props} pathName={this.props.pathName} />
    })
  }

}

export interface SectionInfo {
  key: string
  caption: string
  icon?: string
  component: React.ComponentClass
}

export interface TabProps {
  className?: string
}

export class TabComponent<Props> extends React.Component<TabProps & PathNameProp & Props> {}

export interface TabInfo {
  key: string
  caption: string
  component: React.ComponentClass
}