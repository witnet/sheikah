import * as React from "react"

import { CardNavigation } from "app/renderer/ui/components/card"
import { InputUnderlined } from "app/renderer/ui/components/input"

const styles = require("./style.scss")

export interface Iprops {
  className: string
  nextStep: any
  previousStep: any
}

/**
 * Step wallet encryption password UI component
 *
 * @export
 * @class WalletEncryptionPassword
 * @extends {React.Component<Iprops>}
 */

export default class WalletEncryptionPassword extends React.Component<Iprops> {

  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {
    return (
      <CardNavigation
        className={this.props.className}
        title="Wallet encryption password"
        previousStep={this.props.previousStep}
        nextStep={this.props.nextStep}
      >
        <p>Choose a password to encrypt your wallet.</p>
        <div className={styles.fields}>
          <label className={styles["password-label"]}>Password</label>
          <InputUnderlined className={styles["password-input"]} />
          <label className={styles["confirm-password-label"]}>Confirm password</label>
          <InputUnderlined className={styles["confirm-password-input"]} />
        </div>
      </CardNavigation>
    )
  }
}