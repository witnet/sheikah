import * as React from "react"

import {TabInfo, TabComponent} from "../../../index"

class TabCoins extends TabComponent<any> {

  public render() {
    return (
      <div>
        Coins Tab
      </div>
    )
  }
}

const TransactionsTab: TabInfo = {
  key: "coins",
  caption: "Coins",
  component: TabCoins
}

export default TransactionsTab