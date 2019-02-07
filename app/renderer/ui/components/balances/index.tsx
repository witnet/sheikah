import * as React from "react"
import Wrapper from "app/renderer/ui/components/wrapper"

const styles = require("./style.scss")

export interface BalanceProps {
  className?: string,
  availableBalance?: string,
  timelocked?: string,
  unconfirmed?: string,
  total?: string,
}

/**
 * Wallet UI component
 *
 * @export
 * @class Wallet
 * @extends {React.Component<BalanceProps>}
 */

export default class Balances extends React.Component<BalanceProps> {
  public render() {
    return (
      <Wrapper
        title="BALANCES"
        contentClassName={styles.balances}
        className={`${this.props.className}`}
        empty={true}
      >
        <div className={styles.line}>
          <p className={styles.text}>Available balance</p>
          <p>
            <span className={styles.number}>{this.props.availableBalance} </span>
            <span className={styles.wit}>WIT</span>
          </p>
        </div>
        <div className={styles.line}>
          <p className={styles.text}>Timelocked</p>
          <p>
            <span className={styles.number}>{this.props.timelocked} </span>
            <span className={styles.wit}>WIT</span>
          </p>
        </div>
        <div className={styles.line}>
          <p className={styles.text}>Unconfirmed</p>
          <p>
            <span className={styles.number}>{this.props.unconfirmed} </span>
            <span className={styles.wit}>WIT</span>
          </p>
        </div>
        <div className={styles.line}>
          <p className={styles.text}>Total</p>
          <p>
            <span className={styles.number}>{this.props.total} </span>
            <span className={styles.wit}>WIT</span>
          </p>
        </div>
      </Wrapper>
    )
  }
}
