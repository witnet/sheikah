import * as React from "react"

import { ButtonOption } from "app/renderer/ui/components/button"
import { CardDefault } from "app/renderer/ui/components/card"
import { Wallets } from "app/common/runtimeTypes/storage/wallets"

const styles = require("./style.scss")

export interface Iprops {
  className?: any
  wallets: Wallets
  nextStep: (id: string) => void
}

/**
 * Step welcome UI component
 *
 * @export
 * @class Welcome
 * @extends {React.Component<Iprops>}
 */

export default class WalletSelection extends React.Component<Iprops> {
  /** render */
  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    return (
      <CardDefault className={styles.step}>
        <p className={styles.text}>
          Select which wallet you want to unlock:
        </p>
        <div className={styles.links}>
          {linksRender(this.props)}
        </div>
        <ButtonOption
          className={styles.link}
          secondaryText=">"
          onClick={this.props.nextStep}
        >
          Create, import or recover a wallet
        </ButtonOption>
      </CardDefault>
    )
  }
}

// Function that calls next step function inside props
const nextStep = (props: Iprops, id: string) => () => { props.nextStep(id) }

// Function to render links to wallets
const linksRender = (props: Iprops) => {
  return props.wallets.map((wallet) => {
    return (
      <ButtonOption
        key={wallet.id}
        className={`${styles.link} ${styles.highlighted}`}
        secondaryText=">"
        onClick={nextStep(props, wallet.id)}
      >
        {wallet.caption}
      </ButtonOption>)
  })
}