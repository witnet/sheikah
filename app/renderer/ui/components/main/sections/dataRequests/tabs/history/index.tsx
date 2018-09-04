import * as React from "react"
import Wrapper from "app/renderer/ui/components/wrapper"

import * as urls from "app/renderer/constants/urls"
import { TabComponent, TabInfo } from "app/renderer/ui/components/main/sections"
import { Services } from "app/renderer/services"
import { CardDefault } from "app/renderer/ui/components/card"

const svgImage = require("svg/dataRequestsHistory.svg")
const styles = require("./style.scss")

/**
 * Props that contain configuration
 *
 * @interface Props
 */
interface Props {
  services: Services,
}

/**
 * TabHistory component
 *
 * @class TabHistory
 * @extends {TabComponent<any & Props>}
 */
class TabHistory extends TabComponent<any & Props> {

  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {

    // Options to be shown in the Dropdown menu
    const byTemplateOptions = [
      "Order by template"
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
          >
            <CardDefault
              className={styles.withPadding}
            >
              <img src={svgImage} />
            </CardDefault>
          </Wrapper>
        </div>

        <div className={styles.right}>
          <p className={styles.title}>About data requests</p>
          {/* TODO: insert description about Data Requests */}
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

const HistoryTab: TabInfo = {
  key: "history",
  caption: "History",
  path: urls.DATA_REQUESTS_HISTORY_TAB,
  component: TabHistory
}

export default HistoryTab