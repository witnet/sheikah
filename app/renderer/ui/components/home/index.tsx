import * as React from "react"

import Siderbar from "../sidebar/index";

import Attestations from "./views/Attestations/index";
import BlockExplorer from "./views/BlockExplorer/index";
import Community from "./views/Community/index";
import SmartContracts from "./views/SmartContracts/index";
import Wallet from "./views/Wallet/index";
import TopBar from "../topBar/index";

const styles = require("./style.scss")

export interface Iprops {
  location?: any
}

export default class Home extends React.Component<Iprops> {

  /** render */
  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    interface Icomponents {
      [key: string]: any;
    }

    interface Ipaths {
      [key: string]: string
    }

    type topBarDataType = { [key: string] : { text: string, link: string}[] }

    const components: Icomponents = {
      Attestations,
      BlockExplorer,
      Community,
      SmartContracts,
      Wallet
    }

    const paths: Ipaths = {
      Wallet: '/home/wallet',
      WalletTransactions: "/home/wallet/transactions",
      WalletReceive: "/home/wallet/receive",
      WalletSend: "/home/wallet/send",
      WalletCoins: "/home/wallet/coins",

      SmartContracts: "/home/smart-contracts",
      Attestations: "/home/attestations",
      BlockExplorer: "/home/block-explorer",
      Community: "/home/community"
    }

    const topBarData: topBarDataType = {
      Wallet: [
        { text: "Transactions", link: "/home/wallet/transactions" },
        { text: "Receive", link: "/home/wallet/receive" },
        { text: "Send", link: "/home/wallet/send" },
        { text: "Coins", link: "/home/wallet/coins" },
      ]
    }

    const path = this.props.location.pathname

    const componentName: string = Object.keys(paths)
      .reduce((acc, key) => path === paths[key] ? key : acc, "Wallet")

    const topBarContent = topBarData[componentName] || topBarData["Wallet"]

    const ContentComponent = components[componentName]
    console.log(path)
    console.log(componentName)
    return (
      <div className={styles.layout}>
      <Siderbar className={styles.sidebar}/>
        <div className={styles.main}>
          <TopBar className={styles["top-bar"]} links={topBarContent} />
          <ContentComponent />
        </div>
      </div>
    )
  }
}