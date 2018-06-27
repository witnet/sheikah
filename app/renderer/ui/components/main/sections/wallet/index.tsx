import * as React from "react"
import {SectionInfo} from "../index"

const styles = require("./style.scss")

interface WalletProps {}

class Wallet extends React.Component<WalletProps> {

  // tslint:disable-next-line: completed-docs
  public render() {
    return (
      <section className={styles.layout}>
        Wallet
      </section>
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