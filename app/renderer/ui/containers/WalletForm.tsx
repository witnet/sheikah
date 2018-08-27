import log from "app/common/logging"
import {
  encryptWalletErrors, importSeedErrors, ImportSeedResponse,
} from "app/common/runtimeTypes/ipc/wallets"
import { newMnemonicsErrors, WalletInfos } from "app/common/runtimeTypes/storage/wallets"

import { assertNever } from "app/common/utils"
import { IAction } from "app/renderer/actions/helpers"
import { saveWallet, saveTransactions } from "app/renderer/actions/loginForm"
import {
  Client, encryptWallet, newMnemonics, validateMnemonics, validateXprv
} from "app/renderer/api"

import {
  MAIN,
  WALLET_ENCRYPTION_PASSWORD,
  WALLET_IMPORT_MNEMONICS,
  WALLET_IMPORT_XPRV,
  WALLET_SEED_ADVANCED_OPTIONS,
  WALLET_SEED_BACKUP,
  WALLET_SEED_CONFIRMATION,
  WALLET_SEED_DISCLAIMER,
  WALLET_SEED_TYPE_SELECTION,
  WELCOME,
} from "app/renderer/constants/urls"

import { extendWalletData, prefilledWalletCaption } from "app/renderer/prefilledWallet"
import { StoreState } from "app/renderer/store"
import { WalletForm } from "app/renderer/ui/components/walletForm"
import {
  WalletEncryptionPassword, WalletSeedBackup, WalletSeedTypeSelection, WalletSeedValidation, Welcome
} from "app/renderer/ui/components/walletForm/steps"
import WalletAdvancedOptions from "app/renderer/ui/components/walletForm/steps/walletAdvancedOpts"
import WalletSeedDisclaimer from "app/renderer/ui/components/walletForm/steps/walletDisclaimer"
import { lazyNavigateTo, navigateTo } from "app/renderer/utils/routerNavigation"
import * as React from "react"
import { connect } from "react-redux"
import { Route, RouteComponentProps, Switch } from "react-router"
import { bindActionCreators, Dispatch } from "redux"
import { extendTransactionsData } from "app/renderer/prefilledTransactions"
import { Services } from "app/renderer/services"

/**
 * Props that match redux store state
 *
 * @export
 * @interface StateProps
 */
export interface StateProps {
  walletInfos: WalletInfos,
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
  services: Services
}

/**
 * Function to map the dispatch of actions to props
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: Dispatch<IAction>): DispatchProps => {
  return {
    actions: bindActionCreators({ saveWallet, saveTransactions }, dispatch)
  }
}

/**
 * Function to map store state to props
 * @param state
 */
