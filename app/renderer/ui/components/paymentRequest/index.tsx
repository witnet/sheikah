import * as React from "react"
import { Dropdown } from "app/renderer/ui/components/dropdown"
import { ComputedPaymentRequest } from "app/renderer/prefilledPaymentRequests"

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
    return (
      <div className={styles["payment-request"]}>
        <div className={styles.date}>
          {this.props.metadata && this.props.metadata.creationDate}
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
      ? <span>From {this.props.metadata.label} </span>
      : <></>

    const witSpan = this.props.metadata && this.props.metadata.label
      ? this.props.metadata.requestedAmount
        ? (
          <>
            <span>({this.props.metadata.requestedAmount}</span>
            {this.getWitSpan()}
            <span>)</span>
          </>
        )
        : (
          <></>
        )
      : this.props.funds !== 0
        ? (
          <>
            <span>{this.props.funds}</span>
            {this.getWitSpan()}
          </>
        )
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
        ? (
          <></>
        )
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

    // Expiration status
    const expiredStatus = {
      expired: (
        <>
          <span className={styles.red}>Expired </span>
          <span>on {this.props.metadata && this.props.metadata.expirationDate}</span>
        </>
      ),
      "not expired": (
        <span>, expiring on {this.props.metadata && this.props.metadata.expirationDate}</span>
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