import * as React from "react"

import { Button } from "app/renderer/ui/components/button"
import { WalletInfos } from "app/common/runtimeTypes/storage/wallets"

const styles = require("./style.scss")

export interface WalletSelectionProps {
  className?: any,
  newWallet: () => void,
  nextStep: (id: string) => void,
  walletInfos: WalletInfos,
}

/**
 * UI component prompting the user to select which wallet to unlock
 *
 * @export
 * @class WalletSelection
 * @extends {React.Component<WalletSelectionProps>}
 */

export default class WalletSelection extends React.Component<WalletSelectionProps> {
  /**
   * Method that calls next step function inside props
   */
  private nextStep = (id: string) => () => { this.props.nextStep(id) }

  /**
   * Method to render links to wallets
   */
  private linksRender = () => {
    return this.props.walletInfos.infos.map((walletInfo) => {
      return (
        <Button
          type="option"
          key={walletInfo.id}
          className={`${styles.link} ${styles.listItem}`}
          secondaryText=">"
          onClick={this.nextStep(walletInfo.id)}
        >
          {walletInfo.caption}
        </Button>)
    })
  }

  public render() {
    return (
      <div className={styles.content}>
        <p className={styles.text}>
          Select which wallet you want to unlock:
        </p>
        <div className={styles.links}>
          {this.linksRender()}
        </div>
        <Button
          type="option"
          className={styles.link}
          secondaryText=">"
          onClick={this.props.newWallet}
        >
          Create, import or recover a wallet
        </Button>
      </div>
    )
  }
}
