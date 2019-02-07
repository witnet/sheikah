import * as React from "react"

import { ButtonOption } from "app/renderer/ui/components/button"
import { CardDefault } from "app/renderer/ui/components/card"

const stepStyles = require("./style.scss")
const commonFormStepStyles = require("app/renderer/ui/components/walletForm/steps/style.scss")

export interface WalletSeedTypeSelectionProps {
  className?: string,
  nextStep: {
    advancedOptions: () => Promise<void>,
    back: () => Promise<void>,
    newPrefilledSeed: () => Promise<void>,
    newSeed: () => Promise<void>,
  },
}

/**
 * Step walled seed type selection UI component
 *
 * @export
 * @class WalletSeedTypeSelection
 * @extends {React.Component<WalletSeedTypeSelectionProps>}
 */
export default class WalletSeedTypeSelection extends React.Component<WalletSeedTypeSelectionProps> {
  /** render */
  public render() {
    const cardStyle = `${commonFormStepStyles.centered} ${this.props.className}`

    return (
      <CardDefault className={cardStyle} title="Create your wallet">
        <p className={stepStyles.text}>
          We will now help you create a new local wallet.
        </p>
        <ul className={stepStyles.options}>
          <li>
            <ButtonOption
              recommended={true}
              onClick={this.props.nextStep.newSeed}
              secondaryText="RECOMMENDED"
            >
              Create new seed phrase
            </ButtonOption>
          </li>
          <li>
            <ButtonOption
              recommended={true}
              onClick={this.props.nextStep.newPrefilledSeed}
              secondaryText="RECOMMENDED"
            >
              Create a wallet prefilled with sample data
            </ButtonOption>
          </li>
          <li>
            <ButtonOption onClick={this.props.nextStep.advancedOptions}>
              Import and advanced options
            </ButtonOption>
          </li>
          <li>
            <ButtonOption onClick={this.props.nextStep.back}>
              Cancel
            </ButtonOption>
          </li>
        </ul>
      </CardDefault>
    )
  }
}
