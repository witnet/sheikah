import * as React from "react"

import { TabInfo, TabComponent } from "app/renderer/ui/components/main/sections"
import * as urls from "app/renderer/constants/urls"
import Wrapper from "app/renderer/ui/components/wrapper"
import { Services } from "app/renderer/services"

const svgImage = require("svg/smartContractsHistory.svg")
const styles = require("./style.scss")

/**
 * Props that contain configuration
 *
 * @interface Props
 */
interface Props {
  services: Services
}

/**
 * Smart Contracts History tab component
 *
 * @class TabHistory
 * @extends {TabComponent<any>}
 */
class TabHistory extends TabComponent<any & Props> {

  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {

    // Options to be shown in the Dropdown menu
    const byTemplateOptions = [
      "Order by template",
      "Order by deployment date"
    ].map((opt: string) => (
      {
        text: opt,
        onClick: () => this.props.services.showUnimplementedMessage()
      }
    ))

    return (
      <>
        <div className={styles.left}>
          <Wrapper
            title="BY TEMPLATE"
            actions={byTemplateOptions}
            className={styles.confirmed}
          >
            <img src={svgImage} />
          </Wrapper>
        </div>

        <div className={styles.right}>
          <p className={styles.title}>About Smart Contracts</p>
          {/* TODO: Insert description about Smart Contracts */}
          <p className={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </>
    )
  }
}

/**
 * Tab information
 */
const HistoryTab: TabInfo = {
  key: "history",
  caption: "History",
  path: urls.SMART_CONTRACTS_HISTORY_TAB,
  component: TabHistory
}

export default HistoryTab