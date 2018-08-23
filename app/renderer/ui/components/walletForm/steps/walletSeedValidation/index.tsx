import { NavigationCard } from "app/renderer/ui/components/card/index"
import { InputBig } from "app/renderer/ui/components/input/index"
import * as React from "react"

const commonFormStepStyles = require("app/renderer/ui/components/walletForm/steps/style.scss")

export interface Iprops {
  className?: string
  title: string
  paragraphs: Array<string>
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

    return (
      <>
        <NavigationCard
          className={cardStyle}
          title={this.props.title}
          previousStep={this.props.previousStep}
          nextStep={this.props.nextStep}
        >
          {this.props.paragraphs.map((text, i) => <p key={i}>{text}</p>)}
          <InputBig
            className={`${commonFormStepStyles.seed} pre-alike`}
            value={this.props.inputValue}
            onChange={this.props.onChangeInput}
          />
          <p>
            Please ensure you do not add any extra spaces between words or at the beginning or end
            of the phrase.
          </p>
          <p className={commonFormStepStyles.error}>{this.props.errorMessage}</p>
        </NavigationCard>
      </>
    )
  }
}