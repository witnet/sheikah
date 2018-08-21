import * as React from "react"

import { SectionInfo, SectionProps } from "app/renderer/ui/components/main/sections"
import * as urls from "app/renderer/constants/urls"

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
  path: urls.COMMUNITY_SECTION,
  component: Community,
  icon: "users"
}

export default CommunitySection