const mapStateToProps = (state: StoreState): StateProps => {
  return ({
    walletInfos: state.walletInfos,
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
   * Component state
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
    spinner: false,
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
      navigateTo(this.props.history, WALLET_SEED_DISCLAIMER)
    },
    newPrefilledSeed: async () => {
      await this.createSeed()
      this.setState({ caption: prefilledWalletCaption })
      navigateTo(this.props.history, WALLET_SEED_DISCLAIMER)
    },

    // Async function to handle advanced seed options
    advancedOptions: async () => {
      navigateTo(this.props.history, WALLET_SEED_ADVANCED_OPTIONS)
    },

    // Async function to handle the import of mnemonics
    importMnemonics: async () => {
      navigateTo(this.props.history, WALLET_IMPORT_MNEMONICS)
    },

    // Async function to handle the import of xprv
    importXprv: async () => {
      navigateTo(this.props.history, WALLET_IMPORT_XPRV)
    },

    // Async function to handle the use of a hardware device
    useHardwareDevice: async () => {
      this.props.services.showUnimplementedMessage()
    },

    backN: async (n: number) => {
      this.props.history.go(n)
    },

    back: async () => {
      this.props.history.goBack()
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
      this.props.actions.saveTransactions(extendTransactionsData([], wallet.caption))

      navigateTo(this.props.history, MAIN)
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
          navigateTo(this.props.history, WELCOME)
          break
        default:
          assertNever(encryptWalletResponse.error)
      }
    }
  }

  /**
   * Seed backup previous step method
   */
  private seedBackupPreviousStep = async () => {
    this.setState({ caption: "", mnemonics: "" })
    this.props.history.go(-2)
  }

  /**
   * Seed backup previous step method
   */
  private genericBack = async () => {
    this.props.history.goBack()
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
        navigateTo(this.props.history, WALLET_ENCRYPTION_PASSWORD)
      } else {
        // TODO: improve error handler issue #321
        switch (mnemonicsValidationResponse.error) {
          case importSeedErrors.INVALID_XPRV.value:
            this.setState({ seedErrorMessage: "Invalid xprv" })
            break
          case importSeedErrors.INVALID_MNEMONICS.value:
            this.setState({ seedErrorMessage: "Invalid mnemonics" })
            break
          case importSeedErrors.MISMATCHING_MNEMONICS.value:
            this.setState({ seedErrorMessage: "Mismatching mnemonics" })
            break
          case importSeedErrors.INVALID_METHOD_PARAMS.value:
            this.setState({ seedErrorMessage: "Invalid method params" })
            break
          case importSeedErrors.UNCONSOLIDATED_UPDATE_FAILURE.value:
            this.setState({ seedErrorMessage: "Unconsolidated update failure" })
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
   * Seed confirmation previous step method
   */
  private seedConfirmationPreviousStep = async () => {
    this.setState({
      seedErrorMessage: "",
      confirmMnemonics: ""
    })
    this.props.history.goBack()
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
      navigateTo(this.props.history, WALLET_ENCRYPTION_PASSWORD)
    } else {
      // TODO: improve error handler issue #321
      switch (seedValidationResponse.error) {
        case importSeedErrors.MISMATCHING_MNEMONICS.value:
          this.setState({ seedErrorMessage: "Mismatching mnemonics" })
          break
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
   * Import seed previous step method, used for mnemonics and xprv
   */
  private importSeedPreviousStep = async () => {
    this.setState({
      importSeed: "",
      seedErrorMessage: ""
    })
    this.props.history.goBack()
  }

  /**
   * On change input for wallet seed confirmation step
   * @param ev
   * @private
   * @memberof WalletFormContainer
   */
  private onChangeInput = async (ev: any) => {
    this.setState({ confirmMnemonics: ev.target.value.replace("\n", "") })
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
    this.setState({ importSeed: ev.target.value.replace("\n", "") })
  }

  /**
   * Encryption password next step function
   *
   * @private
   * @memberof WalletFormContainer
   */
  private encryptionPasswordNextStep = async () => {
    if (this.state.password === this.state.repeatPassword && this.state.password) {
      await this.walletEncryption()
    } else {
      this.setState({ passwordErrorMessage: "Passwords must match" })
    }
  }

  /**
   * Encryption password previous step method
   */
  private seedEncryptionPasswordPreviousStep = async () => {
    this.setState({
      password: "",
      passwordErrorMessage: "",
      repeatPassword: ""
    })
    this.props.history.goBack()
  }

  /**
   * Method to render welcome step
   *
   * @private
   * @memberof WalletFormContainer
   */
  private renderWelcome = () => (
    <Welcome nextStep={lazyNavigateTo(this.props.history, WALLET_SEED_TYPE_SELECTION)} />
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
   * Method to render seed creation disclaimer
   * @private
   * @memberof WalletSeedDisclaimer
   */
  private renderSeedDisclaimer = () => (
    <WalletSeedDisclaimer
      nextStep={lazyNavigateTo(this.props.history, WALLET_SEED_BACKUP)}
      previousStep={this.genericBack}
    />
  )

  /**
   * Method to render seed backup step
   *
   * @private
   * @memberof WalletFormContainer
   */
  private renderSeedBackup = () => (
    <WalletSeedBackup
      mnemonics={this.state.mnemonics}
      nextStep={lazyNavigateTo(this.props.history, WALLET_SEED_CONFIRMATION)}
      previousStep={this.seedBackupPreviousStep}
    />
  )

  /**
   * Method to render seed confirmation step
   *
   * @private
   * @memberof WalletFormContainer
   */
  private renderSeedConfirmation = () => {
    const message = [
      "Please type your 12 word seed phrase exactly as it was shown to you on the previous " +
      "screen.",
      "This step is to confirm that you have copied your seed phrase correctly."
    ]

    return (
      <WalletSeedValidation
        title="Confirm your seed phrase"
        paragraphs={message}
        errorMessage={this.state.seedErrorMessage}
        inputValue={this.state.confirmMnemonics}
        onChangeInput={this.onChangeInput}
        nextStep={this.seedConfirmationNextStep}
        previousStep={this.seedConfirmationPreviousStep}
      />
    )
  }

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
      previousStep={this.seedEncryptionPasswordPreviousStep}
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
      paragraphs={["Please type here your seed phrase:"]}
      inputValue={this.state.importSeed}
      errorMessage={this.state.seedErrorMessage}
      onChangeInput={this.onChangeImportSeed}
      nextStep={this.mnemonicsValidationNextStep}
      previousStep={this.importSeedPreviousStep}
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
      paragraphs={["Please type here your xprv string:"]}
      inputValue={this.state.importSeed}
      errorMessage={this.state.seedErrorMessage}
      onChangeInput={this.onChangeImportSeed}
      nextStep={this.xprvValidationNextStep}
      previousStep={this.importSeedPreviousStep}
    />
  )

  /**
   * Method to render advanced options screen
   *
   * @private
   * @memberof WalletFormContainer
   */
  private renderAdvancedOptions = () => (
    <WalletAdvancedOptions
      nextStep={this.seedTypes}
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
      <WalletForm spinner={this.state.spinner}>
        <Switch>
          <Route
            path={WALLET_SEED_TYPE_SELECTION}
            render={this.renderSeedTypeSelection}
          />
          <Route
            path={WALLET_SEED_DISCLAIMER}
            render={this.renderSeedDisclaimer}
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
            path={WALLET_SEED_ADVANCED_OPTIONS}
            render={this.renderAdvancedOptions}
          />
          <Route
            path="/"
            render={this.renderWelcome}
          />
        </Switch>
      </WalletForm>
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
