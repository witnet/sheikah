import * as React from "react"
import { RouteComponentProps } from "react-router"

import Sidebar from "../sidebar"
import SmartContractsSection from "./sections/smartContracts"
import AttestationsSection from "./sections/attestations"
import BlockExplorerSection from "./sections/blockExplorer"
import CommunitySection from "./sections/community"
import WalletSection from "./sections/wallet"

import { SectionInfo } from "./sections"

const styles = require("./style.scss")

const sections: Array<SectionInfo> = [
  WalletSection, SmartContractsSection, AttestationsSection, BlockExplorerSection, CommunitySection
]

const router: {[route: string]: SectionInfo} =
  sections.reduce((acc, section) => ({...acc, [section.key]: section}), {})

const sidebarProps = {
  className: styles.sidebar,
  linksProps: sections.map((section) => ({
    ...section,
    link: `/main/${section.key}`
  }))
}

const sectionRender = (pathName: string, props: {}) => {
  const sectionKey = pathName.split("/")[2] || sections[0].key
  const Component = router[sectionKey].component
  return <Component {...props} />
}

export default class Main extends React.Component<RouteComponentProps<any>> {

  /** render */
  public render() {
    return (
      <div className={styles.layout}>
        <Sidebar {...sidebarProps} pathName={this.props.location.pathname} />
        <div className={styles.main}>
          {sectionRender(this.props.location.pathname, this.props)}
        </div>
      </div>
    )
  }
}