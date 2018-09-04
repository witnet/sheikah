import * as React from "react"

import { Switch } from "react-router"

import { SectionInfo, SectionProps, TabInfo } from "app/renderer/ui/components/main/sections"
import * as urls from "app/renderer/constants/urls"
import { TopBarLinkProps } from "app/renderer/ui/components/commonTypes"
import TopBar from "app/renderer/ui/components/topBar"
import { PropsRoute } from "app/renderer/utils/propsRoute"
import { TabHistory, TabEditor } from "app/renderer/ui/components/main/sections/dataRequests/tabs"

const styles = require("./style.scss")
const mainStyles = require("app/renderer/ui/components/main/style.scss")

/**
 * Data requests UI component
 *
 * @export
 * @class DataRequests
 * @extends {React.Component<SectionProps>}
 */

class DataRequests extends React.Component<SectionProps> {
  // tslint:disable-next-line: completed-docs
  public render() {
    const tabs: Array<TabInfo> = [TabHistory, TabEditor]
    const topBarlinkProps: Array<TopBarLinkProps> = tabs.map(tab => (
      {
        caption: tab.caption,
        key: tab.key,
        path: `${tab.path}`
      }
    ))

    return (
      <>
        <TopBar
          className={mainStyles["top-bar"]}
          pathName={this.props.pathName}
          linksProps={topBarlinkProps}
        />
        <div className={styles.layout}>
          <Switch>
            <PropsRoute
              path={urls.DATA_REQUESTS_HISTORY_TAB}
              ownProps={this.props}
              component={TabHistory.component}
            />
            <PropsRoute
              path={urls.DATA_REQUESTS_EDITOR_TAB}
              ownProps={this.props}
              component={TabEditor.component}
            />
            <PropsRoute
              path="/"
              ownProps={this.props}
              component={TabHistory.component}
            />
          </Switch>
        </div>
      </>
    )
  }
}

const DataRequestsSection: SectionInfo = {
  key: "datarequests",
  caption: "Data Requests",
  sectionPath: urls.DATA_REQUESTS_SECTION,
  path: urls.DATA_REQUESTS_HISTORY_TAB,
  component: DataRequests,
  icon: "eye"
}

export default DataRequestsSection