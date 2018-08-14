import * as React from "react"
import { Switch } from "react-router"

import { SectionInfo } from "app/renderer/ui/components/main/sections"
import { TabCoins, TabReceive, TabSend, TabTransactions } from "./tabs"
import TopBar from "app/renderer/ui/components/topBar/index"
import { TopBarLinkProps } from "app/renderer/ui/components/commonTypes"
import { PropsRoute } from "app/renderer/utils/propsRoute"

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
            <PropsRoute
              path="/main/wallet/transactions"
              ownProps={this.props}
              component={TabTransactions.component}
            />
            <PropsRoute
              path="/main/wallet/coins"
              ownProps={this.props}
              component={TabCoins.component}
            />
            <PropsRoute
              path="/main/wallet/send"
              ownProps={this.props}
              component={TabSend.component}
            />
            <PropsRoute
              path="/main/wallet/receive"
              ownProps={this.props}
              component={TabReceive.component}
            />
            <PropsRoute
              path="/"
              ownProps={this.props}
              component={TabTransactions.component}
            />
          </Switch>
        </div>
      </>
    )
  }
}

const WalletSection: SectionInfo = {
  key: "wallet",
  caption: "Wallet",
  icon: "book",
  component: Wallet
}

export default WalletSection