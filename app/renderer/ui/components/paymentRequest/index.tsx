import * as React from "react"
import { Dropdown } from "app/renderer/ui/components/dropdown"
import { ComputedPaymentRequest } from "app/renderer/prefilledPaymentRequests"
import parseDate from "app/renderer/utils/parseDate"

const styles = require("./style.scss")

export type OwnProps = ComputedPaymentRequest

/**
 * PaymentRequest UI component
 *
 * @export
 * @class PaymentRequest
 * @extends {React.Component<OwnProps>}
 */
export default class PaymentRequest extends React.Component<OwnProps> {
  // tslint:disable-next-line: completed-docs
  public render() {
    const creationDate = this.props.metadata && this.props.metadata.creationDate
      ? parseDate(new Date(this.props.metadata.creationDate * 1000), "day", false)
      : ""

    return (
      <div className={styles["payment-request"]}>
        <div className={styles.date}>
          {creationDate}
        </div>
        <div className={styles.info}>
          <div className={styles.label}>
            {this.buildLabel()}
          </div>
          <div className={styles.status}>
            {this.buildStatus()}
          </div>
        </div>
        <div className={styles.address}>
          <pre>
            {this.props.address}
          </pre>
        </div>
        <Dropdown
          className={styles.actions}
          dataSource={this.props.actions}
        />
      </div>
    )
  }

  /**
   * Method to get the wit span
   */
  private getWitSpan = () => {
    return (<span className={styles.wit}> WIT</span>)
  }

  /**
   * Method to build the label in a payment request
   */
  private buildLabel = () => {
    const fromSpan = this.props.metadata && this.props.metadata.label
      // There is a label in the payment request
      ? <span>{this.props.metadata.label} </span>
      // No label in the payment request
      : <></>

    const witSpan = this.props.metadata && this.props.metadata.label
      // There is a label in the payment request...
      ? this.props.metadata.requestedAmount
        // and there is some requested amount
        ? (
          <>
            <span>({this.props.metadata.requestedAmount}</span>
            {this.getWitSpan()}
            <span>)</span>
          </>
        )
        // and there is no requested amount
        : (
          <></>
        )
      // No label in the payment request...
      : this.props.metadata && this.props.metadata.requestedAmount
        // and there is some requested amount
        ? (
          <>
            <span>{this.props.metadata.requestedAmount}</span>
            {this.getWitSpan()}
          </>
        )
        // , there is no requested amount...
        : this.props.funds !== 0
          // and some funds were received
          ? (
            <>
              <span>{this.props.funds}</span>
              {this.getWitSpan()}
            </>
          )
          // and no funds were received
          : (
            <></>
          )

    return (
      <>
        {fromSpan}
        {witSpan}
      </>
    )
  }

  /**
   * Method to build the status in a payment request
   */
  private buildStatus = () => {
    // Funded status
    const fundedStatus = {
      pending: this.props.expiredStatus === "expired"
        // Pending but expired
        ? (
          <></>
        )
        // Pending and not expired
        : (
          <span className={styles.yellow}>Pending</span>
        ),
      "partially funded": (
        <>
          <span className={styles.yellow}>Partially funded </span>
          <span>({this.props.funds}</span>
          {this.getWitSpan()}
          <span>)</span>
        </>
      ),
      funded: (
        <span className={styles.green}>Funded</span>
      ),
      overfunded: (
        <>
          <span className={styles.green}>Overfunded </span>
          <span>({this.props.funds}</span>
          {this.getWitSpan()}
          <span>)</span>
        </>
      )
    }

    const expirationDate = this.props.metadata && this.props.metadata.expirationDate
      ? parseDate(new Date(this.props.metadata.expirationDate * 1000), "day", false)
      : ""
    // Expiration status
    const expiredStatus = {
      expired: (
        <>
          <span className={styles.red}>Expired </span>
          <span>
            on {expirationDate}
          </span>
        </>
      ),
      "not expired": (
        <span>, expiring on {expirationDate}</span>
      ),
      unknown: (
        <></>
      )
    }

    return (
      <>
        {fundedStatus[this.props.fundedStatus]}
        {expiredStatus[this.props.expiredStatus]}
      </>
    )
  }
}