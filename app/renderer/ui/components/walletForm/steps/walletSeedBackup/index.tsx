import { NavigationCard } from "app/renderer/ui/components/card"
import * as React from "react"

const commonFormStepStyles = require("app/renderer/ui/components/walletForm/steps/style.scss")

export interface Iprops {
  className?: string
  mnemonics: string,
  nextStep: () => void
  previousStep: () => void
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
    const cardStyle = `${commonFormStepStyles.centered} ${this.props.className}`

    return (
      <>
        <NavigationCard
          className={cardStyle}
          title="Wallet seed creation"
          previousStep={this.props.previousStep}
          nextStep={this.props.nextStep}
        >
          <p>Your wallet seed secret code is:</p>
          <div className={commonFormStepStyles.seed}>
            <p className={commonFormStepStyles.mnemonics}>{this.props.mnemonics}</p>
          </div>
          <p>
            Please save this 12 words on paper (order is important). This seed will allow you to
            recover your wallet in case of computer failure.
          </p>
        </NavigationCard>
      </>
    )
  }
}
