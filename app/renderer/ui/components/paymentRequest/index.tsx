import * as React from "react"
import Popover from '../popover';

const styles = require("./style.scss")

type status = "expired" | "still into force" | "never funded"

export interface Iprops {
  creationDate: string
  expirationDate?: string
  status: status
  from: string
  amount: string
  actions: (string | { text: any; onClick: any })[]
}

/**
 * List UI component
 *
 * @export
 * @class List
 * @extends {React.Component<Iprops>}
 */

export default class PaymentRequest extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs
  public render() {
    const createStatus = (status: status, date: string | undefined) => (
      {
        expired: (<p className={styles["expiration-date"]}><span className={styles.red}>Still into force</span>, expiring on {date}</p>),
        "still into force": (<p className={styles["expiration-date"]}><span className={styles.green}>Expired</span> on {date}</p>),
        "never funded": (<p className={styles["expiration-date"]}><span className={styles.red}>Never funded</span></p>)
      }[status]
    )

    return (
      <div className={styles["payment-request"]}>
        <div className={styles["creation-date"]}>
          {this.props.creationDate}
        </div>
        <div className={styles.info}>
          <p>From {this.props.from} ({this.props.amount}WIT)</p>
          {createStatus(this.props.status, this.props.expirationDate)}
        </div>
        <div className={styles.actions}>
          <Popover dataSource={this.props.actions} />
        </div>
      </div>
    )
  }
}