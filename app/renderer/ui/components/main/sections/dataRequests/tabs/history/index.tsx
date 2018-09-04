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
            Data requests are simple scripts that tell Witnet to retrieve data from websites, APIs
            or other blockchains and deliver it wherever it is needed. You can think of them as the
            <em>"if-this-then-that"</em> of blockchains.
          </p>
          <p className={styles.text}>
            Data requests can perform transformations and aggregations on data coming from several
            sources. When delivering the result, they can also use several targets: from pushing the
            data to a web server using a secure WebHook to reporting it directly to an Ethereum or
            RChain smart contract.
          </p>
          <p className={styles.text}>
            Every time you deploy a data request, you can choose how many Witnet nodes will be
            processing the request. That is called "replication factor". The more nodes, the safer
            but also the more fees you need to pay. It is up to you to decide the right number for
            your particular use case.
          </p>
          <p className={styles.text}>
            Sheikah does not manage data requests directly but uses more flexible data request
            templates instead. These templates can later be deployed to Witnet using specific
            parameters, so they are really easy to customize for your different use cases.
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