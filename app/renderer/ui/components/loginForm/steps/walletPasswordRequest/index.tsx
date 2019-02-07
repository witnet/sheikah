import * as React from "react"

import { AlertMessage } from "app/renderer/ui/components/alert"
import { ButtonNavigation } from "app/renderer/ui/components/button"
import { DefaultInput } from "app/renderer/ui/components/input"

const styles = require("./style.scss")

export interface WalletPasswordRequestProps {
  className?: any,
  errorMessage?: string,
  nextStep: (password: string) => void,
  prevStep: () => void,
}

/**
 * UI component prompting the user to set a wallet encryption password
 *
 * @export
 * @class WalletPasswordRequest
 * @extends {React.Component<WalletPasswordRequestProps>}
 */
export default class WalletPasswordRequest extends React.Component<WalletPasswordRequestProps> {
  /**
   * Local state to hold password
   * @type {{password: string}}
   */
  public state = {
    password: "",
  }

  /**
   * Method to store password in the local state
   * @param {React.FormEvent} event
   */
  private handlePassword = (event: React.FormEvent) => {
    this.setState({ password: (event.target as any).value })
  }

  /**
   * For the sake of accessibility, this event handler function captures Enter key pressing and
   * artificially calls nextStep just as if the Next button was clicked.
   */
  private handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13) {
      this.handlePassword(event)
      this.nextStep()
    }
  }

  /**
   * Method to move to the next step
   */
  private nextStep = () => { this.props.nextStep(this.state.password) }

  /**
   * Method to move to previous step
   */
  private prevStep = () => { this.props.prevStep() }

  public render() {
    return (
      <div className={styles.layout}>
        <div className={styles.content}>
          <p className={styles.text}>
            Please type here the password to unlock your wallet:
          </p>
          <DefaultInput
            className={styles.input}
            type="password"
            onChange={this.handlePassword}
            value={this.state.password}
            onKeyUp={this.handleKeyUp}
          />
          <AlertMessage
            className={styles.error}
            type="error"
            title="Error"
            description={this.props.errorMessage}
          />
        </div>
        <div className={styles.navigation}>
          <ButtonNavigation
            text="Cancel"
            onClick={this.prevStep}
          />
          <ButtonNavigation
            text="Unlock"
            onClick={this.nextStep}
          />
        </div>
      </div>
    )
  }
}
