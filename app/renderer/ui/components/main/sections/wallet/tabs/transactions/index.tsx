import * as React from "react"
import { ConfirmedTransaction, PendingTransaction } from "../../../../../transaction"
import Balances from "./balances"
import Wrapper from "../../../../../wrapper"
import List from '../../../../../list/index';

import {TabInfo, TabComponent} from "../../../index"

import {
  balanceData,
  confirmedTransactions,
  confirmedOptions,
  pendingTransactions
} from "../../MockData"

const styles = require("./style.scss")


class Transactions extends TabComponent<any> {

  public render() {
    return (
      <>
        <div className={styles.left}>
          <Wrapper title="PENDING" caption="2 transactions" className={styles.pending}>
            <List dataSource={pendingTransactions} renderItem={PendingTransaction} />
          </Wrapper>
          <Wrapper title="CONFIRMED" caption="3 transactions" actions={confirmedOptions} className={styles.confirmed}>
            <List dataSource={confirmedTransactions} renderItem={ConfirmedTransaction} />
          </Wrapper>
        </div>

        <div className={styles.right}>
          <Balances className={styles.balances} {...balanceData} />
          <Wrapper title="VESTING SCHEDULE GRAPH" actions={confirmedOptions} className={styles["vesting-graph"]}>
            <p>Comming soon... D3 GRAPH</p>
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