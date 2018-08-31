import * as React from "react"

import { SectionInfo, TabInfo } from "app/renderer/ui/components/main/sections"
import { TabCoins, TabReceive, TabSend, TabTransactions } from "./tabs"
import TopBar from "app/renderer/ui/components/topBar/index"
import { TopBarLinkProps } from "app/renderer/ui/components/commonTypes"

import * as urls from "app/renderer/constants/urls"
import { Switch } from "react-router"
import { PropsRoute } from "app/renderer/utils/propsRoute"

const styles = require("./style.scss")
const mainStyles = require("app/renderer/ui/components/main/style.scss")

/**
 * Wallet component
 *
 * @class Wallet
 * @extends {React.Component<WalletProps>}
 */
class Wallet extends React.Component<any> {
  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {
    const tabs: Array<TabInfo> = [TabTransactions, TabReceive, TabSend, TabCoins]
    const topBarlinkProps: Array<TopBarLinkProps> = tabs.map(tab => (
      {
        caption: tab.caption,
        key: tab.key,
        path: `${tab.path}`
      }
    ))

    return (
      <>
        <TopBar className={mainStyles["top-bar"]} pathName="" linksProps={topBarlinkProps} />
        <div className={styles.layout}>
          <Switch>
            <PropsRoute
              path={urls.TRANSACTIONS_TAB}
              ownProps={this.props}
              component={TabTransactions.component}
            />
            <PropsRoute
              path={urls.COINS_TAB}
              ownProps={this.props}
              component={TabCoins.component}
            />
            <PropsRoute
              path={urls.SEND_TAB}
              ownProps={this.props}
              component={TabSend.component}
            />
            <PropsRoute
              path={urls.RECEIVE_TAB}
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
  path: urls.WALLET_SECTION,
  icon: "book",
  component: Wallet
}

export default WalletSection