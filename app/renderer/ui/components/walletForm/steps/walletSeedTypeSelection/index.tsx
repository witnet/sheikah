import * as React from "react"

import { ButtonOption } from "app/renderer/ui/components/button"
import { CardDefault } from "app/renderer/ui/components/card"

const styles = require("./style.scss")

export interface Iprops {
  className?: string
  nextStep: {
    newSeed: () => Promise<void>,
    newPrefilledSeed: () => Promise<void>,
    importMnemonics: () => Promise<void>,
    importXprv: () => Promise<void>,
    useHardwareDevice: () => Promise<void>
  }
}

/**
 * Step walled seed type selection UI component
 *
 * @export
 * @class WalletSeedTypeSelection
 * @extends {React.Component<Iprops>}
 */
export default class WalletSeedTypeSelection extends React.Component<Iprops> {
  /** render */
  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {
    const cardStyle = `${styles.centered} ${this.props.className}`

    return (
      <CardDefault className={cardStyle} title="Wallet seed creation">
        <p className={styles.text}>
          Seeds are secret codes used to generate your credentials.
          Be very careful with them. If you ever give them away, say bye
          to your coins!
        </p>
        <ul className={styles.options}>
          <li>
            <ButtonOption
              className={styles.recommended}
              recommended={true}
              onClick={this.props.nextStep.newSeed}
            >
              Create a new seed
            </ButtonOption>
          </li>
          <li>
            <ButtonOption
              className={styles.recommended}
              recommended={true}
              onClick={this.props.nextStep.newPrefilledSeed}
            >
              Create a wallet prefilled with sample data
            </ButtonOption>
          </li>
          <li>
            <ButtonOption onClick={this.props.nextStep.importMnemonics}>
              Import my own seed
            </ButtonOption>
          </li>
          <li>
            <ButtonOption onClick={this.props.nextStep.importXprv} >
              Use a master key
            </ButtonOption>
          </li>
          <li>
            <ButtonOption onClick={this.props.nextStep.useHardwareDevice}>
              Use a hardware device
            </ButtonOption>
          </li>
        </ul>
      </CardDefault>
    )
  }
}