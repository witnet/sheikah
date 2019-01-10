import * as React from "react";
import Wrapper from "app/renderer/ui/components/wrapper";
import List from "app/renderer/ui/components/list";
import { DefaultInput, InputAmount } from "app/renderer/ui/components/input";
import PaymentRequest from "app/renderer/ui/components/paymentRequest";
import {
  TabInfo,
  TabComponent
} from "app/renderer/ui/components/main/sections";

import * as urls from "app/renderer/constants/urls";
import * as api from "app/renderer/api";

import { ActionButton } from "app/renderer/ui/components/button";

import Spinner from "app/renderer/ui/components/spinner";
import { AlertMessage } from "app/renderer/ui/components/alert";
import { Services } from "app/renderer/services";
import {
  FinalKey,
  ExternalFinalKey,
  Wallet
} from "app/common/runtimeTypes/storage/wallets";
import {
  GenerateAddressResponse,
  GenerateAddressParams,
  generateAddressErrorMessages
} from "app/common/runtimeTypes/ipc/address";
import { assertNever } from "app/common/utils";
import { KEYCHAIN_INDICES } from "app/common/constants/wallet";

import {
  buildComputedPaymentRequest,
  Action,
  ComputedPaymentRequest
} from "app/renderer/prefilledPaymentRequests";

import {
  prefilledFinalKeysFunds,
  prefilledAddresses,
  prefilledWalletCaption
} from "app/renderer/prefilledWallet";

import { encodeBech32 } from "app/common/witnet-js/addresses/p2pkh";
import { ChainType } from "app/common/chain/chainType";
import { sleep } from "app/renderer/utils/sleep";
import InputCheck from "../../../../../input/checkbox";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const styles = require("./style.scss");
const grid = require("app/renderer/ui/components/main/style.scss");

/**
 * Props that contain configuration
 *
 * @interface Props
 */
interface Props {
  selectedAccount: number;
  wallet: Wallet;
  services: Services;
  saveFinalKey: Function;
}

