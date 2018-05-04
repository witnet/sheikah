import * as React from "react"
import { Link } from "react-router-dom"

const styles = require("./Home.scss")

/** Class Home */
export default class Home extends React.Component {
  /** render */
  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
        </div>
      </div>
    )
  }
}
