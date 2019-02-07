import * as React from "react"

import { ButtonOption } from "app/renderer/ui/components/button"
import { CardDefault } from "app/renderer/ui/components/card"

const stepStyles = require("./style.scss")
const commonFormStepStyles = require("app/renderer/ui/components/walletForm/steps/style.scss")

export interface WalletAdvancedOptionsProps {
  className?: string,
  nextStep: {
    back: () => Promise<void>,
    importMnemonics: () => Promise<void>,
    importXprv: () => Promise<void>,
    newPrefilledSeed: () => Promise<void>,
    newSeed: () => Promise<void>,
    useHardwareDevice: () => Promise<void>,
  },
}

/**
 * UI component for selecting advanced wallet types
 *
 * @export
 * @class WalletAdvancedOptions
 * @extends {React.Component<WalletAdvancedOptionsProps>}
 */
export default class WalletAdvancedOptions extends React.Component<WalletAdvancedOptionsProps> {
  /** render */
  public render() {
    const cardStyle = `${commonFormStepStyles.centered} ${this.props.className}`

    return (
      <CardDefault className={cardStyle} title="Advanced wallet options">
        <p className={stepStyles.text}>
          You can import your own master key from a seed phrase, <em>xprv</em> string or hardware
          device.
        </p>
        <ul className={stepStyles.options}>
          <li>
            <ButtonOption onClick={this.props.nextStep.importMnemonics}>
              Import my own master key from a seed phrase
            </ButtonOption>
          </li>
          <li>
            <ButtonOption onClick={this.props.nextStep.importXprv} >
              Import my own master key from a xprv string
            </ButtonOption>
          </li>
          <li>
            <ButtonOption onClick={this.props.nextStep.useHardwareDevice}>
              Use a hardware device
            </ButtonOption>
          </li>
          <li>
            <ButtonOption onClick={this.props.nextStep.back}>
              Go back
            </ButtonOption>
          </li>
        </ul>
      </CardDefault>
    )
  }
}
