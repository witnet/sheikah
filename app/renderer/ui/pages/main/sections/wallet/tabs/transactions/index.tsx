import * as React from "react"

import {
  ConfirmedTransaction,
  PendingTransaction
} from "app/renderer/ui/components/transaction"
import Balances from "./balances"
import Wrapper from "app/renderer/ui/components/wrapper"
import List from "app/renderer/ui/components/list"

import { TabInfo, TabComponent } from "app/renderer/ui/pages/main/sections"

import {
  balanceData,
  confirmedTransactions,
  confirmedOptions,
  pendingTransactions
} from "app/renderer/ui/pages/main/sections/wallet/MockData"

const styles = require("./style.scss")

/**
 * Transactions component
 *
 * @class Transactions
 * @extends {TabComponent<any>}
 */
class Transactions extends TabComponent<any> {
  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {
    return (
      <>
        <div className={styles.left}>
          <Wrapper
            title="PENDING"
            caption="2 transactions"
            className={styles.pending}
          >
            <List
              dataSource={pendingTransactions}
              renderItem={PendingTransaction}
            />
          </Wrapper>
          <Wrapper
            title="CONFIRMED"
            caption="3 transactions"
            actions={confirmedOptions}
            className={styles.confirmed}
          >
            <List
              dataSource={confirmedTransactions}
              renderItem={ConfirmedTransaction}
            />
          </Wrapper>
        </div>

        <div className={styles.right}>
          <Balances className={styles.balances} {...balanceData} />
          <Wrapper
            title="VESTING SCHEDULE GRAPH"
            actions={confirmedOptions}
            className={styles["vesting-graph"]}
          >
            <p>Coming soon... D3 GRAPH</p>
          </Wrapper>
        </div>
      </>
    )
  }
}

const TransactionsTab: TabInfo = {
  key: "transactions",
  caption: "Transactions",
  component: Transactions
}

export default TransactionsTab
