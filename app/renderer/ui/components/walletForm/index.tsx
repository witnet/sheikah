import * as React from "react"
import Spinner from "app/renderer/ui/components/spinner"

const styles = require("./style.scss")

interface Props {
  spinner: boolean,
}

/**
 * WalletForm component
 *
 * @export
 * @class WalletForm
 * @extends {React.Component}
 */
export class WalletForm extends React.Component<Props> {
  public render() {
    return (
      <div className={styles.layout}>
        <Spinner className={styles.spinner} active={this.props.spinner} />
        {this.props.children}
      </div>
    )
  }
}
