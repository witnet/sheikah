import * as React from "react"

import { TopBarLink } from "app/renderer/ui/components/topBar/topBarLink"
import { PathNameProp, TopBarProps } from "app/renderer/ui/components/commonTypes"

/**
 * @export
 * @interface SectionProps
 */
export interface SectionProps extends PathNameProp {
  className?: string,
  services?: { showUnimplementedMessage?: Function },
}

/**
 * SectionComponent component
 *
 * @export
 * @class SectionComponent
 * @extends {(React.Component<SectionProps & PathNameProp & Props>)}
 * @template Props
 */
export class SectionComponent<Props> extends React.Component<SectionProps & Props> {
  /**
   * TopBar's props
   *
   * @type {TopBarProps}
   * @memberof SectionComponent
   */
  public topBarProps: TopBarProps | undefined

  /**
   * Method that creates TopBarLink components for each link received
   *
   * @returns
   * @memberof SectionComponent
   */
  public topBarRender() {
    return (this.topBarProps ? this.topBarProps.linksProps : []).map((props) => {
      return <TopBarLink key={props.key} {...props} pathName={this.props.pathName} />
    })
  }
}

/**
 * SectionInfo's interface
 *
 * @export
 * @interface SectionInfo
 */
export interface SectionInfo {
  caption: string,
  component: React.ComponentClass<SectionProps>,
  icon?: string,
  isPrefilledWallet?: boolean,
  key: string,
  path: string,
  sectionPath: string,
}

/**
 * Tab's props
 *
 * @export
 * @interface TabProps
 */
export interface TabProps {
  className?: string,
}

/**
 * TabComponent component
 *
 * @export
 * @class TabComponent
 * @extends {(React.Component<TabProps & PathNameProp & Props>)}
 * @template Props
 */
export class TabComponent<T> extends React.Component<TabProps & T> { }

/**
 * TabInfo's interface
 *
 * @export
 * @interface TabInfo
 */
export interface TabInfo {
  caption: string,
  // TODO: Refactor types in #451
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentClass<any>,
  key: string,
  path: string,
}
