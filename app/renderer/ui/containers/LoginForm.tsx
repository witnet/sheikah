import { connect } from "react-redux"
import * as React from "react"
import { Route, Switch } from "react-router"
import { push, goBack } from "connected-react-router"
import { bindActionCreators, Dispatch } from "redux"

import { Wallets, Wallet } from "app/common/runtimeTypes/storage/wallets"

import * as actionCreators from "app/renderer/actions/loginForm"
import { IAction } from "app/renderer/actions/helpers"
import { LoginForm } from "app/renderer/ui/components/loginForm"
import { StoreState } from "app/renderer/store"
import WalletSelection from "app/renderer/ui/components/loginForm/steps/walletSelection"
import WalletPasswordRequest from "app/renderer/ui/components/loginForm/steps/walletPasswordRequest"
import { Services } from "app/renderer/services"
import * as api from "app/renderer/api"
import { GetWalletResponse } from "app/common/runtimeTypes/ipc/wallets"

/**
 * Paths of the routes that are used in this container
 * NOTE: root path MUST be "/forms/login"
 */
export const PATHS = {
  WALLET_SELECTION: "/forms/login",
  WALLET_PASSWORD_PROMPT: "/forms/login/password",
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
 * Own props
 */
export interface OwnProps {
  services: Services
}

/**
 * Transitive form state
 */
export interface FormState {
  id: string,
  errorMessage?: string,
  unlockInProgress: boolean
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
 * Function to assert a never value
 * @param x
 */
const assertNever = (x: never) => undefined

/**
 * Login form container UI component
 *
 * @class LoginFormContainer
 * @extends {React.Component<StateProps & DispatchProps & OwnProps>}
 */
class LoginFormContainer extends React.Component<StateProps & DispatchProps & OwnProps> {
  /**
   * Container transitive state
   */
  public state: FormState = {
    id: "",
    unlockInProgress: false
  }

  /**
   * Method to return a promise that resolves after changing the state
   * @param newState
   */
  private changeState = async (newState: Partial<FormState>) => {
    return new Promise((resolve) => {
      this.setState(newState, resolve)
    })
  }

  /**
   * Method to go to the selected wallet (given an identifier)
   * @param id
   */
  private walletSelectNext = async (id: string) => {
    // Wait for the id to be set in the state
    await this.changeState({ id })

    // Dispatch action to go to next route
    this.props.goTo(PATHS.WALLET_PASSWORD_PROMPT)
  }

  /**
   * Method to go to the create new wallet route
   * @param id
   */
  private walletSelectNewWallet = async () => {
    // Dispatch action to go to next route
    // TODO: goTo("/forms/wallet") needs to be replaced by goTo(PATH.NEWWALLET)?
    this.props.goTo("/forms/wallet")
  }

  /**
   * Method to go to previous step in WalletPasswordRequest step
   */
  private walletPasswordRequestPrev = async () => {
    // Clean possible error
    await this.changeState({ errorMessage: "" })

    // Dispatch action to go back to previous route
    this.props.goBack()
  }

  /**
   * Method to go to next step in WalletPasswordRequest step
   * @param password
   */
  private walletPasswordRequestNext = async (password: string) => {
    // Set unlock in progress to activate loading modal component
    await this.changeState({ unlockInProgress: true })

    // Dispatch action to unlock wallet and catch error
    this.unlockWallet(this.state.id, password, this.props.services)
      .then((wallet: Wallet) => {
        // Save wallet
        this.props.actions.saveWallet(wallet)

        // Dispatch action to go to next route
        // TODO: goTo("/main") needs to be replaced by goTo(MAIN_PATHS.MAIN)
        this.props.goTo("/main")
      })
      .catch(async (errorMessage: string) => {
        // Set error message in the state
        await this.changeState({ errorMessage, unlockInProgress: false })
      })
  }

  /**
   * Method to perform an async call to renderer API to unlock a wallet and resolve/reject a promise
   * depending on the result of that call
   * @param id
   * @param password
   * @param services
   */
  private unlockWallet = async (id: string, password: string, services: Services) => {
    return new Promise<Wallet>((resolve, reject) => {
      // Try to retrieve wallet from renderer API & dispatch wallet or error
      api.getWallet(services.apiClient, id, password)
        .then((walletResponse: GetWalletResponse) => {
          // Check wallet response type
          switch (walletResponse.kind) {
            case "SUCCESS":
              resolve(walletResponse.wallet)
              break
            case "ERROR":
              reject(walletResponse.error)
              break
            default:
              assertNever(walletResponse)
          }
        })
        .catch((error) => {
          reject(`UNLOCK_WALLET_UNEXPECTED_ERROR ${error.message}`)
        })
    })
  }

  /**
   * Method to render WalletSelection step
   */
  private renderWalletSelection = () => (
    <WalletSelection
      wallets={this.props.wallets}
      nextStep={this.walletSelectNext}
      newWallet={this.walletSelectNewWallet}
    />
  )

  /**
   * Method to render WalletPasswordRequest step
   */
  private renderWalletPasswordRequest = () => (
    <WalletPasswordRequest
      nextStep={this.walletPasswordRequestNext}
      prevStep={this.walletPasswordRequestPrev}
      errorMessage={this.state.errorMessage}
    />
  )

  /**
   * Method to render component
   */
  public render() {
    return (
      <LoginForm unlockInProgress={this.state.unlockInProgress}>
        <Switch>
          <Route
            path={PATHS.WALLET_PASSWORD_PROMPT}
            render={this.renderWalletPasswordRequest}
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
