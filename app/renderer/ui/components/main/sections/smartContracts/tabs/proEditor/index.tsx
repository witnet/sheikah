import * as React from "react"

import {TabInfo, TabComponent} from "../../../index"

class TabProEditor extends TabComponent<any> {

  public render() {
    return (
      <div>
        Smart contracts section - Pro Editor Tab
      </div>
    )
  }
}

const TransactionsTab: TabInfo = {
  key: "proEditor",
  caption: "PRO Editor",
  component: TabProEditor
}

export default TransactionsTab