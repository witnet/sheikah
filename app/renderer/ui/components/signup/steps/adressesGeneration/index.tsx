import * as React from "react"

import { CardDefault } from "app/renderer/ui/components/card"

const styles = require("./style.scss")

export interface Iprops {
  className: string
}

/**
 * Step address generation UI component
 *
 * @export
 * @class AddressGeneration
 * @extends {React.Component<Iprops>}
 */

export default class AddressGeneration extends React.Component<Iprops> {
  /** render */
  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    return (
      <CardDefault className={this.props.className} title="Address generation">
        <p className={styles.subtitle}>Sheikah is now generating your addresses</p>
        <p className={styles.text}>This will take a few seconds</p>
      </CardDefault>
    )
  }
}