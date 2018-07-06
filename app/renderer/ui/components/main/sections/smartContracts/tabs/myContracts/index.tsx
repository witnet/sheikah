import * as React from "react"

import {TabInfo, TabComponent} from "../../../index"

class MyContracts extends TabComponent<any> {

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