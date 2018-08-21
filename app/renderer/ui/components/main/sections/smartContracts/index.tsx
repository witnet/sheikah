import * as React from "react"

import { TabMyContracts, TabEasyComposer, TabProEditor, TabMarketplace } from "./tabs"
import TopBar from "app/renderer/ui/components/topBar/index"
import { TopBarLinkProps } from "app/renderer/ui/components/commonTypes"
import { SectionInfo, TabInfo } from "app/renderer/ui/components/main/sections"

import * as urls from "app/renderer/constants/urls"

const mainStyles = require("app/renderer/ui/components/main/style.scss")
const styles = require("./style.scss")

/**
 * @interface SmartContractsProps
 */
interface SmartContractsProps { }

/**
 * SmartContracts component
 *
 * @class SmartContracts
 * @extends {React.Component<SmartContractsProps>}
 */
class SmartContracts extends React.Component<SmartContractsProps> {

  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {
    const tabs: Array<TabInfo> = [TabMyContracts, TabEasyComposer, TabProEditor, TabMarketplace]
    const topBarlinkProps: Array<TopBarLinkProps> = tabs.map(tab => (
      {
        key: tab.key,
        caption: tab.caption,
        path: `${tab.path}`
      }
    ))

    return (
      <>
        <TopBar className={mainStyles["top-bar"]} pathName="" linksProps={topBarlinkProps} />
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