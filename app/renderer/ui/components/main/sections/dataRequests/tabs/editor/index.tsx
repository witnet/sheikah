import * as React from "react"

import * as urls from "app/renderer/constants/urls"
import { TabComponent, TabInfo } from "app/renderer/ui/components/main/sections"
import { Services } from "app/renderer/services"

/**
 * Props that contain configuration
 *
 * @interface Props
 */
interface Props {
  services: Services,
}

/**
 * TabEditor component
 *
 * @class TabEditor
 * @extends {TabComponent<any & Props>}
 */
class TabEditor extends TabComponent<any & Props> {

  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {
    return (
      <div>
        Data requests section - editor tab
      </div>
    )
  }
}

const EditorTab: TabInfo = {
  key: "list",
  caption: "Editor",
  path: urls.DATA_REQUESTS_EDITOR_TAB,
  component: TabEditor
}

export default EditorTab