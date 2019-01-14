import React = require("react")

import Sidebar, { SettingsOptions } from "app/renderer/ui/components/sidebar"
import { SectionInfo } from "app/renderer/ui/components/main/sections"

import CommunitySection from "app/renderer/ui/components/main/sections/community"
import DataRequestsSection from "app/renderer/ui/components/main/sections/dataRequests"
import MarketplaceSection from "app/renderer/ui/components/main/sections/marketplace"
import SmartContractsSection from "app/renderer/ui/components/main/sections/smartContracts"
import WalletSection from "app/renderer/ui/components/main/sections/wallet"

import { Services } from "app/renderer/services"

const styles = require("app/renderer/ui/components/main/style.scss")

// Array of info for all sections in main page
const sections: Array<SectionInfo> = [
  WalletSection, DataRequestsSection, SmartContractsSection, MarketplaceSection, CommunitySection
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
  walletName: string
  settingsOptions: SettingsOptions
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
      <div className={styles.wrapper}>
        <Sidebar
          {...sidebarProps}
          pathName={this.props.locationPathname}
          setingsOptions={this.props.settingsOptions}
          walletName={this.props.walletName}
        />
        <div className={styles.main}>
        {this.props.children}
        </div>
      </div>
    )
  }
}