import * as React from "react"

import { ButtonLink } from "app/renderer/ui/components/button"
import { CardDefault } from "app/renderer/ui/components/card"

const stepStyles = require("./style.scss")
const commonFormStepStyles = require("app/renderer/ui/components/walletForm/steps/style.scss")

export interface Iprops {
  className?: string
  nextStep: () => void
}

/**
 * Step welcome UI component
 *
 * @export
 * @class Welcome
 * @extends {React.Component<Iprops>}
 */
export default class Welcome extends React.Component<Iprops> {
  /** render */
  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    const cardStyle = `${commonFormStepStyles.centered} ${this.props.className}`

    return (
      <CardDefault className={cardStyle} style={{ width: 513 }}title="Hey, listen!">
        <p className={stepStyles.subtitle}>
          This assistant will guide you through the process of creating your own Witnet wallet.
        </p>
        <p className={stepStyles.text}>
          A wallet is an app that keeps your credentials safe and lets you interface with the
          Witnet blockchain in many ways: from transferring Wit to someone else to creating
          smart contracts.
        </p>
        <div className={stepStyles.link}>
          <ButtonLink onClick={this.props.nextStep}>Let's do this!</ButtonLink>
        </div>
      </CardDefault>
    )
  }
}