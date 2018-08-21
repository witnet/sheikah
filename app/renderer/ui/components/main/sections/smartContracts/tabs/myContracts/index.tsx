import * as React from "react"

import { TabInfo, TabComponent } from "app/renderer/ui/components/main/sections"
import * as urls from "app/renderer/constants/urls"

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

const MyContractsTab: TabInfo = {
  key: "mycontracts",
  caption: "My contracts",
  path: urls.MY_CONTRACTS_TAB,
  component: MyContracts
}

export default MyContractsTab