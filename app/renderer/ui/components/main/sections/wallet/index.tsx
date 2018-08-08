import * as React from "react"
import { Route, Switch } from "react-router"

import { SectionInfo } from "app/renderer/ui/components/main/sections"
import { TabCoins, TabReceive, TabSend, TabTransactions } from "./tabs"
import TopBar from "app/renderer/ui/components/topBar/index"
import { TopBarLinkProps } from "app/renderer/ui/components/commonTypes"

const styles = require("./style.scss")
const mainStyles = require("app/renderer/ui/components/main/style.scss")

interface WalletProps { }

/**
 * Wallet component
 *
 * @class Wallet
 * @extends {React.Component<WalletProps>}
 */
class Wallet extends React.Component<WalletProps> {

  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {
    const tabs = [TabTransactions, TabReceive, TabSend, TabCoins]
    const topBarlinkProps: Array<TopBarLinkProps> = tabs.map(tab => (
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
            <Route path="/" component={TabTransactions.component} />
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