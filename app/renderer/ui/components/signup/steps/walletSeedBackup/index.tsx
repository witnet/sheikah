import * as React from "react"

import { CardNavigation } from "../../../card/index"
import Alert from "../../../alert/index"

const styles = require("./style.scss")

export interface Iprops {
  className: string
  nextStep: any
  previousStep: any
}

/**
 * Step wallet seedd backup UI component
 *
 * @export
 * @class WalletSeedBackup
 * @extends {React.Component<Iprops>}
 */

export default class WalletSeedBackup extends React.Component<Iprops> {
  /** render */
  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    return (
      <>
        <CardNavigation
          className={this.props.className}
          title="Wallet seed creation"
          previousStep={this.props.previousStep}
          nextStep={this.props.nextStep}
        >
          <p>Your wallet seed secret code is:</p>
          <div className={styles.seed}>
            <p>invite cover trim climb actress carbon only laptop loyal feel edit away</p>
          </div>
          <p>Please save this 12 words on paper (order is important). This seed will allow you to
            recover your wallet in cse of computer failure.</p>
        </CardNavigation>
        <Alert className={styles["alert-grid"]}>
          <div className={styles.alert}>
            <p>Remeber!</p>
            <ul>
              <li>Never disclose your seed.</li>
              <li>Never type on a website</li>
              <li>Do not store electronically</li>
            </ul>
          </div>
        </Alert>
      </>
    )
  }
}