import * as React from "react"
import {SectionInfo, SectionProps} from "../index"

/**
 * Community UI component
 *
 * @export
 * @class Community
 * @extends {React.Component<SectionProps>}
 */
export class Community extends React.Component<SectionProps> {
  // tslint:disable-next-line: completed-docs
  public render() {
    return (
      <div className={this.props.className}>
        Community
      </div>
    )
  }
}

const CommunitySection: SectionInfo = {
  key: "community",
  caption: "Community",
  component: Community,
  icon: "building"
}

export default CommunitySection