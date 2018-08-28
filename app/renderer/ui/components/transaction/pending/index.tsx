import * as React from "react"
import { parseDate } from "app/renderer/utils/parseDate"

const styles = require("./style.scss")

export interface PendingTransactionProps {
  status: string
  amount?: string
  receiver?: boolean
  address?: string
  vestingTime?: Date
}

/**
 * List UI component
 *
 * @export
 * @class List
 * @extends {React.Component<PendingTransactionProps>}
 */

export default class PendingTransaction extends React.Component<PendingTransactionProps> {
  // tslint:disable-next-line: completed-docs
  public render() {
    const receiver = this.props.receiver ? "From" : "To"
    const value = this.props.receiver ? "positive" : "negative"

    return (
      <div className={styles.transaction}>
        <p className={styles["status-icon"]}>
          <i className={`fa fa-circle ${styles[this.props.status]}`} />
        </p>
        <p className={styles.status}>{this.props.status}</p>
        <p className={styles.vestingTime}>
          {this.props.vestingTime && `Vesting on ${parseDate(this.props.vestingTime, "day", true)}`}
        </p>
        <p className={styles.amount}>
          <span className={`${styles.number} ${styles[value]}`}>
          {`${value === "positive" ? "+" : "-"}${this.props.amount}`}
          </span>
          <span className={styles.wit}>
            WIT
          </span>
        </p>
        <p className={styles.address}>
          <span className={styles.origin}>{receiver} </span>
          <span className={styles["address-number"]}>{this.props.address}</span>
        </p>
      </div>
    )
  }
}