import * as React from "react"

import { CardNavigation } from "app/renderer/ui/components/card/index"
import { InputBig } from "app/renderer/ui/components/input/index"
import { AlertDefault } from "app/renderer/ui/components/alert"

const commonFormStepStyles = require("app/renderer/ui/components/walletForm/steps/style.scss")

export interface Iprops {
  className?: string
  title: string
  text: string
  inputValue: string
  errorMessage?: string
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
    const cardStyle = `${commonFormStepStyles.centered} ${this.props.className}`

    const alert = (
      <AlertDefault className={commonFormStepStyles["alert-grid"]}>
        <div className={commonFormStepStyles.alert}>
          <p className={commonFormStepStyles["alert-title"]}>Your seed is important!</p>
          <p className={commonFormStepStyles["alert-message"]}>
            If you lose your seed, your coins will be permanently lost.
          </p>
          <p className={commonFormStepStyles["alert-message"]}>
            To confirm that you have properly saved your seed, please retype it here.
          </p>
        </div>
      </AlertDefault>
    )

    return (
      <>
        <NavigationCard
          className={cardStyle}
          title={this.props.title}
          previousStep={this.props.previousStep}
          nextStep={this.props.nextStep}
        >
          <p>{this.props.text}</p>
          <InputBig
            className={commonFormStepStyles.seed}
            value={this.props.inputValue}
            onChange={this.props.onChangeInput}
          />
          <p className={commonFormStepStyles.error}>{this.props.errorMessage}</p>
        </NavigationCard>
      </>
    )
  }
}