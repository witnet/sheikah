import * as React from "react"
import { LoadingModal } from "app/renderer/ui/components/loadingModal"
import { SidebarLayout } from "app/renderer/ui/components/layout"
import { SettingsOptions } from "app/renderer/ui/components/sidebar"

const styles = require("./style.scss")

export interface LoginFormProps {
  collapseSidebar?: boolean,
  settingsOptions: SettingsOptions,
  unlockInProgress: boolean,
}

/**
 * Login form UI component with loading modal
 * Layout: sidebar layout
 *
 * @export
 * @class LoginForm
 * @extends {React.Component<LoginFormProps>}
 */
export class LoginForm extends React.Component<LoginFormProps> {
  public render() {
    return (
      <div className={styles.layout}>
        <div className={styles.centered}>
          <LoadingModal
            active={this.props.unlockInProgress}
            title="Sheikah is now unlocking your wallet"
            description="This will take a few seconds"
          />
          <SidebarLayout
            collapeSidebar={this.props.collapseSidebar}
            title="Welcome back"
            menuIcon="fa fa-cog"
            menuText="App Settings"
            settingsOptions={this.props.settingsOptions}
          >
            {this.props.children}
          </SidebarLayout>
        </div>
      </div>
    )
  }
}
