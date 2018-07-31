import * as React from "react"

import CardDefault from "app/renderer/ui/components/card/default"

const styles = require("./style.scss")

export interface Iprops {
  className?: any
}

/**
 * Step walled password request UI component
 *
 * @export
 * @class WalletPasswordRequest
 * @extends {React.Component<Iprops>}
 */

export default class WalletUnlockInProgress extends React.Component<Iprops> {
  /** render */
  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    /** render */
    // tslint:disable-next-line:prefer-function-over-method
    return (
      <CardDefault className={styles.step}>
        <p className={styles.subtitle}>Sheikah is trying to unlock your
          wallet</p>
        <p className={styles.text}>This will take a few seconds</p>
      </CardDefault>
    )
  }
}