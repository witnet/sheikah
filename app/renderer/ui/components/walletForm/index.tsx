import * as React from "react"

const styles = require("./style.scss")

/**
 * SingupPage component
 *
 * @export
 * @class Signup
 * @extends {React.Component}
 */
export class Signup extends React.Component {

  /** render */
  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {
    return (
      <div className={styles.layout}>
        <div className={styles.centered}>
          {this.props.children}
        </div>
      </div>
    )
  }
}