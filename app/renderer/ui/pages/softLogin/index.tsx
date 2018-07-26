import * as React from "react"
import WalletSelection from "./steps/walletSelection"
import WalletPasswordRequest from "./steps/walletPasswordRequest"
import WalletUnlockInProgress from "./steps/walletUnlockInProgress"
import { DispatchProps, StateProps } from "app/renderer/ui/containers/SoftLoginPage"

const styles = require("./style.scss")

// Steps in the soft login page
enum Step {
  walletSelection,
  walletPasswordRequest,
  walletUnlockInProgress,
}

/**
 * SoftLoginPage component
 *
 * @export
 * @class SoftLoginPage
 * @extends {React.Component}
 */
export class SoftLogin extends React.Component<StateProps & DispatchProps> {
  /**
   * Method to get current step from state
   * @returns {any}
   */
  private getStepFromState = (): Step => {
    // Check if unlock is in progress
    if (("unlockInProgress" in this.props.loginForm) && (this.props.loginForm.unlockInProgress)) {
      return Step.walletUnlockInProgress
    }

    // Check if there is no password
    if ("id" in this.props.loginForm) {
      return Step.walletPasswordRequest
    }

    // Default case
    return Step.walletSelection
  }

  /**
   * Method to go to request password step
   * @param {string} id
   */
  private requestPassword = (id: string) => {
    // Set id in the state
    this.props.actions.setId(id)
  }

  /**
   * Method to go to wallet selection step
   */
  private selectWallet = () => {
    // Delete id, password and unlock in progress from the state
    this.props.actions.deleteId()
    this.props.actions.deletePassword()
    this.props.actions.deleteUnlockInProgress()
  }

  /**
   * Method to go to unlock wallet step
   * @param {string} password
   */
  private unlockWallet = (password: string) => {
    // Set password in the state
    this.props.actions.setPassword(password)

    // Set unlock progress in the state
    this.props.actions.setUnlockInProgress(true)

    // Try to unlock wallet
    this.props.actions.unlockWallet(this.props.loginForm.id,
      this.props.loginForm.password)
      .then(this.selectWallet)
      .catch(this.selectWallet)
  }

  /**
   * Method that show soft login step according to state derived from store
   *
   * @returns Step component
   * @memberof Signup
   */
  public showStep() {

    // Get current state (from the information in the store)
    const step = this.getStepFromState()

    switch (step) {
      case Step.walletSelection:
        return (
          <WalletSelection
            className={styles.centered}
            wallets={this.props.wallets}
            nextStep={this.requestPassword}
          />)
      case Step.walletPasswordRequest:
        return (
          <WalletPasswordRequest
            className={styles.centered}
            prevStep={this.selectWallet}
            nextStep={this.unlockWallet}
          />)
      case Step.walletUnlockInProgress:
        return (
          <WalletUnlockInProgress
            className={styles.centered}
          />)
      default:
        return (
          <WalletSelection
            className={styles.centered}
            wallets={this.props.wallets}
            nextStep={this.requestPassword}
          />
        )
    }
  }

  /** render */
  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {
    return (
      <div className={styles.layout}>
        <div className={styles.centered}>
          <div className={styles.sidebar}>
            <p className={styles.titleText}>Welcome back</p>
            <div className={styles.settings}>
              <i className={`fa fa-cog ${styles.icon}`} />
              <span className={styles.label}>App Settings</span>
            </div>
          </div>
          {this.showStep()}
        </div>
      </div>
    )
  }
}