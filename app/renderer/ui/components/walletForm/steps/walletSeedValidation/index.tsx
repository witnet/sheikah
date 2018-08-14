import * as React from "react"

import { CardNavigation } from "app/renderer/ui/components/card/index"
import { InputBig } from "app/renderer/ui/components/input/index"

const styles = require("./style.scss")

export interface Iprops {
  className?: string
  title: string
  text: string
  inputValue: string
  errorMessage?: string
  alertNode?: React.ReactNode
  nextStep: any
  previousStep: any
  onChangeInput?: any
}

/**
 * UI component to allow the user to insert a seed, both mnemonics or xprv
 *
 * @export
 * @class WalletSeedValidation
 * @extends {React.Component<Iprops>}
 */
export default class WalletSeedValidation extends React.Component<Iprops> {
  /** render */
  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    return (
      <>
        <CardNavigation
          className={this.props.className}
          title={this.props.title}
          previousStep={this.props.previousStep}
          nextStep={this.props.nextStep}
        >
          <p>{this.props.text}</p>
          <InputBig
            className={styles.seed}
            value={this.props.inputValue}
            onChange={this.props.onChangeInput}
          />
          <p className={styles.error}>{this.props.errorMessage}</p>
        </CardNavigation>
        {this.props.alertNode}
      </>
    )
  }
}