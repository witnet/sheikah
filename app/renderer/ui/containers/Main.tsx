import * as React from "react"
import { Action, bindActionCreators, Dispatch } from "redux"
import { RouteComponentProps, Switch, Route } from "react-router"
import { connect } from "react-redux"

import { saveTransactions, saveFinalKey } from "app/renderer/actions"
import * as urls from "app/renderer/constants/urls"
import { Services } from "app/renderer/services"
import { StoreState, WalletOption } from "app/renderer/store"

import { PendingTransactionProps } from "app/renderer/ui/components/transaction/pending"
import { ConfirmedTransactionProps } from "app/renderer/ui/components/transaction/confirmed"
import { MainPage } from "app/renderer/ui/components/main"
import MarketplaceSection from "app/renderer/ui/components/main/sections/marketplace"
import CommunitySection from "app/renderer/ui/components/main/sections/community"
import DataRequestsSection from "app/renderer/ui/components/main/sections/dataRequests"
import SmartContractsSection from "app/renderer/ui/components/main/sections/smartContracts"
import WalletSection from "app/renderer/ui/components/main/sections/wallet"

import { PropsRoute } from "app/renderer/utils/propsRoute"

import { filterPendingTransactions, filterConfirmedTransactions } from "app/renderer/selectors"

import {
  TabMyContracts,
  TabEasyComposer,
  TabProEditor
} from "app/renderer/ui/components/main/sections/smartContracts/tabs"

/**
 * Props that match redux store state
 */
export interface StateProps {
  selectedAccount: number,
  wallet: WalletOption
  pendingTransactions: Array<PendingTransactionProps>
  confirmedTransactions: Array<ConfirmedTransactionProps>
}

/**
 * Props that match redux actions
 */
export interface DispatchProps {
  saveTransactions: Function,
  saveFinalKey: Function
}

/**
 * Own props
 */
export interface OwnProps {
  services: Services,
}

/**
 * Function to map the dispatch of actions to props
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    saveTransactions: bindActionCreators(saveTransactions, dispatch),
    saveFinalKey: bindActionCreators(saveFinalKey, dispatch)
  }
}

/**
 * Function to map store state to props
 * @param state
 */
const mapStateToProps = (state: StoreState): StateProps => {
  return ({
    // TODO: Prototype only supports 1 account (i.e. "My hot wallet")
    selectedAccount: 0,
    wallet: state.wallet,
    confirmedTransactions: filterConfirmedTransactions(state.transactions),
    pendingTransactions: filterPendingTransactions(state.transactions)
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

  // TODO review why routing to tabs with updated props does not work if here
  ///**
  // * Props to be passed to tab receive
  // *
  // * @private
  // * @memberof MainContainer
  // */
  //private tabReceiveProps = {
  //  selectedAccount: this.props.selectedAccount,
  //  wallet: this.props.wallet,
  //  services: this.props.services,
  //  saveFinalKey: this.props.saveFinalKey
  //}

  ///**
  // * props to be passed to tab transactions
  // *
  // * @private
  // * @memberof MainContainer
  // */
  //private tabTransactionsProps = {
  //  pendingTransactions: this.props.pendingTransactions,
  //  confirmedTransactions: this.props.confirmedTransactions
  //}

  ///**
  // * Method to render routing in Wallet Section
  // */
  //private routingWalletSection = () => {
  //  return (
  //    <Switch>
  //      <PropsRoute
  //        path={urls.TRANSACTIONS_TAB}
  //        ownProps={this.tabTransactionsProps}
  //        component={TabTransactions.component}
  //      />
  //      <PropsRoute
  //        path={urls.COINS_TAB}
  //        ownProps={this.props}
  //        component={TabCoins.component}
  //      />
  //      <PropsRoute
  //        path={urls.SEND_TAB}
  //        ownProps={this.props}
  //        component={TabSend.component}
  //      />
  //      <PropsRoute
  //        path={urls.RECEIVE_TAB}
  //        ownProps={this.tabReceiveProps}
  //        component={TabReceive.component}
  //      />
  //      <PropsRoute
  //        path="/"
  //        ownProps={this.props}
  //        component={TabTransactions.component}
  //      />
  //    </Switch>
  //  )
  //}

  /**
   * Method to render routing in Smart Contracts section
   */
  private routingSmartContractsSection = () => {
    return (
      <Switch>
        <Route path={urls.MY_CONTRACTS_TAB} component={TabMyContracts.component} />
        <Route path={urls.EASY_COMPOSER_TAB} component={TabEasyComposer.component} />
        <Route path={urls.PROEDITOR_TAB} component={TabProEditor.component} />
        <Route path="/" component={TabMyContracts.component} />
      </Switch>
    )
  }

  /** render */
  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    const ownProps = {...this.props, pathName: this.props.location.pathname }

    return (
      <MainPage
        services={this.props.services}
        locationPathname={this.props.location.pathname}
      >
        <Switch>
          <PropsRoute
            path={urls.WALLET_SECTION}
            ownProps={ownProps}
            component={WalletSection.component}
          />
          <PropsRoute
            path={urls.DATA_REQUESTS_SECTION}
            ownProps={ownProps}
            component={DataRequestsSection.component}
          />
          <PropsRoute
            path={urls.SMART_CONTRACTS_SECTION}
            ownProps={ownProps}
            children={this.routingSmartContractsSection()}
            component={SmartContractsSection.component}
          />
          <PropsRoute
            path={urls.MARKETPLACE_SECTION}
            ownProps={ownProps}
            component={MarketplaceSection.component}
          />
          <PropsRoute
            path={urls.COMMUNITY_SECTION}
            ownProps={ownProps}
            component={CommunitySection.component}
          />
          <PropsRoute
            path="/"
            ownProps={ownProps}
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