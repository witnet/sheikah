import * as React from "react"
import { Dispatch } from "redux"
import { RouteComponentProps, Switch, Route } from "react-router"
import { connect } from "react-redux"

import * as urls from "app/renderer/constants/urls"
import { Services } from "app/renderer/services"
import { StoreState } from "app/renderer/store"
import { IAction } from "app/renderer/actions/helpers"

import { MainPage } from "app/renderer/ui/components/main"

import WalletSection from "app/renderer/ui/components/main/sections/wallet"
import SmartContractsSection from "app/renderer/ui/components/main/sections/smartContracts"
import AttestationsSection from "app/renderer/ui/components/main/sections/attestations"
import BlockExplorerSection from "app/renderer/ui/components/main/sections/blockExplorer"
import CommunitySection from "app/renderer/ui/components/main/sections/community"
import { PropsRoute } from "app/renderer/utils/propsRoute"

import {
  TabCoins,
  TabReceive,
  TabSend,
  TabTransactions
} from "app/renderer/ui/components/main/sections/wallet/tabs"

import {
  TabMyContracts,
  TabEasyComposer,
  TabProEditor,
  TabMarketplace
} from "app/renderer/ui/components/main/sections/smartContracts/tabs"

/**
 * Props that match redux store state
 */
export interface StateProps {
}

/**
 * Props that match redux actions
 */
export interface DispatchProps {
}

/**
 * Own props
 */
export interface OwnProps {
  services: Services
}

/**
 * Function to map the dispatch of actions to props
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: Dispatch<IAction>): DispatchProps => {
  return {
  }
}

/**
 * Function to map store state to props
 * @param state
 */
const mapStateToProps = (state: StoreState): StateProps => {
  return ({
  })
}

/**
 * Main container UI component
 *
 * @export
 * @class MainContainer
 * @extends {React.Component<RouteComponentProps<any>, void>}
 */
class MainContainer extends
  React.Component<RouteComponentProps<any> & OwnProps & StateProps & DispatchProps> {

  /**
   * Method to render routing in Wallet Section
   */
  private routingWalletSection = () => {
    return (
      <Switch>
        <PropsRoute
          path={urls.TRANSACTIONS_TAB}
          ownProps={this.props}
          component={TabTransactions.component}
        />
        <PropsRoute
          path={urls.COINS_TAB}
          ownProps={this.props}
          component={TabCoins.component}
        />
        <PropsRoute
          path={urls.SEND_TAB}
          ownProps={this.props}
          component={TabSend.component}
        />
        <PropsRoute
          path={urls.RECEIVE_TAB}
          ownProps={this.props}
          component={TabReceive.component}
        />
        <PropsRoute
          path="/"
          ownProps={this.props}
          component={TabTransactions.component}
        />
      </Switch>
    )
  }

  /**
   * Method to render routing in Smart Contracts section
   */
  private routingSmartContractsSection = () => {
    return (
      <Switch>
        <Route path={urls.MY_CONTRACTS_TAB} component={TabMyContracts.component} />
        <Route path={urls.EASY_COMPOSER_TAB} component={TabEasyComposer.component} />
        <Route path={urls.PROEDITOR_TAB} component={TabProEditor.component} />
        <Route path={urls.MARKETPLACE_TAB} component={TabMarketplace.component} />
        <Route path="/" component={TabMyContracts.component} />
      </Switch>
    )
  }

  /** render */
  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    return (
      <MainPage
        services={this.props.services}
        locationPathname={this.props.location.pathname}
      >
        <Switch>
          <PropsRoute
            path={urls.WALLET_SECTION}
            ownProps={this.props}
            children={this.routingWalletSection()}
            component={WalletSection.component}
          />
          <PropsRoute
            path={urls.SMART_CONTRACTS_SECTION}
            ownProps={this.props}
            children={this.routingSmartContractsSection()}
            component={SmartContractsSection.component}
          />
          <PropsRoute
            path={urls.ATTESTATIONS_SECTION}
            ownProps={this.props}
            component={AttestationsSection.component}
          />
          <PropsRoute
            path={urls.BLOCK_EXPLORER_SECTION}
            ownProps={this.props}
            component={BlockExplorerSection.component}
          />
          <PropsRoute
            path={urls.COMMUNITY_SECTION}
            ownProps={this.props}
            component={CommunitySection.component}
          />
          <PropsRoute
            path="/"
            ownProps={this.props}
            children={this.routingWalletSection()}
            component={WalletSection.component}
          />
        </Switch>
      </MainPage>
    )
  }
}

/**
 * Connect react component with redux store
 */
export default connect<StateProps, DispatchProps, any, StoreState>(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer)