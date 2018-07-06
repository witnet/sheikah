import * as React from "react"
import { RouteComponentProps } from "react-router"
import { Link } from "react-router-dom"
import * as _ from "lodash"
const styles = require("./Counter.scss")

export interface IProps extends RouteComponentProps<any> {
  increment(): void,
  incrementIfOdd(): void,
  incrementAsync(): void,
  decrement(): void,
  counter: number
}

/**
 * Class counter
 */
export class Counter extends React.Component<IProps> {

  /** render */
  public render() {
    const { increment, incrementIfOdd, incrementAsync,
      decrement, counter } = this.props
    const incAsync = () => _.curry(incrementAsync)()

    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div className={`counter ${styles.counter}`} data-tid="counter">
          {counter}
        </div>
        <div className={styles.btnGroup}>
          <button className={styles.btn} onClick={increment} data-tclass="btn">
            <i className="fa fa-plus" />
          </button>
          <button className={styles.btn} onClick={decrement} data-tclass="btn">
            <i className="fa fa-minus" />
          </button>
          <button
            className={styles.btn}
            onClick={incrementIfOdd}
            data-tclass="btn"
          >
            odd
          </button>
          {/* tslint:disable-next-line: no-unnecessary-callback-wrapper no-void-expression */}
          <button
            className={styles.btn}
            onClick={incAsync}
            data-tclass="btn"
          >
            async
          </button>
        </div>
      </div>
    )
  }
}

export default Counter
