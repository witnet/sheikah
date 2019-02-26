import * as React from "react"
import * as _ from "lodash"

import { ComputedTransactions } from "app/renderer/prefilledTransactions"

import {
  ConfirmedTransaction,
  PendingTransaction,
} from "app/renderer/ui/components/transaction"
import Balances from "app/renderer/ui/components/balances"
import Wrapper from "app/renderer/ui/components/wrapper"
import List from "app/renderer/ui/components/list"
import EmptyState from "app/renderer/ui/components/emptyState"
import * as urls from "app/renderer/constants/urls"

import {
  TabInfo,
  TabComponent,
  TabProps,
} from "app/renderer/ui/components/main/sections"

import { balanceData } from "app/renderer/ui/components/main/sections/wallet/MockData"
import { Services } from "app/renderer/services"
import { PathNameProp } from "app/renderer/ui/components/commonTypes"

const styles = require("./style.scss")
const mainStyles = require("app/renderer/ui/components/main/style.scss")

interface OwnProps {
  pendingTransactions: ComputedTransactions,
  confirmedTransactions: ComputedTransactions,
  services: Services,
  pathName: PathNameProp,
  isPrefilledWallet: boolean,
}

/**
 * Transactions component
 *
 * @class Transactions
 * @extends {TabComponent<any>}
 */
class Transactions extends TabComponent<TabProps & PathNameProp & OwnProps> {
  public render() {
    const balances = this.props.isPrefilledWallet
      ? balanceData
      : _.mapValues(balanceData, () => 0)

    const listOptions = [
      "Export all transactions as CSV",
      "View in block explorer",
    ].map((opt: string) => ({
      text: opt,
      onClick: () => {
        this.props.services.showUnimplementedMessage()
      },
    }))

    const pendingTransactionsList = (
      <List
        dataSource={this.props.pendingTransactions}
        renderItem={PendingTransaction}
        emptyIcon="generic"
        emptyText="You don't have pending transactions"
      />
    )

    const confirmedTransactionsList = (
      <List
        dataSource={this.props.confirmedTransactions}
        renderItem={ConfirmedTransaction}
        emptyIcon="generic"
        emptyText="You don't have confirmed transactions"
      />
    )

    return (
        <div className={`${mainStyles.wrapper} ${mainStyles["main-padding"]}`}>
          <div className={styles.main}>
            <Wrapper
              title="PENDING"
              caption={`${this.props.pendingTransactions.length} transactions`}
              className={`${styles.pending}`}
              empty={!this.props.pendingTransactions.length}
            >
              {pendingTransactionsList}
            </Wrapper>
            <Wrapper
              title="CONFIRMED"
              caption={`${this.props.confirmedTransactions.length} transactions`}
              actions={listOptions}
              className={styles.confirmed}
              empty={!this.props.confirmedTransactions.length}
            >
              {confirmedTransactionsList}
            </Wrapper>
          </div>

          <div className={styles.side}>
            <Balances className={styles.balances} {...balances} />
            <Wrapper
              title="VESTING SCHEDULE GRAPH"
              actions={listOptions}
              className={styles["vesting-graph-wrapper"]}
              empty={true}
              contentClassName={styles["vesting-graph"]}
            >
              <EmptyState iconName="graph" text="Nothing to show" />
            </Wrapper>
          </div>
        </div>
    )
  }
}

const TransactionsTab: TabInfo = {
  key: "transactions",
  caption: "Transactions",
  path: urls.TRANSACTIONS_TAB,
  component: Transactions,
}

export default TransactionsTab
