import * as React from "react"

import { TabInfo, TabComponent } from "app/renderer/ui/components/main/sections"
import * as urls from "app/renderer/constants/urls"

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

const ProEditorTab: TabInfo = {
  key: "proEditor",
  caption: "PRO Editor",
  link: urls.PROEDITOR_TAB,
  component: TabProEditor
}

export default ProEditorTab