/**
 * TabReceive component
 *
 * @class TabReceive
 * @extends {TabComponent<any & Props>}
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
    errorMessage: "",
    check: false
  };

  /**
   * Method to perform an async call to renderer API to generate a Final Key and
   * resolve/reject a promise depending on the result of that call
   * @param params
   */
  private generateAddress = async (
    label: string,
    amount: string,
    expires: string
  ) => {
    return new Promise<FinalKey>((resolve, reject) => {
      this.parseGenerateAddressParams(label, amount, expires)
        .then(this.apiGenerateAddress)
        .then((response: GenerateAddressResponse) => {
          switch (response.kind) {
            case "SUCCESS":
              resolve(response.finalKey);
              break;
            case "ERROR":
              reject(
                generateAddressErrorMessages[response.error] || "Unknown error"
              );
              break;
            default:
              assertNever(response);
          }
        })
        .catch(error => {
          reject(`GENERATE_ADDRESS_UNEXPECTED_ERROR ${error.message}`);
        });
    });
  };

  /**
   * Parse generate address params and returns an object with valid params
   */
  private parseGenerateAddressParams = async (
    pLabel: string,
    pAmount: string,
    pExpires: string
  ): Promise<GenerateAddressParams> => {
    let result: GenerateAddressParams = { account: this.props.selectedAccount };
    const label = pLabel.trim();
    if (label.length > 0) {
      result = { ...result, label };
    }
    const requestedAmount = Number.parseFloat(pAmount);
    if (!Number.isNaN(requestedAmount)) {
      result = { ...result, requestedAmount };
    }
    const expirationDate = new Date(pExpires).getTime() / 1000;
    if (!Number.isNaN(expirationDate)) {
      result = { ...result, expirationDate: Math.floor(expirationDate) };
    }

    return result;
  };

  /**
   * Calls API for generating external address
   */
  private apiGenerateAddress = async (
    params: GenerateAddressParams
  ): Promise<GenerateAddressResponse> => {
    return api.generateAddress(this.props.services.apiClient, params);
  };

  /**
   * Method to store inputs in the local state by the input name
   * @param {React.FormEvent} event
   */
  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  /**
   * List item handle click method
   * @param e click params
   */
  private handleClick = async (e: any) => {
    // Set loading state
    this.setState({ loading: true, errorMessage: "" });

    //Add an insignificant delay (1s) to improve user experience
    await sleep(1000);

    // Generate Address for selected account (array index)
    this.generateAddress(
      this.state.label,
      this.state.amount,
      this.state.expires
    )
      .then(finalKey => {
        // Redux reducer for saving final key in selected Account and in external Key Chain
        this.props.saveFinalKey({
          account: this.props.selectedAccount,
          keyChain: KEYCHAIN_INDICES.KEYCHAIN_EXTERNAL,
          finalKey
        });
        // Reset loading state
        this.setState({
          label: "",
          amount: "",
          expires: "",
          loading: false
        });

        // Show success message
        this.props.services.showSuccess(
          "You have successfully created a payment request"
        );
      })
      .catch(error => {
        // Reset loading state and show error
        this.setState({ loading: false, errorMessage: error });
      });
  };
  /**
   *
   * Handle checkbox value and show expires input
   * @private
   * @memberof TabReceive
   */
  private handleCheck = async (e: CheckboxChangeEvent) => {
    this.setState({ check: !this.state.check });
  };
  /**
   * Method to map account to payment requests
   */
  private mapAccountToPaymentRequests = (
    options: Array<Action>
  ): Array<ComputedPaymentRequest> => {
    // Check if wallet is prefilled or not
    // Not prefilled wallets will have 0 funds for the time being and the
    // address shown will be real
    const isPrefilledWallet =
      this.props.wallet.caption === prefilledWalletCaption;

    return this.props.wallet.accounts[this.props.selectedAccount].keyChains[
      KEYCHAIN_INDICES.KEYCHAIN_EXTERNAL
    ].finalKeys
      .map((finalKey: FinalKey, index: number) => {
        return buildComputedPaymentRequest(
          finalKey as ExternalFinalKey,
          isPrefilledWallet && index < prefilledAddresses.length
            ? prefilledAddresses[index]
            : encodeBech32(finalKey.pkh, ChainType.test),
          isPrefilledWallet && index < prefilledFinalKeysFunds.length
            ? prefilledFinalKeysFunds[index]
            : 0,
          options
        );
      })
      .reverse();
  };

  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {
    const loading = `${styles.loading} ${
      this.state.loading ? styles.active : styles.disabled
    }`;

    const listOptions = ["Export all payment requests as CSV"].map(
      (opt: string) => ({
        text: opt,
        onClick: () => this.props.services.showUnimplementedMessage()
      })
    );

    const itemOptions = [
      "Copy address",
      "Generate QR code",
      "View related transactions in block explorer"
    ].map((opt: string) => ({
      text: opt,
      onClick: () => this.props.services.showUnimplementedMessage()
    }));

    const paymentRequestsList = (
      <List
        classNameList={styles.list}
        dataSource={this.mapAccountToPaymentRequests(itemOptions)}
        renderItem={PaymentRequest}
        emptyIcon="generic"
        emptyText="You don't have payment requests"
      />
    );

    const noPaymentRequests =
      this.props.wallet.accounts[this.props.selectedAccount].keyChains[
        KEYCHAIN_INDICES.KEYCHAIN_EXTERNAL
      ].finalKeys.length === 0;

    const expirationDateInput = this.state.check && (
      <DefaultInput
        className={styles["date-input"]}
        type="datetime-local"
        name="expires"
        onChange={this.handleChange}
        value={this.state.expires}
      />
    );

    return (
      <>
        <div className={grid["layout"]}>
          <div className={grid["receive-main"]}>
            <Wrapper
              title="NEW PAYMENT REQUEST"
              className={`${styles["new-payment-request"]}`}
            >
              <div className={styles.form}>
                <div className={styles["form-row"]}>
                  <label className={styles.label}>Label</label>
                  <DefaultInput
                    className={styles["label-input"]}
                    type="text"
                    name="label"
                    onChange={this.handleChange}
                    value={this.state.label}
                  />
                </div>
                <div className={styles["form-row"]}>
                  <label className={styles.label}>Amount</label>
                  <InputAmount
                    className={styles["amount-input"]}
                    type="number"
                    min="0"
                    name="amount"
                    onChange={this.handleChange}
                    value={this.state.amount}
                  />
                </div>
                <div className={styles["form-row"]}>
                  <label className={styles.label}>Expires</label>
                  <InputCheck
                    className={styles["input-check"]}
                    name="expiresCheck"
                    onChange={this.handleCheck}
                  />
                  {expirationDateInput}
                </div>
                <div className={`${styles["form-row"]} ${styles["submit"]}`}>
                  <ActionButton
                    className={styles.submit}
                    onClick={this.handleClick}
                    disabled={this.state.loading}
                  >
                    SAVE AND GENERATE ADDRESS
                  </ActionButton>
                </div>
              </div>
              <div className={loading}>
                <Spinner
                  className={styles.spinner}
                  active={this.state.loading}
                />
              </div>
              <AlertMessage
                className={styles.error}
                type="error"
                title="Error"
                description={this.state.errorMessage}
              />
            </Wrapper>

            <Wrapper
              title="MY PAYMENT REQUESTS"
              actions={listOptions}
              empty={noPaymentRequests}
              className={styles["payment-requests"]}
            >
              {paymentRequestsList}
            </Wrapper>

            <div className={grid["about-side"]}>
              <p className={styles.title}>About payment requests</p>
              <p className={styles.text}>
                Every time you generate a receiveng address in Sheikah, you can
                label and store it as a payment request. This allows you to
                better trace every payment you receive.
              </p>
              <p className={styles.text}>
                You can generate as many payment requests at once. However,it is
                advised that you only generate as you need them, instead of
                creating a lot of them preemptively.
              </p>
              <p className={styles.text}>
                All this data is completely private and it is only stored in
                your device a encrypted database that only you can read
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const ReceiveTab: TabInfo = {
  key: "receive",
  caption: "Receive",
  path: urls.RECEIVE_TAB,
  component: TabReceive
};

export default ReceiveTab;
