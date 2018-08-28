import * as React from "react"

const styles = require("./style.scss")

/**
 * ConfirmedTransaction's props
 *
 * @export
 * @interface ConfirmedTransactionProps
 */
export interface ConfirmedTransactionProps {
  amount?: number
  receiver?: boolean
  address?: string
  block?: string
  date?: string
}

/**
 * ConfirmedTransaction component
 *
 * @export
 * @class ConfirmedTransaction
 * @extends {React.Component<ConfirmedTransactionProps>}
 */
export default class ConfirmedTransaction extends React.Component<ConfirmedTransactionProps> {
  // tslint:disable-next-line: completed-docs
  public render() {
    const Icon = this.props.receiver
      ? (<p className={styles.icon}><i className={`fa fa-angle-right ${styles.green}`} /></p>)
      : (<p className={styles.icon}><i className={`fa fa-angle-left ${styles.red}`} /></p>)
    const receiver = this.props.receiver ? "From" : "To"
    const value = this.props.receiver ? "positive" : "negative"

    return (
      <div className={styles.transaction}>
        {Icon}
        <p className={styles.amount}>
          <span className={`${styles.number} ${styles[value]}`}>
            {`${value === "positive" ? "+" : "-"}${this.props.amount}`}
          </span>
          <span className={styles.wit}>WIT</span></p>
        <p className={styles.address}>
          <span className={styles.origin}>{receiver} </span>
          <span className={styles["address-number"]}>{this.props.address}</span>
        </p>
        <div>
          <p className={styles.date}>{this.props.date}</p>
          <p className={styles.block}>Confirmed in block #{this.props.block}</p>
        </div>
      </div>
    )
  }
}