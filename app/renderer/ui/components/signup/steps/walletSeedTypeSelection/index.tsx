import * as React from "react"

import { ButtonOption } from "../../../button/index"
import { CardDefault } from "../../../card/index"

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
  // tslint:disable-next-line:prefer-function-over-method
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
            text="Create a new seed"
            secondaryText="RECOMMENDED"
            onClick={this.props.nextStep}
          />
        </div>
        <div>
          <ButtonOption text="I already have a seed" onClick={this.props.nextStep} />
        </div>
        <div>
          <ButtonOption text="Use a master key" onClick={this.props.nextStep} />
        </div>
        <div>
          <ButtonOption text="Use a hardware device" onClick={this.props.nextStep} />
        </div>
      </CardDefault>
    )
  }
}
