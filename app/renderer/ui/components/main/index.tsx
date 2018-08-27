import React = require("react")

import Sidebar from "app/renderer/ui/components/sidebar"
import { SectionInfo } from "app/renderer/ui/components/main/sections"

import SmartContractsSection from "app/renderer/ui/components/main/sections/smartContracts"
import AttestationsSection from "app/renderer/ui/components/main/sections/attestations"
import BlockExplorerSection from "app/renderer/ui/components/main/sections/blockExplorer"
import CommunitySection from "app/renderer/ui/components/main/sections/community"
import WalletSection from "app/renderer/ui/components/main/sections/wallet"
import { Services } from "app/renderer/services"

const styles = require("app/renderer/ui/components/main/style.scss")

// Array of info for all sections in main page
const sections: Array<SectionInfo> = [
  WalletSection, SmartContractsSection, AttestationsSection, BlockExplorerSection, CommunitySection
]

// Props passed to the sidebar component
const sidebarProps = {
  className: styles.sidebar,
  linksProps: sections
}

// Own props for the component
interface OwnProps {
  locationPathname: string,
  services: Services
}

/**
 * MainPage UI component
 *
 * @export
 * @class MainPage
 * @extends {React.Component<OwnProps>}
 */
export class MainPage extends React.Component<OwnProps> {
  /** render */
  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    return (
      <div className={styles.layout}>
        <Sidebar
          {...sidebarProps}
          pathName={this.props.locationPathname}
          onClickSettings={this.props.services.showUnimplementedMessage}
        />
        <div className={styles.main}>
        {this.props.children}
        </div>
      </div>
    )
  }
}