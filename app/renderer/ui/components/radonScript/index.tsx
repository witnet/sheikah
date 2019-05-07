import * as React from "react"
import { RadonOperator } from "../radonOperator"

import {
  TYPES as RadonTypes,
  TYPESYSTEM as RadonTypeSystem,
} from "../../../radon"

export interface RadonScriptProps {
  path: {
    stage: "retrieve" | "aggregate" | "consensus",
  },
  radonScript: any,
  selectHashFunction: Function,
  updateArgumentInput: Function,
  updateFilterArgument: Function,
  updateOperatorCodeSelect: Function,
  updateOperatorFilterArgument: Function,
  updateOperatorReduceArgument: Function,
}

/**
 * RadonQuery UI component
 *
 * @export
 * @class RadonQuery
 * @extends {React.Component<RadonQuery>}
 */
class RadonScript extends React.Component<RadonScriptProps> {
  public getOutput(operatorCode: any) {
    return Object.entries(RadonTypeSystem)
      .reduce((acc, array) => {
        if (Object.keys(array[1]).find((key) => key === operatorCode)) {
          acc = RadonTypes[RadonTypeSystem[array[0]][operatorCode]]
        }
        return acc
      }, "")
  }

  public render() {
    return (
      <div>
        {
          this.props.radonScript.map((operator: number | Array<any>, index: number) => {
            // create new objet instead of share the ref
            const operatorPath = {
              ...this.props.path,
              scriptIndex: index,
            }
            return (
              // eslint-disable-next-line react/jsx-key
              <RadonOperator
                path={operatorPath}
                operator={operator}
                updateOperatorCodeSelect={this.props.updateOperatorCodeSelect}
                updateOperatorFilterArgument={this.props.updateOperatorFilterArgument}
                updateFilterArgument={this.props.updateFilterArgument}
                updateOperatorReduceArgument={this.props.updateOperatorReduceArgument}
                selectHashFunction={this.props.selectHashFunction}
                updateArgumentInput={this.props.updateArgumentInput}
              />
            )
          })
        }
      </div>
    )
  }
}

export { RadonScript }
