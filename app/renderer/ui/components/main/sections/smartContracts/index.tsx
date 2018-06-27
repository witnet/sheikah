import * as React from "react"
import {SectionInfo, SectionProps} from "../index"

/**
 * SmartContracts UI component
 *
 * @export
 * @class SmartContracts
 * @extends {React.Component<SectionProps>}
 */
export class SmartContracts extends React.Component<SectionProps> {
  // tslint:disable-next-line: completed-docs
  public render() {
    return (
      <div className={this.props.className}>
        SmartContracts
      </div>
    )
  }
}

const SmartContractsSection: SectionInfo = {
  key: "smartcontracts",
  caption: "Smart Contracts",
  component: SmartContracts,
  icon: "file"
}

export default SmartContractsSection