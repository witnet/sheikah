import * as React from "react"
import Spinner from "app/renderer/ui/components/spinner"

const styles = require("./style.scss")

interface Props {
  spinner: boolean
}

/**
 * WalletForm component
 *
 * @export
 * @class WalletForm
 * @extends {React.Component}
 */
export class WalletForm extends React.Component<Props> {

  /** render */
  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {
    return (
      <div className={styles.layout}>
        <Spinner className={styles.spinner} active={this.props.spinner} />
        {this.props.children}
      </div>
    )
  }
}