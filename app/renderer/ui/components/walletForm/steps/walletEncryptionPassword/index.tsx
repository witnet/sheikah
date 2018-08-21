import * as React from "react"

import { CardNavigation } from "app/renderer/ui/components/card"
import { InputUnderlined } from "app/renderer/ui/components/input"

const styles = require("./style.scss")

export interface Iprops {
  className?: string
  errorMessage?: string
  nextStep: () => void
  onChangePassword: (ev: React.ChangeEvent) => void
  onChangeRepeatPassword: (ev: React.ChangeEvent) => void
  password: string
  previousStep: () => void
  repeatPassword: string
}

/**
 * Step wallet encryption password UI component
 *
 * @export
 * @class WalletEncryptionPassword
 * @extends {React.Component<Iprops>}
 */

export default class WalletEncryptionPassword extends React.Component<Iprops> {
  /** render */
  public render() {
    const cardStyle = `${styles.centered} ${this.props.className}`

    return (
      <CardNavigation
        className={cardStyle}
        title="Wallet encryption password"
        previousStep={this.props.previousStep}
        nextStep={this.props.nextStep}
      >
        <p className={styles.text}>Choose a password to encrypt your wallet.</p>
        <div className={styles.field}>
          <label className={`${styles.label} ${styles["password-label"]}`}>Password</label>
          <InputUnderlined
            className={`${styles.input} ${styles["password-input"]}`}
            type="password"
            onChange={this.props.onChangePassword}
            value={this.props.password}
          />
        </div>
        <div className={styles.field}>
          <label
            className={`${styles.label} ${styles["confirm-password-label"]}`}
          >
            Confirm password
          </label>
          <InputUnderlined
            className={`${styles.input} styles["confirm-password-input"]`}
            type="password"
            onChange={this.props.onChangeRepeatPassword}
            value={this.props.repeatPassword}
          />
        </div>
        <p className={styles.error}>{this.props.errorMessage}</p>
      </CardNavigation>
    )
  }
}