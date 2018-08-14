import React = require("react")
import { RouteComponentProps, Switch } from "react-router"

import Sidebar from "app/renderer/ui/components/sidebar"
import SmartContractsSection from "app/renderer/ui/components/main/sections/smartContracts"
import AttestationsSection from "app/renderer/ui/components/main/sections/attestations"
import BlockExplorerSection from "app/renderer/ui/components/main/sections/blockExplorer"
import CommunitySection from "app/renderer/ui/components/main/sections/community"
import WalletSection from "app/renderer/ui/components/main/sections/wallet"

import { SectionInfo } from "app/renderer/ui/components/main/sections"
import { PropsRoute } from "app/renderer/utils/propsRoute"

const styles = require("app/renderer/ui/components/main/style.scss")

const sections: Array<SectionInfo> = [
  WalletSection, SmartContractsSection, AttestationsSection, BlockExplorerSection, CommunitySection
]

const sidebarProps = {
  className: styles.sidebar,
  linksProps: sections.map((section) => ({
    ...section,
    link: `/main/${section.key}`
  }))
}

interface Props {
  services: {
    showUnimplementedMessage: Function
  }
}
/**
 * MainPage page component
 *
 * @export
 * @class MainPage
 * @extends {React.Component<RouteComponentProps<any>, void>}
 */
export class MainPage extends React.Component<RouteComponentProps<any> & Props> {
  /** render */
  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    return (
      <div className={styles.layout}>
        <Sidebar {...sidebarProps} pathName={this.props.location.pathname} />
        <div className={styles.main}>
          <Switch>
            <PropsRoute
              path="/main/wallet"
              ownProps={this.props}
              component={WalletSection.component}
            />
            <PropsRoute
              path="/main/smartcontracts"
              ownProps={this.props}
              component={SmartContractsSection.component}
            />
            <PropsRoute
              path="/main/attestations"
              ownProps={this.props}
              component={AttestationsSection.component}
            />
            <PropsRoute
              path="/main/blockexplorer"
              ownProps={this.props}
              component={BlockExplorerSection.component}
            />
            <PropsRoute
              path="/main/community"
              ownProps={this.props}
              component={CommunitySection.component}
            />
            <PropsRoute
              path="/"
              ownProps={this.props}
              component={WalletSection.component}
            />
          </Switch>
        </div>
      </div>
    )
  }
}
export default MainPage