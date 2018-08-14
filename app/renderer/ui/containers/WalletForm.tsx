import * as React from "react"
import { Route, RouteComponentProps, Switch } from "react-router"
import { connect } from "react-redux"
import { bindActionCreators, Dispatch } from "redux"

import log from "app/common/logging"
import { assertNever } from "app/common/utils"
import { StoreState } from "app/renderer/store"
import { Wallets, newMnemonicsErrors } from "app/common/runtimeTypes/storage/wallets"
import {
  encryptWalletErrors,
  importSeedErrors,
  ImportSeedResponse,
} from "app/common/runtimeTypes/ipc/wallets"
import {
  Client,
  encryptWallet,
  newMnemonics,
  validateMnemonics,
  validateXprv
} from "app/renderer/api"
import { IAction } from "app/renderer/actions/helpers"
import { saveWallet } from "app/renderer/actions/loginForm"

import { WalletForm } from "app/renderer/ui/components/walletForm"
import {
  WalletSeedValidation,
  WalletEncryptionPassword,
  WalletSeedBackup,
  WalletSeedConfirmation,
  WalletSeedTypeSelection,
  Welcome
} from "app/renderer/ui/components/walletForm/steps"

import {
  MAIN,
  WALLET_ENCRYPTION_PASSWORD,
  WALLET_IMPORT_MNEMONICS,
  WALLET_IMPORT_XPRV,
  WALLET_SEED_BACKUP,
  WALLET_SEED_CONFIRMATION,
  WALLET_SEED_TYPE_SELECTION,
  WELCOME,
} from "app/renderer/constants/urls"
import {
  extendWalletData,
  prefilledWalletCaption
} from "app/renderer/prefilledWallet"

/**
 * Props that match redux store state
 *
 * @export
 * @interface StateProps
 */
export interface StateProps {
  wallets: Wallets,
}

/**
 * Props that match redux actions
 *
 * @export
 * @interface DispatchProps
 */
export interface DispatchProps {
  actions: any
}

/**
 * Props that contain configuration
 *
 * @interface Props
 */
interface Props {
  services: any
}

/**
 * Function to map the dispatch of actions to props
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: Dispatch<IAction>): DispatchProps => {
  return {
    actions: bindActionCreators({ saveWallet }, dispatch)
  }
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
 * Wallet form container UI component
 *
 * @class WalletFormContainer
 * @extends {(React.Component<RouteComponentProps<any> & Props & StateProps & DispatchProps>)}
 */
