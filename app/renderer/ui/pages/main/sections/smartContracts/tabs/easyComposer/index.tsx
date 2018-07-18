import * as React from "react"

import { TabInfo, TabComponent } from "app/renderer/ui/pages/main/sections"

/**
 * EasyComposer component
 *
 * @class EasyComposer
 * @extends {TabComponent<any>}
 */
class EasyComposer extends TabComponent<any> {
  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {
    return (
      <div>
        Smart contracts section - east composer Tab
      </div>
    )
  }
}

const EasyComposerTab: TabInfo = {
  key: "easycomposer",
  caption: "easy composer",
  component: EasyComposer
}

export default EasyComposerTab