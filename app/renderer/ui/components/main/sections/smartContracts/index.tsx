import * as React from "react"

import { TabMyContracts, TabEasyComposer, TabProEditor } from "./tabs"
import TopBar from "app/renderer/ui/components/topBar/index"
import { TopBarLinkProps } from "app/renderer/ui/components/commonTypes"
import { SectionInfo, TabInfo, SectionProps } from "app/renderer/ui/components/main/sections"

import * as urls from "app/renderer/constants/urls"

const mainStyles = require("app/renderer/ui/components/main/style.scss")
const styles = require("./style.scss")

/**
 * SmartContracts component
 *
 * @class SmartContracts
 * @extends {React.Component<SmartContractsProps>}
 */
class SmartContracts extends React.Component<SectionProps> {

  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {
    const tabs: Array<TabInfo> = [TabMyContracts, TabEasyComposer, TabProEditor]
    const topBarlinkProps: Array<TopBarLinkProps> = tabs.map(tab => (
      {
        key: tab.key,
        caption: tab.caption,
        path: `${tab.path}`
      }
    ))

    return (
      <>
        <TopBar
          className={mainStyles["top-bar"]}
          pathName={this.props.pathName}
          linksProps={topBarlinkProps}
        />
        <div className={styles.layout}>
          {this.props.children}
        </div>
      </>
    )
  }
}

const SmartContractsSection: SectionInfo = {
  key: "smartcontracts",
  caption: "Smart Contracts",
  path: urls.SMART_CONTRACTS_SECTION,
  component: SmartContracts,
  icon: "code"
}

export default SmartContractsSection