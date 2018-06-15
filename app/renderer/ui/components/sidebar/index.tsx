import * as React from "react"
import { Link } from 'react-router-dom'

const styles = require("./style.scss")

export interface Iprops {
  className?: string
}

/**
 * Sidebar UI component
 *
 * @export
 * @class Sidebar
 * @extends {React.Component<Iprops>}
 */

export default class Sidebar extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs
  public render() {
    return (
      <div className={`${this.props.className} ${styles.sidebar}`}>
        <div className={styles.brand}>
          <i className={`fa fa-bullseye ${styles.logo}`}></i>
          <span className={styles.name}>Sheikah</span>
          <span className={styles.label}>[TECHNOLOGY PREVIEW]</span>
        </div>
        <div className={styles["current-wallet"]}>
          My hot wallet
        </div>
        <div className={styles["link-list"]}>
          <Link to="/home/wallet">
            <div className={`${styles.link} ${styles.active}`}>
              <i className="fa fa-cog"></i>
              <span className={styles["option-icon"]}>Wallet</span>
            </div>
          </Link>
          <Link to="/home/smart-contracts">
            <div className={styles.link}>
              <i className="fa fa-file"></i>
              <span className={styles["option-icon"]}>Smart contracts</span>
            </div>
          </Link>
          <Link to="/home/attestations">
            <div className={styles.link}>
              <i className="fa fa-eye"></i>
              <span className={styles["option-icon"]}>Attestations</span>
            </div>
          </Link>
          <Link to="/home/block-explorer">
            <div className={styles.link}>
              <i className="fa fa-square"></i>
              <span className={styles["option-icon"]}>Block explorer</span>
            </div>
          </Link>
          <Link to="/home/community">
            <div className={styles.link}>
              <i className="fa fa-building"></i>
              <span className={styles["option-icon"]}>Community</span>
            </div>
          </Link>
        </div>
        <div className={styles.settings}>
          <i className={`fa fa-cog ${styles["settings-icon"]}`}></i>

          <div className={styles["net-status"]}>
            <span className={styles.mainnet}>MAINNET</span>
            <span className={styles.synced}>SYNCED</span>
            <i className={`fa fa-circle ${styles.status}`}></i>
          </div>
        </div>
      </div>
    )
  }
}