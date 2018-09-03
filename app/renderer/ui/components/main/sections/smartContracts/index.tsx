import * as React from "react"

import { TabHistory, TabEditor } from "./tabs"
import TopBar from "app/renderer/ui/components/topBar/index"
import { TopBarLinkProps } from "app/renderer/ui/components/commonTypes"
import { SectionInfo, TabInfo, SectionProps } from "app/renderer/ui/components/main/sections"

import * as urls from "app/renderer/constants/urls"
import { PropsRoute } from "app/renderer/utils/propsRoute"
import { Switch } from "react-router"

const mainStyles = require("app/renderer/ui/components/main/style.scss")

const styles = require("./style.scss")

/**
 * SmartContracts component
 *
 * @class SmartContracts
 * @extends {React.Component<SmartContractsProps>}
 */
class SmartContracts extends React.Component<SectionProps> {

  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {
    const tabs: Array<TabInfo> = [TabHistory, TabEditor]
    const topBarlinkProps: Array<TopBarLinkProps> = tabs.map(tab => (
      {
        key: tab.key,
        caption: tab.caption,
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
              path={urls.SMART_CONTRACTS_HISTORY_TAB}
              ownProps={this.props}
              component={TabHistory.component}
            />
            <PropsRoute
              path={urls.SMART_CONTRACTS_EDITOR_TAB}
              ownProps={this.props}
              component={TabEditor.component}
            />
            <PropsRoute
              path=""
              ownProps={this.props}
              component={TabHistory.component}
            />
          </Switch>
        </div>
      </>
    )
  }
}

const SmartContractsSection: SectionInfo = {
  key: "smartcontracts",
  caption: "Smart Contracts",
  sectionPath: urls.SMART_CONTRACTS_SECTION,
  path: urls.MY_CONTRACTS_TAB,
  component: SmartContracts,
  icon: "code"
}

export default SmartContractsSection