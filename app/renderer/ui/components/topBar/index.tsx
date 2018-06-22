import * as React from "react"

import { Link } from "react-router-dom"

const styles = require("./style.scss")

export interface Iprops {
  className?: string
  links: {text: string, link: string}[]
}

/**
 * topBar UI component
 *
 * @export
 * @class TopBar
 * @extends {React.Component<Iprops>}
 */

export default class TopBar extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs
  public render() {
    const links = this.props.links
      .map((item) => (
          <Link className={styles.link}  key={item.text} to={item.link}>
            <div className={styles["link-box"]}>
              {item.text}
            </div>
          </Link>
        )
      )

    return (
      <div className={`${styles["top-bar"]} ${this.props.className}`}>
        {links}
      </div>
    )
  }
}