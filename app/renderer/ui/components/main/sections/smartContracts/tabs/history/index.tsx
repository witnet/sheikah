import CardDefault from "app/renderer/ui/components/card/default"
import * as React from "react"

import { TabInfo, TabComponent } from "app/renderer/ui/components/main/sections"
import * as urls from "app/renderer/constants/urls"
import Wrapper from "app/renderer/ui/components/wrapper"
import { Services } from "app/renderer/services"

const svgImage = require("svg/smartContractsHistory.svg")

const layoutStyles = require("app/renderer/ui/components/main/sections/smartContracts/style.scss")
const styles = require("./style.scss")
const tabStyles = require("app/renderer/ui/components/main/sections/smartContracts/tabs/style.scss")

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
      <div className={layoutStyles.paddedLayout}>
        <div className={tabStyles.left}>
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

        <div className={tabStyles.right}>
          <p className={styles.title}>About Smart Contracts</p>
          <p className={styles.text}>
            Smart contracts are programs that live in the blockchain. They have their own addresses
            for receiving Witnet tokens, but the ability to spend those tokens is determined by the
            code of the programs themselves.
          </p>
          <p className={styles.text}>
            Smart contracts can also read data requests and decide upon their result. For example,
            a group of people can lock tokens into a virtual safe from which no one can spend until
            the outcome of some future event in the real world is known. Then, depending on the
            result, different parties will be able to redeem the tokens.
          </p>
          <p className={styles.text}>
            Sheikah does not manage smart contracts directly but uses more flexible smart contract
            templates instead. These templates can later be deployed to Witnet using specific
            parameters, so they are really easy to customize for your different use cases.
          </p>
          <p className={styles.text}>
            Note that Witnet's native smart contracts are not as powerful as Ethereum or RChain
            contracts. If you require that kind of functionality, remember that you can make your
            data requests report directly to your existing contracts in other blockchain platforms.
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
  component: TabHistory
}

export default HistoryTab