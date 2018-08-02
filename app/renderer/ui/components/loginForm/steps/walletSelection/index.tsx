import * as React from "react"

import { ButtonOption } from "app/renderer/ui/components/button"
import { Wallets } from "app/common/runtimeTypes/storage/wallets"

const styles = require("./style.scss")

export interface Iprops {
  className?: any
  wallets: Wallets
  nextStep: (id: string) => void
  newWallet: () => void
}

/**
 * Step wallet selection UI component
 *
 * @export
 * @class WalletSelection
 * @extends {React.Component<Iprops>}
 */

export default class WalletSelection extends React.Component<Iprops> {

  /**
   * Method that calls next step function inside props
   */
  private nextStep = (id: string) => () => { this.props.nextStep(id) }

  /**
   * Method to render links to wallets
   */
  private linksRender = () => {
    return this.props.wallets.infos.map((wallet) => {
      return (
        <ButtonOption
          key={wallet.id}
          className={`${styles.link} ${styles.listItem}`}
          secondaryText=">"
          onClick={this.nextStep(wallet.id)}
        >
          {wallet.caption}
        </ButtonOption>)
    })
  }

  /** render */
  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    return (
      <div className={styles.content}>
        <p className={styles.text}>
          Select which wallet you want to unlock:
        </p>
        <div className={styles.links}>
          {this.linksRender()}
        </div>
        <ButtonOption
          className={styles.link}
          secondaryText=">"
          onClick={this.props.newWallet}
        >
          Create, import or recover a wallet
        </ButtonOption>
      </div>
    )
  }
}
