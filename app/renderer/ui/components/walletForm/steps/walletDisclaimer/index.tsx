import NavigationCard from "app/renderer/ui/components/card/navigation"
import * as React from "react"

const commonFormStepStyles = require("app/renderer/ui/components/walletForm/steps/style.scss")

export interface WalletSeedDisclaimerProps {
  className?: string,
  nextStep: () => void,
  previousStep: () => void,
}

/**
 * UI component that shows a disclaimer screen before creating seed phrases.
 *
 * @export
 * @class WalletSeedDisclaimer
 * @extends {React.Component<WalletSeedDisclaimerProps>}
 */
export default class WalletSeedDisclaimer extends React.Component<WalletSeedDisclaimerProps> {
  /**
   * All styles to be applied to this component.
   */
  private cardStyle = `${commonFormStepStyles.centered} ${this.props.className}`

  public render() {
    return (
      <NavigationCard
        className={this.cardStyle}
        title="IMPORTANT"
        previousStep={this.props.previousStep}
        nextStep={this.props.nextStep}
        nextText="I will be careful, I promise!"
      >
        <p>
          You will be shown a 12 word seed phrase. This seed phrase is very important. If you are
          ever locked out of your wallet or lose access for any reason, you can regain access to
          your wallet again from any computer using your seed phrase.
        </p>
        <p>
          You should never share your seed phrase with anyone. We at Witnet do not store your seed
          phrase and will never ask you to share it with us. If you lose your seed phrase, you will
          permanently lose access to your wallet and your funds.
        </p>
        <p>
          If someone finds or sees your seed phrase, they will have access to your wallet and all
          of your funds.
        </p>
        <p>
          We recommend storing your seed phrase on paper somewhere safe. Do not store it in a file
          on your computer or anywhere electronically.
        </p>
      </NavigationCard>
    )
  }
}
