import * as React from "react"

import { CardNavigation } from "app/renderer/ui/components/card"
import { AlertDefault } from "app/renderer/ui/components/alert"

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
        <CardNavigation
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
        </CardNavigation>
        <AlertDefault className={commonFormStepStyles["alert-grid"]}>
          <div className={commonFormStepStyles.alert}>
            <p className={commonFormStepStyles["alert-title"]}>Remember!</p>
            <ul>
              <li>Never disclose your seed.</li>
              <li>Never type on a website</li>
              <li>Do not store electronically</li>
            </ul>
          </div>
        </AlertDefault>
      </>
    )
  }
}
