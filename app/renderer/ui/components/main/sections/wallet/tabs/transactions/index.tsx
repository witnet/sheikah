import * as React from "react"

import {
  ConfirmedTransaction,
  PendingTransaction
} from "app/renderer/ui/components/transaction"
import Balances from "app/renderer/ui/components/balances"
import Wrapper from "app/renderer/ui/components/wrapper"
import List from "app/renderer/ui/components/list"

import * as urls from "app/renderer/constants/urls"

import { TabInfo, TabComponent } from "app/renderer/ui/components/main/sections"

import {
  balanceData,
  confirmedTransactions,
  pendingTransactions
} from "app/renderer/ui/components/main/sections/wallet/MockData"

const styles = require("./style.scss")

interface OwnProps {
  pendingTransactions: Transactions | {}
  confirmedTransactions: Transactions | {}
}

/**
 * Transactions component
 *
 * @class Transactions
 * @extends {TabComponent<any>}
 */
class Transactions extends TabComponent<any & OwnProps> {
  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {
    const confirmedOptions = ["Option 1", "Option 2", "Option 3"].map((opt: string) => (
      {
        text: opt,
        onClick: () => this.props.services.showUnimplementedMessage()
      }
    ))
    console.log("THIS:PROPS", this.props)
    const pendingTransactionsList = !!Object.keys(this.props.pendingTransactions).length
      ? (
        <List
          dataSource={pendingTransactions}
          renderItem={PendingTransaction}
        />
      )
    : (
      <p>You don't have transactions</p>
    )

    const confirmedTransactionsList = !!Object.keys(this.props.confirmedTransactions).length
      ? (
        <List
          dataSource={confirmedTransactions}
          renderItem={ConfirmedTransaction}
        />
      )
      : (
          <p>You don't have transactions</p>
        )

    return (
      <>
        <div className={styles.left}>
          <Wrapper
            title="PENDING"
            caption={`${Object.keys(this.props.pendingTransactions).length} transactions`}
            className={styles.pending}
            empty={!Object.keys(this.props.pendingTransactions).length}
          >
            {pendingTransactionsList}
          </Wrapper>
          <Wrapper
            title="CONFIRMED"
            caption={`${Object.keys(this.props.confirmedTransactions).length} transactions`}
            actions={confirmedOptions}
            className={styles.confirmed}
            empty={!Object.keys(this.props.confirmedTransactions).length}
          >
            {confirmedTransactionsList}
          </Wrapper>
        </div>

        <div className={styles.right}>
          <Balances className={styles.balances} {...balanceData} />
          <Wrapper
            title="VESTING SCHEDULE GRAPH"
            actions={confirmedOptions}
            className={styles["vesting-graph"]}
            empty={true}

          >
            <p>VESTING SCHEDULE GRAPH</p>
          </Wrapper>
        </div>
      </>
    )
  }
}

const TransactionsTab: TabInfo = {
  key: "transactions",
  caption: "Transactions",
  path: urls.TRANSACTIONS_TAB,
  component: Transactions
}

export default TransactionsTab
