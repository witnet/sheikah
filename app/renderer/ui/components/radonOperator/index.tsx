import * as React from "react"

import {
  getMethodInformation,
  getMethodsByType,
  RadonType,
  getRadonFunctionsByType,
  RadonMethodName,
  RadonMethod,
  RadonArgument,
} from "../../../radon"

const styles = require("./style.scss")

export interface RadonOperatorProps {
  inputType: RadonType,
}

export interface RadonOperatorState {
  availableMethodsNames: Array<RadonMethodName>,
  selectedMethodInfo: RadonMethod,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedArguments: Array<any>,
  radonFunctionArgument: string,
}

/**
 * RadonOperator ui component
 *
 * @export
 * @class RadonOperator
 * @extends {React.Component<RadonOperatorProps>}
 */
export default class RadonOperator extends React.Component<RadonOperatorProps, RadonOperatorState> {
  public constructor(props: RadonOperatorProps) {
    super(props)

    const availableMethodsNames = getMethodsByType(this.props.inputType)
    const selectedMethodInfo = getMethodInformation(availableMethodsNames[0])

    const selectedArguments = selectedMethodInfo.arguments.map(getAvailableArguments)

    this.state = {
      availableMethodsNames,
      selectedMethodInfo,
      selectedArguments,
      radonFunctionArgument: "",
    }
  }

  public changeSelectedMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedArguments = getMethodInformation(e.target.value as RadonMethodName)
      .arguments
      .map(getAvailableArguments)

    this.setState({
      selectedArguments,
      selectedMethodInfo: getMethodInformation(e.target.value as RadonMethodName),
      radonFunctionArgument: "",
    })
  }

  public setSelectedMethodArguments = (index: number, e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedArguments = this.state.selectedArguments
    selectedArguments[index] = {
      name: e.target.name,
      value: e.target.value,
    }
    // console.log(e.target["dat)
    this.setState({
      selectedArguments,
    })
  }

  public setFunctionInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      radonFunctionArgument: e.target.value,
    })
  }

  public setArgumentInput = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedArguments = this.state.selectedArguments

    selectedArguments[index] = {
      name: e.target.name,
      value: e.target.value,
    }
    this.setState({
      selectedArguments,
    })
  }

  public render() {
    return (
      <div className={styles.main}>
        <p>{this.props.inputType}</p>
        <select value={this.state.selectedMethodInfo.name} onChange={this.changeSelectedMethod}>
          {
            this.state.availableMethodsNames.map(method =>
              <option key={method} value={method}>
                {method}
              </option>)
          }
        </select>
        {
          this.state.selectedMethodInfo.arguments.map((argument, index) => {
            switch (argument.kind) {
              case "RADON_TYPE":
                return (
                  <div>
                    <label>{argument.name} </label>
                    <input type="text" data-index={index} required={!argument.optional}
                      name="radonType" value={this.state.selectedArguments[index].value}
                      onChange={e => this.setArgumentInput(index, e)}
                    />
                  </div>
                )
              case "FUNCTION_FILTER":
                return (
                  <div>
                    <select value={this.state.selectedArguments[index].value} data-index={index}
                      name="functionFilter"
                      onChange={(e) => this.setSelectedMethodArguments(index, e)}
                    >
                      {getRadonFunctionsByType("FUNCTION_FILTER").map(functionName =>
                        <option key= {functionName} value={functionName}>
                          {functionName}
                        </option>)
                      }
                    </select>
                    <label>Value: </label>
                    <input name="functionFilterInput" value={this.state.radonFunctionArgument}
                      onChange={this.setFunctionInput}
                    />
                  </div>
                )
              case "FUNCTION_MAP":
                return (
                  <div>
                  TODO: Implement map functions
                  </div>
                )
              case "FUNCTION_REDUCE":
                return (
                  <div>
                    <select value={this.state.selectedArguments[index].value} name="functionReduce"
                      onChange={e => this.setSelectedMethodArguments(index, e)}
                    >
                      {getRadonFunctionsByType("FUNCTION_REDUCE").map(functionName => {
                        return (
                          <option key={functionName} value={functionName}>
                            {functionName}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                )
              case "FUNCTION_HASH":
                return (
                  <div>
                    <select value={this.state.selectedArguments[index].value} name="hashFunction"
                      onChange={e => this.setSelectedMethodArguments(index, e)}
                    >
                      {getRadonFunctionsByType("FUNCTION_HASH").map(functionName => {
                        return (
                          <option key={functionName} value={functionName}>
                            {functionName}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                )
            }
          })
        }
        <p>{this.state.selectedMethodInfo.outputType}</p>
      </div>
    )
  }
}

function getAvailableArguments(item: RadonArgument) {
  switch (item.kind) {
    case "FUNCTION_FILTER":
      return {
        name: getRadonFunctionsByType(item.kind)[0],
        value: "",
      }
    case "FUNCTION_HASH":
      return {
        name: getRadonFunctionsByType(item.kind)[0],
        value: "",
      }
    case "FUNCTION_MAP":
      return {
        name: "",
        value: "",
      }
    case "FUNCTION_REDUCE":
      return {
        name: getRadonFunctionsByType(item.kind)[0],
        value: "",
      }
    case "RADON_TYPE":
      return ""
  }
}

export {
  RadonOperator,
}
