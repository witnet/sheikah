import * as React from "react"

import AddressesGeneration from "./steps/adressesGeneration/index"
import WalletEncryptionPassword from "./steps/walletEncryptionPassword/index"
import WalletSeedBackup from "./steps/walletSeedBackup/index"
import WalletSeedConfirmation from "./steps/walletSeedConfirmation/index"
import WalletSeedTypeSelection from "./steps/walletSeedTypeSelection/index"
import Welcome from "./steps/welcome/index"

const styles = require("./style.scss")

/**
 * Singup component
 *
 * @export
 * @class Signup
 * @extends {React.Component}
 */
export default class Signup extends React.Component {

  /**
   * Local state for Singup component
   *
   * @memberof Signup
   */

  public state = {
    step: 1
  }

  /**
   * Method that update state adding 1 to current state
   *
   * @memberof Signup
   */

  public nextStep = () => {
    this.setState({
      step : this.state.step + 1
    })
  }

  /**
   * Method that update state substracting 1 to current state
   *
   * @memberof Signup
   */

  public previousStep = () => {
    this.setState({
      step: this.state.step - 1
    })
  }

  /**
   * Method that show signup step according to local state value
   *
   * @returns Step component
   * @memberof Signup
   */
  public showStep () {

    const enum steps {
      welcome = 1,
      walletSeedTypeSelection,
      walletSeedBackup,
      walletSeedConfirmation,
      walletEncryptionPassword,
      addressesGeneration
    }

    switch (this.state.step) {
      case steps.welcome:
        return <Welcome className={styles.centered} nextStep={this.nextStep}/>
      case steps.walletSeedTypeSelection:
        return <WalletSeedTypeSelection className={styles.centered} nextStep={this.nextStep} />
      case steps.walletSeedBackup:
        return (
          <WalletSeedBackup
            className={styles.centered}
            nextStep={this.nextStep}
            previousStep={this.previousStep}
          />)
      case steps.walletSeedConfirmation:
        return (
          <WalletSeedConfirmation
            className={styles.centered}
            nextStep={this.nextStep}
            previousStep={this.previousStep}
          />
        )
      case steps.walletEncryptionPassword:
        return (
          <WalletEncryptionPassword
            className={styles.centered}
            nextStep={this.nextStep}
            previousStep={this.previousStep}
          />
        )
      case steps.addressesGeneration:
        return <AddressesGeneration className={styles.centered} />
      default:
        return <Welcome className={styles.centered} nextStep={this.nextStep}/>
    }
  }

  /** render */
  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    return (
      <div className={styles.layout}>
        {this.showStep()}
      </div>
    )
  }
}