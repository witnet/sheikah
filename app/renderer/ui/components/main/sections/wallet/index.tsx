import * as React from "react"
import {Route, Switch} from "react-router"
import { RouteComponentProps } from "react-router"

import { SectionInfo } from "../index"
import { TabCoins, TabReceive, TabSend, TabTransactions } from "./tabs"
import TopBar from '../../../topBar/index';
import { TopBarLinkProps } from '../../../topBar/topBarLink';

const styles = require("./style.scss")
const mainStyles = require('../../style.scss')
interface WalletProps { }

class Wallet extends React.Component<WalletProps & RouteComponentProps<any>> {

  // tslint:disable-next-line: completed-docs
  public render() {
    const tabs = [TabTransactions, TabReceive, TabSend, TabCoins ]
    const topBarlinkProps: TopBarLinkProps[] = tabs.map(tab => (
      {
        caption: tab.caption,
        key: tab.key,
        link: `/main/wallet/${tab.key}`
      }
    ))

    return (
      <>
        <TopBar className={mainStyles["top-bar"]} pathName="" linksProps={topBarlinkProps} />
        <div className={styles.layout}>
          <Switch>
            <Route path="/main/wallet/transactions" component={TabTransactions.component} />
            <Route path="/main/wallet/coins" component={TabCoins.component} />
            <Route path="/main/wallet/send" component={TabSend.component} />
            <Route path="/main/wallet/receive" component={TabReceive.component} />
            <Route path="/main" component={TabTransactions.component} />
          </Switch>
        </div>
      </>
    )
  }
}

const WalletSection: SectionInfo = {
  key: "wallet",
  caption: "Wallet",
  icon: "cog",
  component: Wallet
}

export default WalletSection