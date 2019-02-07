import * as React from "react"

const styles = require("./Home.scss")

export default class Home extends React.Component {
  public render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
        </div>
      </div>
    )
  }
}
