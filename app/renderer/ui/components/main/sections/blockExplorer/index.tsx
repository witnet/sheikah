import * as React from "react"

import { SectionInfo, SectionProps } from "app/renderer/ui/components/main/sections"
import * as urls from "app/renderer/constants/urls"

/**
 * BlockExplorer UI component
 *
 * @export
 * @class BlockExplorer
 * @extends {React.Component<SectionProps>}
 */

export class BlockExplorer extends React.Component<SectionProps> {
  // tslint:disable-next-line: completed-docs
  public render() {
    return (
      <div className={this.props.className}>
        BlockExplorer
      </div>
    )
  }
}

const BlockExplorerSection: SectionInfo = {
  key: "blockexplorer",
  caption: "Block Explorer",
  link: urls.BLOCK_EXPLORER_SECTION,
  component: BlockExplorer,
  icon: "square"
}

export default BlockExplorerSection