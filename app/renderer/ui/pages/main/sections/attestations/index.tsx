import * as React from "react"
import {SectionInfo, SectionProps} from "app/renderer/ui/pages/main/sections"

/**
 * Attestations UI component
 *
 * @export
 * @class AttestationsSection
 * @extends {React.Component<SectionProps>}
 */

class Attestations extends React.Component<SectionProps> {
  // tslint:disable-next-line: completed-docs
  public render() {
    return (
      <div className={this.props.className}>
        Attestations
      </div>
    )
  }
}

const AttestationsSection: SectionInfo = {
  key: "attestations",
  caption: "Attestations",
  component: Attestations,
  icon: "eye"
}

export default AttestationsSection