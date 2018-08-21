import * as React from "react"
import { Link } from "react-router-dom"
import { join } from "app/renderer/utils/list"
import { PathNameProp, TopBarLinkProps } from "app/renderer/ui/components/commonTypes"

const styles = require("./style.scss")

/**
 * TopBarLink component
 *
 * @export
 * @class TopBarLink
 * @extends {(React.Component<TopBarLinkProps & PathNameProp>)}
 */
export class TopBarLink extends React.Component<TopBarLinkProps & PathNameProp> {
  /**
   * Private method whick checks if current path and link match
   *
   * @readonly
   * @private
   * @memberof TopBarLink
   */
  private get active() {
    return this.props.pathName.indexOf(this.props.path) === 0 && styles.active
  }

  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {
    return (
      <Link className={join([styles["link-box"], this.active])} to={this.props.path} replace={true}>
        {this.props.caption}
      </Link>
    )
  }
}