import * as React from "react"

export interface Iprops {
  className?: string
}

/**
 * Wallet UI component
 *
 * @export
 * @class Wallet
 * @extends {React.Component<Iprops>}
 */

export default class Wallet extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs
/*
  status?: string
  amount?: string
  receiver?: boolean
  address?: string
   */
  public render() {
    return (
      <div className={this.props.className}>
        Wallet
      </div>
    )
  }
}