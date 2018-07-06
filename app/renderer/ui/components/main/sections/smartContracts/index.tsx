import * as React from "react"
import {Route, Switch} from "react-router"
import { RouteComponentProps } from "react-router"

import { TabMyContracts, TabEasyComposer, TabProEditor, TabMarketplace } from "./tabs"
import TopBar from '../../../topBar/index';
import { TopBarLinkProps } from '../../../topBar/topBarLink';
import { SectionInfo } from "../index"


const mainStyles = require('../../style.scss')
const styles = require('./style.scss')

interface SmartContractsProps { }

class SmartContracts extends React.Component<SmartContractsProps & RouteComponentProps<any>> {

  // tslint:disable-next-line: completed-docs
  public render() {
    const tabs = [TabMyContracts, TabEasyComposer, TabProEditor, TabMarketplace]
    const topBarlinkProps: TopBarLinkProps[] = tabs.map(tab => (
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
  icon: "file"
}

export default SmartContractsSection