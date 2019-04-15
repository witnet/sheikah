import * as React from "react"
import { RADRetrieveArgs, CreateDataRequestParams as RadRequest,
  RADAggregateArgs, RADConsensusArgs } from "../../../../../common/runtimeTypes/wallet"
import RadonScript from "../radonScript"
const style = require("./style.scss")

export interface RadonQueryState {
  retrieve: Array<RADRetrieveArgs>,
  aggregate: RADAggregateArgs,
  consensus: RADConsensusArgs,
}

export interface RadonQueryProps {
  className?: string,
  style?: string,
  request: RadRequest,
}

// TODO: Update this component to use radon script component that has to be implemented in #581
/**
 * RadonQuery UI component
 *
 *
 * @export
 * @class RadonQuery
 * @extends {React.Component<RadonQuery>}
 */
export default class RadonQuery extends React.Component<RadonQueryProps, RadonQueryState> {
  public renderRetrieve = () => {
    const createSourceElement = (source: any, index: number) => (
      <>
        <label>source: {index} </label>
        <input
          key={source.url}
          placeholder="url"
          value={source.url}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.updateSource(event, index)}>
        </input>
        <div>
          <p>Kind: </p>
          <p>
            {source.kind}
          </p>
          <p>Script: </p>
          <p>
            {source.script}
          </p>
        </div>
      </>
    )
    return this.state.retrieve.map((source, index) => createSourceElement(source, index + 1))
  }

  public updateSource = (event: React.ChangeEvent<HTMLInputElement>, sourceIndex: number) => {
    const retrieve = this.state.retrieve
    retrieve[sourceIndex].url = event.target.value
    this.setState({
      retrieve,
    })
  }

  public pushRetrieve = () => {
    const current = this.state.retrieve
    current.push({
      kind: "HTTP_GET",
      url: "",
      script: [0],
    })
    this.setState({
      retrieve: current,
    })
  }

  public renderAggregate = () => {
    const createAggregateElement = (source: any) => <p>Script: {source}</p>

    const element = this.state.aggregate.script.map(source => source)
    return createAggregateElement(element)
  }

  public renderConsensus = () => {
    const createConsensusElement = (source: any) => <p>Script: {source}</p>
    const element = this.state.consensus.script.map(source => source)
    return createConsensusElement(element)
  }

  public constructor(props: RadonQueryProps) {
    super(props)
    this.state = {
      retrieve: this.props.request.retrieve,
      aggregate: this.props.request.aggregate,
      consensus: this.props.request.consensus,
    }
  }
  public render() {
    return (
      <>
        <section className={style.section}>
          <div className={style.column}>
            <h1>Request</h1>
          </div>
          <div className={style.column}>
            {this.renderRetrieve()}
          </div>
          <div className={style.column}>
            <button onClick={this.pushRetrieve} >add source</button>
          </div>
        </section>
        <br></br>

        <section className={style.section}>
          <div className={style.column}>
            <h1>Aggregate</h1>
          </div>
          <div className={style.column}>
            <RadonScript radonScript={["ARRAY_FILTER", "ARRAY_GET"]} />
          </div>
        </section>
        <br></br>

        <section className={style.section}>
          <div className={style.column}>
            <h1>Consensus</h1>
          </div>
          <div className={style.column}>
            {this.renderConsensus()}
          </div>
        </section>

        <section className={style.section}>
          <div className={style.column}>
            <h1>Deliver</h1>
          </div>
          <div className={style.column}>
            <input placeholder="url"></input>
          </div>
        </section>
      </>
    )
  }
}
