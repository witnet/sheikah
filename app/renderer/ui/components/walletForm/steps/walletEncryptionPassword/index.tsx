import * as React from "react"

import { NavigationCard } from "app/renderer/ui/components/card"
import { InputUnderlined } from "app/renderer/ui/components/input"

const stepStyles = require("./style.scss")
const commonFormStepStyles = require("app/renderer/ui/components/walletForm/steps/style.scss")

export interface WalletEncryptionPasswordProps {
  className?: string,
  errorMessage?: string,
  nextStep: () => void,
  onChangePassword: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  onChangeRepeatPassword: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  password: string,
  previousStep: () => void,
  repeatPassword: string,
}

/**
 * Step wallet encryption password UI component
 *
 * @export
 * @class WalletEncryptionPassword
 * @extends {React.Component<WalletEncryptionPasswordProps>}
 */
export default class WalletEncryptionPassword extends
  React.Component<WalletEncryptionPasswordProps> {
  /** render */
  public render() {
    const cardStyle = `${commonFormStepStyles.centered} ${this.props.className}`

    return (
      <NavigationCard
        className={cardStyle}
        title="Encrypt your wallet with a password"
        previousStep={this.props.previousStep}
        nextStep={this.props.nextStep}
      >
        <p className={stepStyles.text}>
          <strong>PLEASE NOTE:</strong> this password encrypts your Witnet wallet only on this
          computer. This is not your backup and you cannot restore your wallet with this password.
          Your seed phrase is still your ultimate backup.
        </p>
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
      </NavigationCard>
    )
  }
}
