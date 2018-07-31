import * as React from "react"

const styles = require("./style.scss")

/**
 * SoftLogin component
 *
 * @export
 * @class SoftLogin
 * @extends {React.Component}
 */
export class LoginForm extends React.Component {
  /** render */
  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {
    return (
      <div className={styles.layout}>
        <div className={styles.centered}>
          <div className={styles.sidebar}>
            <p className={styles.titleText}>Welcome back</p>
            <div className={styles.settings}>
              <i className={`fa fa-cog ${styles.icon}`} />
              <span className={styles.label}>App Settings</span>
            </div>
          </div>
          {this.props.children}
        </div>
      </div>
    )
  }
}