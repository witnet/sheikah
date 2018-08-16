import * as React from "react"

import { ButtonOption } from "app/renderer/ui/components/button"
import { CardDefault } from "app/renderer/ui/components/card"

const styles = require("./style.scss")

export interface Iprops {
  className?: string
  nextStep: {
    newSeed: () => Promise<void>,
    newPrefilledSeed: () => Promise<void>
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
    return (
      <CardDefault className={this.props.className} title="Wallet seed creation">
        <p className={styles.text}>
          Seeds are secret codes used to generate your credentials.
          Be very careful with them. If you ever give them away, say bye
          to your coins!
        </p>
        <div>
          <ButtonOption
            className={styles.recommended}
            secondaryText="RECOMMENDED"
            onClick={this.props.nextStep.newSeed}
          >
            Create a new seed
          </ButtonOption>
        </div>
        <div>
          <ButtonOption
            className={styles.recommended}
            secondaryText="RECOMMENDED"
            onClick={this.props.nextStep.newPrefilledSeed}
          >
            Create a wallet prefilled with sample data
          </ButtonOption>
        </div>
        <div>
          <ButtonOption onClick={this.props.nextStep.newSeed}>
            Import my own seed
          </ButtonOption>
        </div>
        <div>
          <ButtonOption onClick={this.props.nextStep.newSeed} >
            Use a master key
          </ButtonOption>
        </div>
        <div>
          <ButtonOption onClick={this.props.nextStep.newSeed} >
            Use a hardware device
          </ButtonOption>
        </div>
      </CardDefault>
    )
  }
}