import { NavigationCard } from "app/renderer/ui/components/card"
import * as React from "react"

const commonFormStepStyles = require("app/renderer/ui/components/walletForm/steps/style.scss")

export interface WalletSeedBackupProps {
  className?: string,
  mnemonics: string,
  nextStep: () => void,
  previousStep: () => void,
}

/**
 * Step wallet seedd backup UI component
 *
 * @export
 * @class WalletSeedBackup
 * @extends {React.Component<WalletSeedBackupProps>}
 */

export default class WalletSeedBackup extends React.Component<WalletSeedBackupProps> {
  public render() {
    const cardStyle = `${commonFormStepStyles.centered} ${this.props.className}`

    return (
      <>
        <NavigationCard
          className={cardStyle}
          title="Wallet seed phrase backup"
          previousStep={this.props.previousStep}
          nextStep={this.props.nextStep}
        >
          <p>Your 12 word seed phrase:</p>
          <pre className={commonFormStepStyles.seed}>
            {`${this.props.mnemonics.split(" ").slice(0, 6).join(" ")} \n`}
            {this.props.mnemonics.split(" ").slice(6).join(" ")}
          </pre>
          <p>
            Please copy these 12 words onto a piece of paper which you will be able to safely store
            and secure. You must write the complete words in the exact order they are presented to
            you.
          </p>
          <p>
            We do not store your seed phrase - if you exit this setup or fail to write down your
            seed phrase, we cannot help you access your wallet.
          </p>
        </NavigationCard>
      </>
    )
  }
}
