import * as React from "react"
import { Route, Switch } from "react-router"

import { TabMyContracts, TabEasyComposer, TabProEditor, TabMarketplace } from "./tabs"
import TopBar from "app/renderer/ui/components/topBar/index"
import { TopBarLinkProps } from "app/renderer/ui/components/commonTypes"
import { SectionInfo } from "app/renderer/ui/components/main/sections"

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
        link: `/main/smartcontracts/${tab.key}`
      }
    ))

    return (
      <>
        <TopBar className={mainStyles["top-bar"]} pathName="" linksProps={topBarlinkProps} />
        <Switch>
          <div className={styles.layout}>
            <Route path="/main/smartcontracts/mycontracts" component={TabEasyComposer.component} />
            <Route path="/main/smartcontracts/easycomposer" component={TabMyContracts.component} />
            <Route path="/main/smartcontracts/proeditor" component={TabProEditor.component} />
            <Route path="/main/smartcontracts/marketplace" component={TabMarketplace.component} />
            <Route path="/main" component={TabMyContracts.component} />
          </div>
        </Switch>
      </>
    )
  }
}

const SmartContractsSection: SectionInfo = {
  key: "smartcontracts",
  caption: "Smart Contracts",
  component: SmartContracts,
  icon: "code"
}

export default SmartContractsSection