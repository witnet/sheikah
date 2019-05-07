import * as React from "react"
import {
  RADRetrieveArgs,
  RADAggregateArgs,
  RADConsensusArgs,
} from "../../../../../common/runtimeTypes/wallet"

import { RadonScript } from "../../radonScript"
import {
  TYPES as RadonTypes,
  OPERATOR_INFOS as RadonOperatorInfos,
  HashFunctionCodes,
  ReducingFunctionCodes,
} from "../../../../radon"
import { match } from "app/renderer/utils/match"

const style = require("./style.scss")

export interface RadonQueryState {
  "retrieve": Array<RADRetrieveArgs>,
  "aggregate": RADAggregateArgs,
  "consensus": RADConsensusArgs,
}

export interface RadonQueryProps {
  className?: string,
  style?: string,
  request: {
    notBefore: number,
    retrieve: Array<{
      kind: string,
      url: string,
      script: Array<any>
    }>,
    aggregate: {
      script: Array<any>,
    },
    consensus: {
      script: Array<any>
    },
    deliver: Array<{
      kind: string,
      url: string,
    }>
  },
}

/**
 * RadonQuery UI component
 *
 * @export
 * @class RadonQuery
 * @extends {React.Component<RadonQuery>}
 */
export default class RadonQuery extends React.Component<RadonQueryProps, RadonQueryState> {
  public renderRetrieve = () => {
    const createSourceElement = (source: RADRetrieveArgs, index: number) => {
      return (
        <div className={style.column}>
          <label>source: {index} </label>
          <input
            placeholder="url"
            value={source.url}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.updateSource(event.target.value, index)}>
          </input>
          <div>
            <p>Kind: </p>
            <p>
              {source.kind}
            </p>

            <RadonScript
              path={{ stage: "retrieve", retrieveIndex: index }}
              radonScript={source.script}
              selectHashFunction={this.selectHashFunction}
              updateArgumentInput={this.updateArgumentInput}
              updateFilterArgument={this.updateFilterArgument}
              updateOperatorCodeSelect={this.updateOperatorCodeSelect}
              updateOperatorFilterArgument={this.updateOperatorFilterArgument}
              updateOperatorReduceArgument={this.updateOperatorReduceArgument}
            />
          </div>
        </div>
      )
    }

