import CardDefault from "app/renderer/ui/components/card/default"
import * as React from "react"

import { TabInfo, TabComponent } from "app/renderer/ui/components/main/sections"
import * as urls from "app/renderer/constants/urls"
import Wrapper from "app/renderer/ui/components/wrapper"
import { Services } from "app/renderer/services"

const svgImage = require("svg/smartContractsHistory.svg")

const mainStyles = require("app/renderer/ui/components/main/style.scss")
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
 * Smart Contracts History tab component
 *
 * @class TabHistory
 * @extends {TabComponent<any>}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class TabHistory extends TabComponent<any & Props> {
  public render() {
    // Options to be shown in the Dropdown menu
    const byTemplateOptions = [
      "Order by template",
      "Order by deployment date",
    ].map((opt: string) => (
      {
        text: opt,
        onClick: () => this.props.services.showUnimplementedMessage(),
      }
    ))

    return (
      <div className={mainStyles["main-padding"]}>
        <div className={styles.templates}>
          <Wrapper
            title="BY TEMPLATE"
            actions={byTemplateOptions}
            className={styles.paddingLess}
          >
            <CardDefault>
              <img src={svgImage} />
            </CardDefault>
          </Wrapper>
        </div>
        <div className={`${styles.right}`}>
          <p className={styles.title}>About Smart Contracts</p>
          <p className={styles.text}>
            Smart contracts are programs that live in the Witnet blockchain. They have their own
            addresses for receiving Witnet tokens, but the ability to spend those tokens is
            determined by the code of the program itself.
          </p>
          <p className={styles.text}>
            Smart contracts read data requests and decide upon their result. For example,
            a group of people can lock tokens into a virtual safe (the smart contract) from which
            no one can spend until the outcome of some future event in the real world is known.
            Then, depending on the result, different parties will be able to redeem the tokens.
          </p>
          <p className={styles.text}>
            Sheikah offers smart contract templates which offer the flexibility for users to add
            more specific parameters as they see fit, based on their own use case requirements.
          </p>
          <p className={styles.text}>
            Witnet smart contracts are significantly simpler in terms of their capability
            compared to more popular smart contract platforms. This is by design to ensure
            safety and security of the system. Much of the smart contract logic required for
            more complex processes should be located within the smart contracts requesting the
            data (on Ethereum or RChain).
          </p>
        </div>
      </div>
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
  component: TabHistory,
}

export default HistoryTab
