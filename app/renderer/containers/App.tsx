import * as React from "react"

/** Class App */
export default class App extends React.Component {
  /** render */
  public render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