    return this.state.retrieve.map((source, index) => createSourceElement(source, index))
  }

  public updateSource = (url: string, sourceIndex: number) => {
    const retrieve = this.state.retrieve
    retrieve[sourceIndex].url = url
    this.setState({
      retrieve,
    })
  }

  public pushRetrieve = () => {
    const current = this.state.retrieve
    current.push({
      kind: "HTTP_GET",
      url: "",
      script: [],
    })
    this.setState({
      retrieve: current,
    })
  }

  public renderAggregate = () => {
    return (
      <div className={style.column}>
        <RadonScript
          path={{ stage: "aggregate" }}
          radonScript={this.state.aggregate.script}
          selectHashFunction={this.selectHashFunction}
          updateArgumentInput={this.updateArgumentInput}
          updateFilterArgument={this.updateFilterArgument}
          updateOperatorCodeSelect={this.updateOperatorCodeSelect}
          updateOperatorFilterArgument={this.updateOperatorFilterArgument}
          updateOperatorReduceArgument={this.updateOperatorReduceArgument}
        />
      </div>
    )
  }

  public renderConsensus = () => {
    return (
      <div className={style.column}>
        <RadonScript
          path={{ stage: "consensus" }}
          radonScript={this.state.consensus.script}
          selectHashFunction={this.selectHashFunction}
          updateArgumentInput={this.updateArgumentInput}
          updateFilterArgument={this.updateFilterArgument}
          updateOperatorCodeSelect={this.updateOperatorCodeSelect}
          updateOperatorFilterArgument={this.updateOperatorFilterArgument}
          updateOperatorReduceArgument={this.updateOperatorReduceArgument}
        />
      </div>
    )
  }

  public constructor(props: RadonQueryProps) {
    super(props)

    this.state = {
      retrieve: props.request.retrieve,
      aggregate: props.request.aggregate,
      consensus: props.request.consensus,
    }
  }
  public validateRadScript = (_: any) => {
    return false
  }

  public updateOperatorCodeSelect = (path: any, operatorCode: any) => {
    let args = RadonOperatorInfos[operatorCode].arguments
      .map((argument) => {
        return match(argument.kind, [
          { options: [RadonTypes.Boolean, RadonTypes.Int, RadonTypes.Float, RadonTypes.String,
            RadonTypes.FilterFunction],
          result: [argument.kind, ""] },
          { options: [RadonTypes.Map, RadonTypes.Mixed, RadonTypes.Array, RadonTypes.Null,
            RadonTypes.Result, RadonTypes.Self, RadonTypes.MapFunction],
          result: [] },
          { options: [RadonTypes.HashFunction],
            result: parseInt(parseInt(HashFunctionCodes[HashFunctionCodes[0]]).toString(16)) },
          { options: [RadonTypes.ReduceFunction],
            result: parseInt(parseInt(ReducingFunctionCodes[ReducingFunctionCodes[0]]).toString(16)) },
        ])
      })

    const newState: RadonQueryState = this.state
    if (path.stage === "retrieve") {
      newState[`${path.stage}`][path.retrieveIndex].script[path.scriptIndex] = [parseInt(operatorCode), ...args]

      if (!this.validateRadScript("")) {
        newState[`${path.stage}`][path.retrieveIndex]
          .script
          .splice(path.scriptIndex + 1, newState[`${path.stage}`][path.retrieveIndex].script.length)
      }
    } else {
      newState[`${path.stage}`].script[path.scriptIndex] = [parseInt(operatorCode), ...args]

      if (!this.validateRadScript("")) {
        newState[`${path.stage}`].script.splice(path.scriptIndex + 1, newState[`${path.stage}`].script.length)
      }
    }
    this.setState(newState)
  }

  public updateOperatorFilterArgument = (
    path: any,
    filterFunctionCode: number,
    operator: Array<any>,
    argIndex: number
  ) => {
    operator[argIndex] = [filterFunctionCode, ""]
    const newState = this.state
    if (path.retrieveIndex) {
      newState[`${path.stage}`][path.retrieveIndex][path.scriptIndex] = operator
    } else {
      newState[`${path.stage}`][path.scriptIndex] = operator
    }
    this.setState(newState)
  }

  private updateFilterArgument = (path: any, filterArgument: number, operator: Array<any>, argIndex: number) => {
    operator[argIndex] = [operator[argIndex][0], filterArgument]
    const newState = this.state
    if (path.retrieveIndex) {
      newState[`${path.stage}`][path.retrieveIndex][path.scriptIndex] = operator
    } else {
      newState[`${path.stage}`][path.scriptIndex] = operator
    }
    this.setState(newState)
  }

  private updateOperatorReduceArgument = (
    path: any,
    reduceArgument: number,
    operator: Array<any>,
    argIndex: number,
  ) => {
    operator[argIndex] = [operator[argIndex][0], reduceArgument]
    const newState = this.state
    if (path.retrieveIndex) {
      newState[`${path.stage}`][path.retrieveIndex][path.scriptIndex] = operator
    } else {
      newState[`${path.stage}`][path.scriptIndex] = operator
    }
    this.setState(newState)
  }

  private selectHashFunction = (path: any, hashFunctionCode: number, operator: Array<any>, argIndex: number) => {
    operator[argIndex] = hashFunctionCode
    const newState = this.state
    if (path.retrieveIndex) {
      newState[`${path.stage}`][path.retrieveIndex][path.scriptIndex] = operator
    } else {
      newState[`${path.stage}`][path.scriptIndex] = operator
    }
    this.setState(newState)
  }

  private updateArgumentInput = (path: any, input: any, operator: Array<any>, argIndex: number) => {
    operator[argIndex] = input
    const newState = this.state

    if (path.retrieveIndex) {
      newState[`${path.stage}`][path.retrieveIndex][path.scriptIndex] = operator
    } else {
      newState[`${path.stage}`][path.scriptIndex] = operator
    }
    this.setState(newState)
  }

  public render() {
    return (
      <div>
        <section className={style.section}>
          <div className={style.column}>
            <h1>Request</h1>
          </div>
          {this.renderRetrieve()}
          <div className={style.column}>
            <button onClick={this.pushRetrieve}>add source</button>
          </div>
        </section>
        <br></br>

        <section className={style.section}>
          <div className={style.column}>
            <h1>Aggregate</h1>
          </div>
          {this.renderAggregate()}
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
      </div>
    )
  }
}
