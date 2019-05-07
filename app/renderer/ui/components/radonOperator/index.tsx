import * as React from "react"

import {
  TYPES as RadonTypes,
  TYPESYSTEM as RadonTypeSystem,
  OPERATOR_INFOS as RadonOperatorInfos,
  FilteringFunctionCodes,
  ReducingFunctionCodes,
  HashFunctionCodes,
  TYPES,
} from "../../../radon"
import { match } from "app/renderer/utils/match"

const styles = require("./style.scss")

export interface RadonOperatorProps {
  path: {
    scriptIndex: number,
    stage: "retrieve" | "aggregate" | "consensus",
  },
  operator: Array<any> | number,
  updateOperatorCodeSelect: Function,
  updateOperatorFilterArgument: Function,
  updateFilterArgument: Function,
  updateOperatorReduceArgument: Function,
  selectHashFunction: Function,
  updateArgumentInput: Function,

}

export interface RadonOperatorState {
  inputType: string,
  operator: Array<any>,
  outputType: string,
}

/**
 * RadonOperator ui component
 *
 * @export
 * @class RadonOperator
 * @extends {React.Component<RadonOperatorProps>}
 */
export default class RadonOperator extends React.Component<RadonOperatorProps, RadonOperatorState> {
  private getTypeFromOperatorCode = (operatorCode: number): string => Object.entries(RadonTypeSystem)
    .reduce((acc, array) => {
      if (Object.keys(array[1]).find(code => parseInt(code) === operatorCode)) {
        acc = array[0]
      }

      return acc
    }, "")

  public render() {
    const operatorCode = Array.isArray(this.props.operator) ? this.props.operator[0] : this.props.operator
    // if there is no operator code default input type is string
    const defaultInputType = 0x03
    const foundType = operatorCode
      ? this.getTypeFromOperatorCode(operatorCode) : defaultInputType

    const inputType = RadonTypes[foundType]
    const operator = Array.isArray(this.props.operator) ? this.props.operator : [this.props.operator]

    const outputType = RadonTypes[RadonTypeSystem[foundType][operatorCode]]

    const operatorOptions = Object.keys(RadonTypeSystem[RadonTypes[inputType]])
      .map((item: string) => <option value={item} key={item}>{RadonOperatorInfos[item].name}</option>)

    return (
      <div className={styles.main}>
        <p>Input Type: {inputType}</p>
        <span>Method: </span>
        <select
          value={operatorCode}
          onChange={
            (e: React.ChangeEvent<HTMLSelectElement>) =>
              this.props.updateOperatorCodeSelect(this.props.path, e.target.value)
          }
        >
          {operatorOptions}
        </select>
        {
          RadonOperatorInfos[operatorCode].arguments
            .map((argValues, index) => {
              return match(argValues.kind, [
                { options: [TYPES.Boolean, TYPES.Int, TYPES.Float, TYPES.String],
                  result: (
                    <div>
                      <label htmlFor={argValues.name}>{argValues.name}:</label>
                      <input
                        name={argValues.name} value={operator[index + 1]}
                        onChange={
                          (e: React.ChangeEvent<HTMLInputElement>) =>
                            this.props.updateArgumentInput(this.props.path, e.target.value, operator, index + 1)
                        }
                      />
                    </div>
                  ),
                },
                {
                  options: [TYPES.Map],
                  result: (
                    <div>
                      <label htmlFor={argValues.name}>{argValues.name}*:</label>
                      <input
                        name={argValues.name} value={operator[index + 1]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          this.props.updateArgumentInput(this.props.path, e.target.value, operator, index + 1)
                        }
                      />
                    </div>
                  ),
                },
                {
                  options: [TYPES.HashFunction],
                  result: (
                    <div>
                      <span>{argValues.name}</span>
                      <select
                        value={operator[index + 1]}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          this.props.selectHashFunction(this.props.path, e.target.value, operator, index + 1)
                        }
                      >
                        {
                          Object.entries(HashFunctionCodes)
                            .slice(0, Object.entries(HashFunctionCodes).length / 2)
                            .map(item => <option key={item[0]} value={item[0]}>{item[1]}</option>)
                        }
                      </select>
                    </div>),
                },
                {
                  options: [TYPES.FilterFunction],
                  result: (
                    <div>
                      <span>{argValues.name}</span>
                      <select value={operator[index + 1][0]}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          this.props.updateOperatorFilterArgument(this.props.path, e.target.value, operator, index + 1)
                        }
                      >
                        {Object.entries(FilteringFunctionCodes)
                          .slice(0, Object.entries(FilteringFunctionCodes).length / 2)
                          .map(item => <option key={item[0]} value={item[0]}>{item[1]}</option>)
                        }
                      </select>
                      <div>
                        <span>Value:</span>
                        <input
                          value={operator[index][1]}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            this.props.updateFilterArgument(this.props.path, e.target.value, operator, index + 1)
                          }
                        />
                      </div>
                    </div>
                  ),
                },
                {
                  options: [TYPES.ReduceFunction],
                  result: (
                    <div>
                      <span>{argValues.name}</span>
                      <select
                        value={operator[index + 1]}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          this.props.updateOperatorReduceArgument(this.props.path, e.target.value, operator, index + 1)
                        }
                      >
                        {Object.entries(ReducingFunctionCodes)
                          .slice(0, Object.entries(ReducingFunctionCodes).length / 2)
                          .map(item => <option key={item[0]} value={item[0]}>{item[1]}</option>)
                        }
                      </select>
                    </div>
                  ),
                },
                {
                  options: [TYPES.Self, TYPES.MapFunction],
                  result: (
                    <div>
                      <label htmlFor={argValues.name}>{argValues.name}*:</label>
                      <input
                        name={argValues.name}
                        value={operator[index + 1]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          this.props.updateArgumentInput(this.props.path, e, operator, index + 1)
                        }
                      />
                    </div>
                  ),
                },
              ])
            })
        }

        <p>Output Type: {outputType}</p>
      </div>
    )
  }
}

export {
  RadonOperator,
}
