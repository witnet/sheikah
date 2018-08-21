import * as React from "react"
import { Route, Switch } from "react-router"

import { TabMyContracts, TabEasyComposer, TabProEditor, TabMarketplace } from "./tabs"
import TopBar from "app/renderer/ui/components/topBar/index"
import { TopBarLinkProps } from "app/renderer/ui/components/commonTypes"
import { SectionInfo } from "app/renderer/ui/components/main/sections"

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
    const tabs = [TabMyContracts, TabEasyComposer, TabProEditor, TabMarketplace]
    const topBarlinkProps: Array<TopBarLinkProps> = tabs.map(tab => (
      {
        key: tab.key,
        caption: tab.caption,
        link: `${tab.link}`
      }
    ))

    return (
      <>
        <TopBar className={mainStyles["top-bar"]} pathName="" linksProps={topBarlinkProps} />
        <Switch>
          <div className={styles.layout}>
            <Route path={urls.MY_CONTRACTS_TAB} component={TabMyContracts.component} />
            <Route path={urls.EASY_COMPOSER_TAB} component={TabEasyComposer.component} />
            <Route path={urls.PROEDITOR_TAB} component={TabProEditor.component} />
            <Route path={urls.MARKETPLACE_TAB} component={TabMarketplace.component} />
            <Route path="/" component={TabMyContracts.component} />
          </div>
        </Switch>
      </>
    )
  }
}

const SmartContractsSection: SectionInfo = {
  key: "smartcontracts",
  caption: "Smart Contracts",
  link: urls.SMART_CONTRACTS_SECTION,
  component: SmartContracts,
  icon: "code"
}

export default SmartContractsSection