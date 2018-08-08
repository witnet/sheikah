import Sidebar from "app/renderer/ui/components/sidebar"

import SmartContractsSection from "app/renderer/ui/components/main/sections/smartContracts"
import AttestationsSection from "app/renderer/ui/components/main/sections/attestations"
import BlockExplorerSection from "app/renderer/ui/components/main/sections/blockExplorer"
import CommunitySection from "app/renderer/ui/components/main/sections/community"
import WalletSection from "app/renderer/ui/components/main/sections/wallet"

import { SectionInfo } from "app/renderer/ui/components/main/sections"

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

/**
 * MainPage page component
 *
 * @export
 * @class MainPage
 * @extends {React.Component<RouteComponentProps<any>, void>}
 */
export class MainPage extends React.Component<RouteComponentProps<any>> {
  /** render */
  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    return (
      <div className={styles.layout}>
        <Sidebar {...sidebarProps} pathName={this.props.location.pathname} />
        <div className={styles.main}>
          <Switch>
            <Route path="/main/wallet" component={WalletSection.component} />
            <Route path="/main/smartcontracts" component={SmartContractsSection.component} />
            <Route path="/main/attestations" component={AttestationsSection.component} />
            <Route path="/main/blockexplorer" component={BlockExplorerSection.component} />
            <Route path="/main/community" component={CommunitySection.component} />
            <Route path="/main/community" component={CommunitySection.component} />
            <Route path="/" component={WalletSection.component} />
          </Switch>
        </div>
      </div>
    )
  }
}
export default MainPage