import * as React from "react"
import Wrapper from "app/renderer/ui/components/wrapper"
import List from "app/renderer/ui/components/list"
import { DefaultInput, InputAmount } from "app/renderer/ui/components/input"
import PaymentRequest from "app/renderer/ui/components/paymentRequest"
import { TabInfo, TabComponent } from "app/renderer/ui/components/main/sections"

import * as urls from "app/renderer/constants/urls"
import * as api from "app/renderer/api"

import {
  paymentRequest,
} from "app/renderer/ui/components/main/sections/wallet/MockData"
import { ActionButton } from "app/renderer/ui/components/button"
import Spinner from "app/renderer/ui/components/spinner"
import { AlertMessage } from "app/renderer/ui/components/alert"
import { Services } from "app/renderer/services"
import { FinalKey, Account } from "app/common/runtimeTypes/storage/wallets"
import {
  GenerateAddressResponse,
  GenerateAddressParams,
  generateAddressErrorMessages
} from "app/common/runtimeTypes/ipc/address"
import { assertNever } from "app/common/utils"
import { KEYCHAIN_INDICES } from "app/common/constants/wallet"

const styles = require("./style.scss")

/**
 * Props that contain configuration
 *
 * @interface Props
 */
interface Props {
  selectedAccount: number,
  account: Account,
  services: Services,
  saveFinalKey: Function
}

/**
 * TabReceive component
 *
 * @class TabReceive
 * @extends {TabComponent<any>}
 */
class TabReceive extends TabComponent<any & Props> {

  /**
   * Local state to form inputs and loading state
   */
  public state = {
    label: "",
    amount: "",
    expires: "",
    loading: false,
    errorMessage: ""
  }

  /**
   * Method to perform an async call to renderer API to generate a Final Key and
   * resolve/reject a promise depending on the result of that call
   * @param params
   */
  private generateAddress = async (label: string, amount: string, expires: string) => {
    return new Promise<FinalKey>((resolve, reject) => {
      this.parseGenerateAddressParams(label, amount, expires)
        .then(this.apiGenerateAddress)
        .then((response: GenerateAddressResponse) => {
          switch (response.kind) {
            case "SUCCESS":
              resolve(response.finalKey)
              break
            case "ERROR":
              reject(generateAddressErrorMessages[response.error] || "Unknown error")
              break
            default:
              assertNever(response)
          }
        })
        .catch((error) => {
          reject(`GENERATE_ADDRESS_UNEXPECTED_ERROR ${error.message}`)
        })
    })
  }

  /**
   * Parse generate address params and returns an object with valid params
   */
  private parseGenerateAddressParams = async (
    pLabel: string,
    pAmount: string,
    pExpires: string
  ): Promise<GenerateAddressParams> => {
    let result: GenerateAddressParams = { account: this.props.selectedAccount }
    const label = pLabel.trim()
    if (label.length > 0) {
      result = { ...result, label }
    }
    const requestedAmount = Number.parseFloat(pAmount)
    if (!Number.isNaN(requestedAmount)) {
      result = { ...result, requestedAmount }
    }
    const expirationDate = new Date(pExpires).getTime() / 1000
    if (!Number.isNaN(expirationDate)) {
      result = { ...result, expirationDate: Math.floor(expirationDate) }
    }

    return result
  }

  /**
   * Calls API for generating external address
   */
  private apiGenerateAddress = async (params: {
    account: number,
    label?: string,
    requestedAmount?: number,
    expirationDate?: number
  }): Promise<GenerateAddressResponse> => {
    const apiParams: GenerateAddressParams = {
      ...params,
      account: params.account
    }

    return api.generateAddress(this.props.services.apiClient, apiParams)
  }

  /**
   * Method to store inputs in the local state by the input name
   * @param {React.FormEvent} event
   */
  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  /**
   * List item handle click method
   * @param e click params
   */
  private handleClick = async (e: any) => {

    // Set loading state
    this.setState({ loading: true, errorMessage: "" })

    // Generate Address for selected account (array index)
    this.generateAddress(this.state.label, this.state.amount, this.state.expires)
      .then((finalKey) => {
        // Redux reducer for saving final key in selected Account and in external Key Chain
        this.props.saveFinalKey({
          account: this.props.selectedAccount,
          keyChain: KEYCHAIN_INDICES.KEYCHAIN_EXTERNAL,
          finalKey
        })
        // Reset loading state
        this.setState({
          label: "",
          amount: "",
          expires: "",
          loading: false
        })
      })
      .catch((error) => {
        // Reset loading state and show error
        console.log("Error: ", error)
        this.setState({ loading: false, errorMessage: error })
      })
  }

  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {

    const loading = `${styles.loading} ${this.state.loading ? styles.active : ""}`

    const confirmedOptions = ["Option 1", "Option 2", "Option 3"].map((opt: string) => (
      {
        text: opt,
        onClick: () => this.props.services.showUnimplementedMessage()
      }
    ))
    const paymentRequestWithToast = paymentRequest.map(paymentRequest => {
      paymentRequest.actions = confirmedOptions

      return paymentRequest
    })

    return (
      <>
        <div className={styles.left}>
          <Wrapper
            title="NEW PAYMENT REQUEST"
            className={styles.pending}
          >
            <div className={styles["new-payment-request"]}>
              <div className={styles.form}>
                <label className={styles.label}>Label</label>
                <DefaultInput
                  className={styles["label-input"]}
                  type="text"
                  name="label"
                  onChange={this.handleChange}
                  value={this.state.label}
                />
                <label className={styles.label}>Amount</label>
                <InputAmount
                  className={styles["amount-input"]}
                  type="number"
                  min="0"
                  name="amount"
                  onChange={this.handleChange}
                  value={this.state.amount}
                />
                <label className={styles.label}> Expires </label>
                <DefaultInput
                  className={styles["date-input"]}
                  type="datetime-local"
                  name="expires"
                  onChange={this.handleChange}
                  value={this.state.expires}
                />
                <div className={loading}>
                  <Spinner
                    className={styles.spinner}
                    active={this.state.loading}
                  />
                </div>
              </div>
              <AlertMessage
                className={styles.error}
                type="error"
                title="Error"
                description={this.state.errorMessage}
              />
              <ActionButton
                className={styles.submit}
                onClick={this.handleClick}
                disabled={this.state.loading}
              >
                SAVE AND GENERATE ADDRESS
              </ActionButton>
            </div>
          </Wrapper>

          <Wrapper
            title="PENDING AND EXPIRED PAYMENT REQUESTS"
            caption="Addresses that were generated but never received funds"
            actions={confirmedOptions}
          >
            <List dataSource={paymentRequestWithToast} renderItem={PaymentRequest} />
          </Wrapper>
        </div>

        <div className={styles.right}>
          <p className={styles.title}>About payment requests</p>
          <p className={styles.text}>
            Every time you generate a receiveng address in Sheikah, you can label and store it as
            a payment request. This allows you to better trace every payment you receive.
            </p>
          <p className={styles.text}>
            You can generate as many payment requests at once. However,it is advised that you only
            generate as you need them, instead of creating a lot of them preemptively.
            </p>
          <p className={styles.text}>
            All this data is completely private and it is only stored in your device a encrypted
            database that only you can read
            </p>
        </div>
      </>
    )
  }
}

const ReceiveTab: TabInfo = {
  key: "receive",
  caption: "Receive",
  path: urls.RECEIVE_TAB,
  component: TabReceive
}

export default ReceiveTab