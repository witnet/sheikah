import * as React from "react"

const style = require("./style.scss")

export interface RadonQueryProps {
  className?: string,
  style?: string,
}

/**
 * RadonQuery UI component
 *
 * @export
 * @class RadonQuery
 * @extends {React.Component<RadonQuery>}
 */

export default class RadonQuery extends React.Component<RadonQueryProps> {
  public render() {
    return (
      <div>
        <section className={style.section}>
          <div className={style.column}>
            <h1>Request</h1>
          </div>
          <div className={style.column}>
            <input placeholder="url"></input>
          </div>
          <div className={style.column}>
            <button>add source</button>
          </div>
        </section>
        <br></br>

        <section className={style.section}>
          <div className={style.column}>
            <h1>Aggregate</h1>
          </div>
          <div className={style.column}>

          </div>
        </section>
        <br></br>

        <section className={style.section}>
          <div className={style.column}>
            <h1>Deliver</h1>
          </div>
          <div className={style.column}>
            <input placeholder="url"></input>
          </div>
        </section>
      </div>
    )
  }
}
  