import * as React from "react"

const styles = require("./style.scss")

/**
 * Message function for to invoke toast
 *
 * @export
 * @returns
 */
export default function UnimplementedMessage() {
  return (
    <p className={styles.text}>
      <span className={styles.bold}>Oops!</span> This feature is not yet implemented. ETA is 2019 Q1
    </p>
  )
}

export { UnimplementedMessage }
