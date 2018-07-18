import * as React from "react"

import { TabInfo, TabComponent } from "app/renderer/ui/pages/main/sections"

/**
 * TabCoins component
 *
 * @class TabCoins
 * @extends {TabComponent<any>}
 */
class TabCoins extends TabComponent<any> {
  // tslint:disable-next-line:prefer-function-over-method completed-docs
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