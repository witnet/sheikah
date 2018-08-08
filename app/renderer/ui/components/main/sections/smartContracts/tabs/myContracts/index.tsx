import * as React from "react"

import { TabInfo, TabComponent } from "app/renderer/ui/components/main/sections"

/**
 * MyContracts component
 *
 * @class MyContracts
 * @extends {TabComponent<any>}
 */
class MyContracts extends TabComponent<any> {
  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {
    return (
      <div>
        Smart contracts section - My contracts Tab
        </div>
    )
  }
}

const TransactionsTab: TabInfo = {
  key: "mycontracts",
  caption: "My contracts",
  component: MyContracts
}

export default TransactionsTab