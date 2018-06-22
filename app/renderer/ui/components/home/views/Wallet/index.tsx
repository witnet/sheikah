import * as React from "react"
import Wrapper from '../../../wrapper/index';
import { ConfirmedTransaction, PendingTransaction } from '../../../transaction/index';
import List from '../../../list/index';
import Balances from './balances/index';

const styles = require("./style.scss")

export interface Iprops {}

/**
 * Wallet UI component
 *
 * @export
 * @class Wallet
 * @extends {React.Component<Iprops>}
 */

export default class Wallet extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs
  public render() {
    const pendingTransactions = [
      {
        status: "unconfirmed",
        address: "wit1qre9fq64r5jgv0t3m8q3tvnqwphxm9xpacvrdhe5",
        receiver: true,
        amount: "+1"
      },
      {
        status: "timelocked",
        address: "Genesis block",
        receiver: true,
        amount: "+0.1",
        vestingTime: "(Vesting on October 21th 2019)"
      }
    ]
    const confirmedTransactions = [
      {
        address: "wit1qre9fq64r5jgv0t3m8q3tvnqwphxm9xpacvrdhe5",
        receiver: true,
        amount: "+0.1",
        block: "92673",
        date: "April 23 at 14:38"
      },
      {
        address: "wit1qre9fq64r5jgv0t3m8q3tvnqwphxm9xpacvrdhe5",
        receiver: false,
        amount: "-0.1",
        block: "92673",
        date: "April 23 at 14:38"
      },
      {
        address: "wit1qre9fq64r5jgv0t3m8q3tvnqwphxm9xpacvrdhe5",
        receiver: true,
        amount: "+0.1",
        block: "92673",
        date: "April 23 at 14:38"
      }
    ]
    const confirmedOptions = [
      {
        text: 'Option 1',
        onClick: () => console.log('CLICKED 1')
      },
      {
        text: 'Option 2',
        onClick: () => console.log('CLICKED 2')
      },
      {
        text: 'Option 3',
        onClick: () => console.log('CLICKED 3')
      }
    ];

    const balanceData = {
      availableBalance: "3.141592",
      timelocked: "1",
      unconfirmed: "0.1",
      total: "4.241592"
    }

    console.log('HELLO')

    return (
      <div className={styles.layout}>
        <div>
          <Wrapper title="PENDING" caption="2 transactions" className={styles.pending}>
            <List dataSource={pendingTransactions} renderItem={PendingTransaction} />
          </Wrapper>
          <Wrapper title="CONFIRMED" caption="3 transactions" actions={confirmedOptions} className={styles.confirmed}>
            <List dataSource={confirmedTransactions} renderItem={ConfirmedTransaction} />
          </Wrapper>
        </div>
        <div>
          <Balances className={styles.balances} {...balanceData} />
          <Wrapper title="VESTING SCHEDULE GRAPH" actions={confirmedOptions} className={styles.confirmed}>
            <p>Comming soon... D3 GRAPH</p>
          </Wrapper>
        </div>
      </div>
    )
  }
}