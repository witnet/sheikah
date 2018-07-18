import * as React from "react"

import { ButtonOption } from "app/renderer/ui/components/button"
import { CardDefault } from "app/renderer/ui/components/card"

const styles = require("./style.scss")

export interface Iprops {
  nextStep: any
  className: any
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
    return(
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
            onClick={this.props.nextStep}
          >
            Create a new seed
          </ButtonOption>
        </div>
        <div>
          <ButtonOption onClick={this.props.nextStep}>
            I already have a seed
          </ButtonOption>
        </div>
        <div>
          <ButtonOption onClick={this.props.nextStep} >
            Use a master key
          </ButtonOption>
        </div>
        <div>
          <ButtonOption onClick={this.props.nextStep} >
            Use a hardware device
          </ButtonOption>
        </div>
      </CardDefault>
    )
  }
}
