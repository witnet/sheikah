import * as React from "react"

const styles = require("./style.scss")

export interface Iprops {
  status: string
  amount?: string
  receiver?: boolean
  address?: string
  vestingTime?: string
}

/**
 * List UI component
 *
 * @export
 * @class List
 * @extends {React.Component<Iprops>}
 */

export default class PendingTransaction extends React.Component<Iprops> {
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
        <p className={styles.vestingTime}>{this.props.vestingTime}</p>
        <p className={styles.amount}>
          <span className={`${styles.number} ${styles[value]}`}>
            {this.props.amount || "+0.1"}
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