class WalletFormContainer extends
  React.Component<RouteComponentProps<any> & Props & StateProps & DispatchProps> {

  /**
   * component state
   *
   * @memberof WalletFormContainer
   */
  public state = {
    caption: "",
    confirmMnemonics: "",
    importSeed: "",
    mnemonics: "",
    seedErrorMessage: "",
    password: "",
    passwordErrorMessage: "",
    repeatPassword: "",
    spinner: false
  }

  /**
   * Seed types for seed type selection step
   *
   * @private
   * @memberof WalletFormContainer
   */
  private seedTypes = {
    // Async function to handle the creation of a seed
    newSeed: async () => {
      await this.createSeed()
      this.to(WALLET_SEED_BACKUP)()
    },
    newPrefilledSeed: async () => {
      await this.createSeed()
      this.setState({caption: prefilledWalletCaption})
      this.to(WALLET_SEED_BACKUP)()
    },

    // Async function to handle the import of mnemonics
    importMnemonics: async () => {
      this.to(WALLET_IMPORT_MNEMONICS)()
    },

    // Async function to handle the import of xprv
    importXprv: async () => {
      this.to(WALLET_IMPORT_XPRV)()
    },

    // Async function to handle the use of a hardware device
    useHardwareDevice: async () => {
      // TODO: use not implemented notification (after PR is accepted)
    }
  }

  /**
   * Create seed
   */
  private createSeed = async () => {
    if (!this.state.mnemonics) {
      this.setState({ spinner: true })
      const mnemonicsResponse = await newMnemonics(this.props.services.apiClient)
      this.setState({ spinner: false })
      if (mnemonicsResponse.kind === "SUCCESS") {
        const newState = { mnemonics: mnemonicsResponse.mnemonics }
        this.setState(newState)
      } else {
        // TODO: improve error handler issue #321
        switch (mnemonicsResponse.error) {
          case newMnemonicsErrors.GENERIC_ERROR.value:
          case newMnemonicsErrors.DEPENDENCY_ERROR_GENERATE_MNEMONICS.value:
            this.setState({ mnemonicsErrorMessage: "Error generating mnemonics" })
            break
          case newMnemonicsErrors.ERROR_UPDATING_UNCONSOLIDATED_WALLET.value:
            this.setState({ mnemonicsErrorMessage: "Error generating mnemonics" })
            break
          case newMnemonicsErrors.INVALID_MNEMONICS_TYPE.value:
            this.setState({ mnemonicsErrorMessage: "Error generating mnemonics" })
            break
          default:
            assertNever(mnemonicsResponse.error)
        }
      }
    }
  }
  /**
   * Method to handle react router navigation
   *
   * @private
   * @memberof WalletFormContainer
   */
  private to = (string: string) => () => { this.props.history.replace(string) }

  /**
   * Wallet encryption step
   *
   * @private
   * @memberof WalletFormContainer
   */
  private walletEncryption = async () => {
    this.setState({ spinner: true })

    const encryptWalletResponse = await encryptWallet(
      this.props.services.apiClient,
      this.state.password,
      this.state.caption || undefined
    )

    this.setState({ spinner: false })

    if (encryptWalletResponse.kind === "SUCCESS") {
      // if is a prefilledWallet add the prefilled data
      const wallet = extendWalletData(encryptWalletResponse.wallet)
      await this.props.actions.saveWallet(wallet)
      this.to(MAIN)()
    } else {
      // TODO: improve error handler issue #321
      switch (encryptWalletResponse.error) {
        case encryptWalletErrors.INVALID_MNEMONICS.value:
        case encryptWalletErrors.INVALID_WALLET_ID.value:
        case encryptWalletErrors.STORAGE_CREATION_FAILURE.value:
        case encryptWalletErrors.UNAVAILABLE_UNCONSOLIDATED_WALLET.value:
        case encryptWalletErrors.WALLET_REPLACE_FAILURE.value:
        case encryptWalletErrors.WALLET_STORE_FAILURE.value:
        case encryptWalletErrors.ID_GENERATION_ERROR.value:
        case encryptWalletErrors.INVALID_SEED.value:
        case encryptWalletErrors.INVALID_METHOD_PARAMS.value:
        case encryptWalletErrors.INVALID_KEY_PATH.value:
        case encryptWalletErrors.UNAVAILABLE_WALLET_INFOS.value:
        case encryptWalletErrors.WALLET_PLAIN_STORAGE_FAILURE.value:
          log.error(encryptWalletResponse)
          this.to(WELCOME)()
          break
        default:
          assertNever(encryptWalletResponse.error)
      }
    }
  }

  /**
   * Seed confirmation next step function
   *
   * @private
   * @memberof WalletFormContainer
   */
  private seedConfirmationNextStep = async () => {
    if (this.state.mnemonics === this.state.confirmMnemonics) {
      this.setState({ spinner: true })
      const mnemonicsValidationResponse = await validateMnemonics(
        this.props.services.apiClient,
        this.state.confirmMnemonics
      )
      this.setState({ spinner: false })
      if (mnemonicsValidationResponse.kind === "SUCCESS") {
        this.to(WALLET_ENCRYPTION_PASSWORD)()
      } else {
        // TODO: improve error handler issue #321
        switch (mnemonicsValidationResponse.error) {
          case importSeedErrors.INVALID_METHOD_PARAMS.value:
          case importSeedErrors.INVALID_XPRV.value:
          case importSeedErrors.INVALID_MNEMONICS.value:
          case importSeedErrors.MISMATCHING_MNEMONICS.value:
          case importSeedErrors.UNCONSOLIDATED_UPDATE_FAILURE.value:
            this.setState({ seedErrorMessage: "Invalid mnemonics" })
            break
          default:
            assertNever(mnemonicsValidationResponse.error)
        }
      }
    } else {
      this.setState({ seedErrorMessage: "Invalid mnemonics" })
    }
  }

  /**
   * Seed validation next step function
   *
   * @private
   * @memberof WalletFormContainer
   */
  private seedValidationNextStep = async (
    validateSeed: (client: Client, seed: string) => Promise<ImportSeedResponse>
  ) => {
    this.setState({ spinner: true })
    const seedValidationResponse = await validateSeed(
      this.props.services.apiClient,
      this.state.importSeed
    )
    this.setState({ spinner: false })
    if (seedValidationResponse.kind === "SUCCESS") {
      this.to(WALLET_ENCRYPTION_PASSWORD)()
    } else {
      // TODO: improve error handler issue #321
      switch (seedValidationResponse.error) {
        case importSeedErrors.MISMATCHING_MNEMONICS.value:
        case importSeedErrors.INVALID_MNEMONICS.value:
          this.setState({ seedErrorMessage: "Invalid mnemonics" })
          break
        case importSeedErrors.INVALID_XPRV.value:
          this.setState({ seedErrorMessage: "Invalid master key" })
          break
        case importSeedErrors.INVALID_METHOD_PARAMS.value:
        case importSeedErrors.UNCONSOLIDATED_UPDATE_FAILURE.value:
          this.setState({ seedErrorMessage: "Invalid seed" })
          break
        default:
          assertNever(seedValidationResponse.error)
      }
    }
  }

  /**
   * Mnemonics validation next step function
   *
   * @private
   * @memberof WalletFormContainer
   */
  private mnemonicsValidationNextStep = async () => {
    await this.seedValidationNextStep(validateMnemonics)
  }

  /**
   * Xprv validation next step function
   *
   * @private
   * @memberof WalletFormContainer
   */
  private xprvValidationNextStep = async () => {
    await this.seedValidationNextStep(validateXprv)
  }

  /**
   * On change input for wallet seed confirmation step
   * @param ev
   * @private
   * @memberof WalletFormContainer
   */
  private onChangeInput = async (ev: any) => {
    this.setState({ confirmMnemonics: ev.target.value })
    if (this.state.mnemonics === this.state.confirmMnemonics) {
      this.setState({ seedErrorMessage: "" })
    }
  }

  /**
   * On change password function for encryption password step
   *
   * @private
   * @memberof WalletFormContainer
   */
  private onChangePassword = async (ev: any) => {
    this.setState({ password: ev.target.value })
    if (this.state.password === this.state.repeatPassword) {
      this.setState({ passwordErrorMessage: "" })
    }
  }

  /**
   * on change repeat password for encryption password step
   *
   * @private
   * @memberof WalletFormContainer
   */
  private OnChangeRepeatPassword = async (ev: any) => {
    this.setState({ repeatPassword: ev.target.value })
    if (this.state.password === this.state.repeatPassword) {
      this.setState({ passwordErrorMessage: "" })
    }
  }

  /**
   * On change input for wallet seed confirmation step
   * @param ev
   * @private
   * @memberof WalletFormContainer
   */
  private onChangeImportSeed = async (ev: any) => {
    this.setState({ importSeed: ev.target.value })
  }

  /**
   * encryption password next step function
   *
   * @private
   * @memberof WalletFormContainer
   */
  private encryptionPasswordNextStep = async () => {
    if (this.state.password === this.state.repeatPassword && this.state.password) {
      await this.walletEncryption()
    } else {
      this.setState({ passwordErrorMessage: "Passwords must macth" })
    }
  }

  /**
   * Method to render welcome step
   *
   * @private
   * @memberof WalletFormContainer
   */
  private renderWelcome = () => (
    <Welcome nextStep={this.to(WALLET_SEED_TYPE_SELECTION)} />
  )

  /**
   * Method to render seed type selection step
   *
   * @private
   * @memberof WalletFormContainer
   */
  private renderSeedTypeSelection = () => (
    <WalletSeedTypeSelection
      nextStep={this.seedTypes}
    />
  )

  /**
   * Unset the caption when the user returns to seed type selection
   */
  private rendererSeedBackupPreviousStep = () => {
    this.setState({caption: ""})
    this.to(WALLET_SEED_TYPE_SELECTION)()
  }
  /**
   * Method to render seed backup step
   *
   * @private
   * @memberof WalletFormContainer
   */
  private renderSeedBackup = () => (
    <WalletSeedBackup
      mnemonics={this.state.mnemonics}
      nextStep={this.to(WALLET_SEED_CONFIRMATION)}
      previousStep={this.rendererSeedBackupPreviousStep}
    />
  )

  /**
   * Method to render seed confirmation step
   *
   * @private
   * @memberof WalletFormContainer
   */
  private renderSeedConfirmation = () => (
    <WalletSeedConfirmation
      errorMessage={this.state.seedErrorMessage}
      inputValue={this.state.confirmMnemonics}
      onChangeInput={this.onChangeInput}
      nextStep={this.seedConfirmationNextStep}
      previousStep={this.to(WALLET_SEED_BACKUP)}
    />
  )

  /**
   * Method to render encryption password step
   *
   * @private
   * @memberof WalletFormContainer
   */
  private renderEncryptionPassword = () => (
    <WalletEncryptionPassword
      errorMessage={this.state.passwordErrorMessage}
      onChangePassword={this.onChangePassword}
      password={this.state.password}
      repeatPassword={this.state.repeatPassword}
      onChangeRepeatPassword={this.OnChangeRepeatPassword}
      nextStep={this.encryptionPasswordNextStep}
      previousStep={this.to(WALLET_SEED_CONFIRMATION)}
    />
  )

  /**
   * Method to render import mnemonics step
   *
   * @private
   * @memberof WalletFormContainer
   */
  private renderImportMnemonics = () => (
    <WalletSeedValidation
      title="Import mnemonics"
      text="Please type here your mnemonics:"
      inputValue={this.state.importSeed}
      errorMessage={this.state.seedErrorMessage}
      onChangeInput={this.onChangeImportSeed}
      nextStep={this.mnemonicsValidationNextStep}
      previousStep={this.to(WALLET_SEED_TYPE_SELECTION)}
    />
  )

  /**
   * Method to render import xprv step
   *
   * @private
   * @memberof WalletFormContainer
   */
  private renderImportXprv = () => (
    <WalletSeedValidation
      title="Import master key"
      text="Please type here your master key:"
      inputValue={this.state.importSeed}
      errorMessage={this.state.seedErrorMessage}
      onChangeInput={this.onChangeImportSeed}
      nextStep={this.xprvValidationNextStep}
      previousStep={this.to(WALLET_SEED_TYPE_SELECTION)}
    />
  )

  /**
   * Method to render address generation step
   *
   * @private
   * @memberof WalletFormContainer
   */

  /** render */
  public render() {
    return (
      <>
        <WalletForm spinner={this.state.spinner}>
          <Switch>
            <Route
              path={WALLET_SEED_TYPE_SELECTION}
              render={this.renderSeedTypeSelection}
            />
            <Route
              path={WALLET_SEED_BACKUP}
              render={this.renderSeedBackup}
            />
            <Route
              path={WALLET_SEED_CONFIRMATION}
              render={this.renderSeedConfirmation}
            />
            <Route
              path={WALLET_ENCRYPTION_PASSWORD}
              render={this.renderEncryptionPassword}
            />
            <Route
              path={WALLET_IMPORT_MNEMONICS}
              render={this.renderImportMnemonics}
            />
            <Route
              path={WALLET_IMPORT_XPRV}
              render={this.renderImportXprv}
            />
            <Route
              path="/"
              render={this.renderWelcome}
            />
          </Switch>
        </WalletForm>
      </>
    )
  }
}

/**
 * Connect react component with redux store
 */
export default connect<StateProps, DispatchProps, any, StoreState>(
  mapStateToProps,
  mapDispatchToProps
)(WalletFormContainer)
