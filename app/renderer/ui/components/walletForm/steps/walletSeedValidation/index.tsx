import { NavigationCard } from "app/renderer/ui/components/card/index"
import { InputBig } from "app/renderer/ui/components/input/index"
import * as React from "react"

const commonFormStepStyles = require("app/renderer/ui/components/walletForm/steps/style.scss")

export interface WalletSeedValidationProps {
  className?: string,
  errorMessage?: string,
  inputValue: string,
  nextStep: any,
  onChangeInput?: any,
  paragraphs: Array<string>,
  previousStep: any,
  title: string,
}

/**
 * UI component to allow the user to insert a seed, both mnemonics or xprv
 *
 * @export
 * @class WalletSeedValidation
 * @extends {React.Component<WalletSeedValidationProps>}
 */
export default class WalletSeedValidation extends React.Component<WalletSeedValidationProps> {
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
