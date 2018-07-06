import * as React from "react"

import {TabInfo, TabComponent} from "../../../index"

class EasyComposer extends TabComponent<any> {

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