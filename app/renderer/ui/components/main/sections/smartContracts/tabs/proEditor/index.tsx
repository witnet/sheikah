import * as React from "react"

import { TabInfo, TabComponent } from "app/renderer/ui/components/main/sections"

/**
 * TabProEditor component
 *
 * @class TabProEditor
 * @extends {TabComponent<any>}
 */
class TabProEditor extends TabComponent<any> {
  // tslint:disable-next-line:prefer-function-over-method completed-docs
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