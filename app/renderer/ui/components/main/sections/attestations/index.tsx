import * as React from "react"

import { SectionInfo, SectionProps } from "app/renderer/ui/components/main/sections"
import * as urls from "app/renderer/constants/urls"

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
  link: urls.ATTESTATIONS_SECTION,
  component: Attestations,
  icon: "eye"
}

export default AttestationsSection