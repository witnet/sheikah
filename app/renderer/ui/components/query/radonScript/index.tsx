import * as React from "react"
import { RadonMethodName, RadonMethod, getMethodInformation } from "app/renderer/radon"
import { RadonOperator } from "app/renderer/ui/components/radonOperator"

export interface RadonScriptState {
  methods: Array<RadonMethod>,
}

export interface RadonScriptProps {
  radonScript: Array<RadonMethodName>,
}

/**
 * RadonQuery UI component
 *
 * @export
 * @class RadonQuery
 * @extends {React.Component<RadonQuery>}
 */

export default class RadonScript extends React.Component<RadonScriptProps, RadonScriptState> {
  public constructor(props: RadonScriptProps) {
    super(props)
    this.state = {
      methods: props.radonScript.map((method) => getMethodInformation(method)),
    }
  }

  // getOutput() {
  //   this.state.methods.map((e, i) => {
  //     const result = this.state.methods.slice(i)[0]
  //     console.log(result)
  //   })
  // }

  private generateMethods = () => {
    return this.state.methods.map((method, index, self) => {
      // const inputType: RadonType = method.name.split("_")[0].toLowerCase() as RadonType

      return <RadonOperator key={index} methodInformation={method} />
    }
    )
  }

  public render() {
    return (
      <>
        {/* {console.log(this.getOutput())} */}
        {/* <RadonOperator inputType={this.state.methods[0].outputType} /> */}
        {/* {this.generateMethods()} */}
        <div>
          {this.generateMethods()}
        </div>
      </>
    )
  }
}
