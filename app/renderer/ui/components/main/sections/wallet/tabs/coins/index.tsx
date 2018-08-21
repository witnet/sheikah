import * as React from "react"

import { TabInfo, TabComponent } from "app/renderer/ui/components/main/sections"
import * as urls from "app/renderer/constants/urls"

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

const CoinsTab: TabInfo = {
  key: "coins",
  caption: "Coins",
  link: urls.COINS_TAB,
  component: TabCoins
}

export default CoinsTab