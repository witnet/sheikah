import * as React from "react"

import { CardNavigation } from "app/renderer/ui/components/card"
import { InputUnderlined } from "app/renderer/ui/components/input"

const stepStyles = require("./style.scss")
const commonFormStepStyles = require("app/renderer/ui/components/walletForm/steps/style.scss")

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
    const cardStyle = `${commonFormStepStyles.centered} ${this.props.className}`

    return (
      <CardNavigation
        className={cardStyle}
        title="Wallet encryption password"
        previousStep={this.props.previousStep}
        nextStep={this.props.nextStep}
      >
        <p className={stepStyles.text}>Choose a password to encrypt your wallet.</p>
        <div className={stepStyles.field}>
          <label className={`${stepStyles.label} ${stepStyles["password-label"]}`}>Password</label>
          <InputUnderlined
            className={`${stepStyles.input} ${stepStyles["password-input"]}`}
            type="password"
            onChange={this.props.onChangePassword}
            value={this.props.password}
          />
        </div>
        <div className={stepStyles.field}>
          <label
            className={`${stepStyles.label} ${stepStyles["confirm-password-label"]}`}
          >
            Confirm password
          </label>
          <InputUnderlined
            className={`${stepStyles.input} stepStyles["confirm-password-input"]`}
            type="password"
            onChange={this.props.onChangeRepeatPassword}
            value={this.props.repeatPassword}
          />
        </div>
        <p className={`${commonFormStepStyles.error} ${stepStyles.error}`}>
          {this.props.errorMessage}
        </p>
      </CardNavigation>
    )
  }
}