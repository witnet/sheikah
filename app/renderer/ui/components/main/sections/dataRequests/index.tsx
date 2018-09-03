import * as React from "react"

import { SectionInfo, SectionProps } from "app/renderer/ui/components/main/sections"
import * as urls from "app/renderer/constants/urls"

/**
 * Data requests UI component
 *
 * @export
 * @class DataRequests
 * @extends {React.Component<SectionProps>}
 */

class DataRequests extends React.Component<SectionProps> {
  // tslint:disable-next-line: completed-docs
  public render() {
    return (
      <div className={this.props.className}>
        Data requests
      </div>
    )
  }
}

const DataRequestsSection: SectionInfo = {
  key: "datarequests",
  caption: "Data Requests",
  sectionPath: urls.DATA_REQUESTS_SECTION,
  path: urls.DATA_REQUESTS_SECTION,
  component: DataRequests,
  icon: "eye"
}

export default DataRequestsSection