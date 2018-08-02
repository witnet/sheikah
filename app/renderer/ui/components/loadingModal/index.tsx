import * as React from "react"
import Spinner from "app/renderer/ui/components/spinner"

const styles = require("./style.scss")

export interface Iprops {
  active: boolean
  title: string
  description: string
}

/**
 * Loading modal component with a title and description
 *
 * @export
 * @class LoadingModal
 * @extends {React.Component}
 */
export class LoadingModal extends React.Component<Iprops> {
  /** render */
  public render() {
    const style = this.props.active ? "" : "hidden"

    return (
      <div className={`${styles.modal} ${styles[style]}`}>
        <p className={styles.title}>{this.props.title}</p>
        <Spinner className={styles.spinner} active={true} />
        <p className={styles.description}>{this.props.description}</p>
      </div>
    )
  }
}