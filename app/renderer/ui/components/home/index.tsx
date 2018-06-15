import * as React from "react"

import Siderbar from "../sidebar/index";

import Attestations from "./views/Attestations/index";
import BlockExplorer from "./views/BlockExplorer/index";
import Community from "./views/Community/index";
import SmartContracts from "./views/SmartContracts/index";
import Wallet from "./views/Wallet/index";


const styles = require("./style.scss")

export interface Iprops {
  location: any
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

    const components: Icomponents = {
      Attestations,
      BlockExplorer,
      Community,
      SmartContracts,
      Wallet
    }

    const paths: Ipaths = {
      Wallet: '/home/wallet',
      SmartContracts: "/home/smart-contracts",
      Attestations: "/home/attestations",
      BlockExplorer: "/home/block-explorer",
      Community: "/home/community"
    }

    const path = this.props.location.pathname
    const componentName: string = Object.keys(paths).reduce((acc, key) => path === paths[key] ? key : acc, "Wallet")
    const Content = components[componentName]
    return (
      <div className={styles.layout}>
      <Siderbar className={styles.sidebar}/>
        <div className={styles.main}>
          <div className={styles["top-bar"]}>Top Bar</div>
          <Content />
        </div>
      </div>
    )
  }
}