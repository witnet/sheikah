import * as React from "react"

import { CardNavigation } from "app/renderer/ui/components/card"
import InputDefault from "app/renderer/ui/components/input/default"

const styles = require("./style.scss")

export interface Iprops {
  className?: any
  prevStep: () => void
  nextStep: (password: string) => void
}

/**
 * Step walled password request UI component
 *
 * @export
 * @class WalletPasswordRequest
 * @extends {React.Component<Iprops>}
 */
export default class WalletPasswordRequest extends React.Component<Iprops> {
  /**
   * Local state to hold password
   * @type {{password: string}}
   */
  public state = {
    password: ""
  }

  /**
   * Method to store password in the local state
   * @param {React.FormEvent} event
   */
  private handlePassword = (event: React.FormEvent) => {
    this.setState({ password: (event.target as any).value })
  }

  /**
   * Method to move to the next step
   */
  private nextStep = () => { this.props.nextStep(this.state.password) }

  /**
   * Method to move to previous step
   */
  private prevStep = () => { this.props.prevStep() }

  /** render */
  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    return (
      <>
        <CardNavigation
          className={styles.step}
          previousStep={this.prevStep}
          nextStep={this.nextStep}
          backText="Cancel"
          nextText="Unlock"
        >
          <p>Please type here the password to unlock your wallet:</p>
          <InputDefault
            type="password"
            onBlur={this.handlePassword}
          />
        </CardNavigation>
      </>
    )
  }
}