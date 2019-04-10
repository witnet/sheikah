import * as React from "react"
import Wrapper from "app/renderer/ui/components/wrapper"

import * as urls from "app/renderer/constants/urls"
import {
  TabComponent,
  TabInfo,
} from "app/renderer/ui/components/main/sections"
import { Services } from "app/renderer/services"
import { CardDefault } from "app/renderer/ui/components/card"

const svgImage = require("svg/dataRequestsHistory.svg")
const styles = require("./style.scss")
const mainStyles = require("app/renderer/ui/components/main/style.scss")

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class TabHistory extends TabComponent<any & Props> {
  public render() {
    // Options to be shown in the Dropdown menu
    const byTemplateOptions = [
      "Order by template",
    ].map((opt: string) => (
      {
        text: opt,
        onClick: () => this.props.services.showUnimplementedMessage(),
      }
    ))

    return (
      <div className={mainStyles["main-padding"]}>
        <Wrapper className={styles.template} title="BY TEMPLATE" actions={byTemplateOptions}>
          <CardDefault className={styles["with-padding"]}>
            <img src={svgImage} />
          </CardDefault>
        </Wrapper>
        <div className={`${styles.text} ${mainStyles["about-side"]}`}>
          <p className={styles.title}>About data requests</p>
          <p className={styles.text}>
            Data requests are scripts that tell Witnet where to retrieve data.
            You can think of them as the <em>&quot;if-this-then-that&quot;</em> of
            blockchains.
          </p>
          <p className={styles.text}>
            Data requests perform transformations and aggregations on data
            coming from several sources. When delivering the results, they can
            also use several targets: from pushing the data to a web server
            using a secure WebHook, to reporting it directly to a smart
            contract.
          </p>
          <p className={styles.text}>
            Every time you deploy a data request, you can choose how many Witnet
            nodes will be processing the request. This is called &quot;replication
            factor&quot;. The more nodes, the higher the fidelity of the request will
            be. For each additional replication factor, there will be additional
            costs to the requester.
          </p>
          <p className={styles.text}>
            Sheikah does not manage data requests directly but uses flexible
            data request templates instead. These templates can later be
            deployed to Witnet using customizable parameters.
          </p>
        </div>
      </div>
    )
  }
}

const HistoryTab: TabInfo = {
  key: "history",
  caption: "History",
  path: urls.DATA_REQUESTS_HISTORY_TAB,
  component: TabHistory,
}

export default HistoryTab
