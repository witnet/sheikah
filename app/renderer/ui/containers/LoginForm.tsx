import { connect } from "react-redux"
import * as React from "react"
import { Route, Switch } from "react-router"
import { push, goBack } from "react-router-redux"
import { bindActionCreators, Dispatch } from "redux"

import { Wallets, Wallet } from "app/common/runtimeTypes/storage/wallets"

import * as actionCreators from "app/renderer/actions/loginForm"
import { IAction } from "app/renderer/actions/helpers"
import { LoginForm } from "app/renderer/ui/components/loginForm"
import { StoreState } from "app/renderer/store"
import WalletSelection from "app/renderer/ui/components/loginForm/steps/walletSelection"
import WalletPasswordRequest from "app/renderer/ui/components/loginForm/steps/walletPasswordRequest"
import WalletUnlock from "app/renderer/ui/components/loginForm/steps/walletUnlockInProgress"

/**
 * Paths of the routes that are used in this container
 */
export const PATHS = {
  WALLET_SELECTION: "/login",
  WALLET_PASSWORD_REQUEST: "/login/walletPasswordRequest",
  WALLET_UNLOCK_IN_PROGRESS: "/login/walletUnlockInProgress"
}

/**
 * Props that match redux store state
 */
export interface StateProps {
  wallets: Wallets,
}

/**
 * Props that match redux actions
 */
export interface DispatchProps {
  actions: any,
  goTo: (path: string) => void,
  goBack: () => void,
}

/**
 * Transitive form state
 */
export interface FormState {
  id?: string,
  errorMessage?: string,
}

/**
 * Function to map store state to props
 * @param state
 */
const mapStateToProps = (state: StoreState): StateProps => {
  return ({
    wallets: state.wallets,
  })
}

/**
 * Function to map the dispatch of actions to props
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: Dispatch<IAction>): DispatchProps => {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
    goTo: (path: string) => dispatch(push(path)),
    goBack: () => dispatch(goBack()),
  }
}

/**
 * LoginFormContainer UI component
 *
 * @class LoginFormContainer
 * @extends {React.Component<StateProps & DispatchProps & OwnProps>}
 */
class LoginFormContainer extends React.Component<StateProps & DispatchProps> {
  /**
   * Container transitive state
   */
  public state: FormState = {
  }

  /**
   * Method to go to the next step in WalletSelection step
   * @param id
   */
  private walletSelectNext = async (id: string) => {
    // Wait for the id to be set in the state
    await new Promise((resolve) => { this.setState({ id }, resolve) })

    // Dispatch action to go to next route
    this.props.goTo(PATHS.WALLET_PASSWORD_REQUEST)
  }

  /**
   * Method to go to previous step in WalletPasswordRequest step
   */
  private walletPasswordRequestPrev = () => {
    // Dispatch action to go back to previous route
    this.props.goBack()
  }

  /**
   * Method to go to next step in WalletPasswordRequest step
   * @param password
   */
  private walletPasswordRequestNext = (password: string) => {
    // Dispatch action to go to next route
    this.props.goTo(PATHS.WALLET_UNLOCK_IN_PROGRESS)

    // Dispatch action to unlock wallet and catch error
    this.props.actions.unlockWallet(this.state.id, password)
      .then((wallet: Wallet) => {
        // Save wallet
        this.props.actions.saveWallet(wallet)

        // Dispatch action to go to next route
        // TODO dispatch(push("/")) needs to be replaced by dispatch(push(MAIN_PATHS.MAIN)
        this.props.goTo("/")
      })
      .catch((errorMessage: string) => {
        // Set error message in the state
        this.setState({ errorMessage })

        // Dispatch action to go to next route
        this.props.goTo(PATHS.WALLET_PASSWORD_REQUEST)
      })
  }

  /**
   * Method to render WalletSelection step
   */
  private renderWalletSelection = () => (
    <WalletSelection
      wallets={this.props.wallets}
      nextStep={this.walletSelectNext}
    />
  )

  /**
   * Method to render WalletPasswordRequest step
   */
  private renderWalletPasswordRequest = () => (
    <WalletPasswordRequest
      nextStep={this.walletPasswordRequestNext}
      prevStep={this.walletPasswordRequestPrev}
    />
  )

  /**
   * Method to render WalletUnlockInProgress
   */
  private renderWalletUnlockInProgress = () => (
    <WalletUnlock />
  )

  /**
   * Method to render component
   */
  public render() {
    return (
      <LoginForm>
        <Switch>
          <Route
            path={PATHS.WALLET_PASSWORD_REQUEST}
            render={this.renderWalletPasswordRequest}
          />
          <Route
            path={PATHS.WALLET_UNLOCK_IN_PROGRESS}
            render={this.renderWalletUnlockInProgress}
          />
          <Route
            path={PATHS.WALLET_SELECTION}
            render={this.renderWalletSelection}
          />
        </Switch>
      </LoginForm>)
  }
}

/**
 * Connect react component with redux store
 */
export default connect<StateProps, DispatchProps, any, StoreState>(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormContainer)
