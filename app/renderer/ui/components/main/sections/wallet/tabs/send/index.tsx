import * as React from "react";

import {
  TabInfo,
  TabComponent
} from "app/renderer/ui/components/main/sections";
import Wrapper from "app/renderer/ui/components/wrapper";
import { DefaultInput, InputAmount } from "app/renderer/ui/components/input";
import { ActionButton } from "app/renderer/ui/components/button";
import Popover from "app/renderer/ui/components/popover";
import { SelectFees } from "app/renderer/ui/components/select";

import * as urls from "app/renderer/constants/urls";
import { SelectOptionData } from "app/renderer/ui/components/select/fees";

import { selectFeesData as mockSelectFeesData } from "app/renderer/ui/components/main/sections/wallet/MockData";

const styles = require("./style.scss");

/**
 * TabSend component
 *
 * @class TabSend
 * @extends {TabComponent<any>}
 */
class TabSend extends TabComponent<any> {
  // tslint:disable-next-line: completed-docs
  public state = {
    address: "",
    label: "",
    amount: "",
    fee: "high"
  };

  /**
   * Input change handler
   *
   * @private
   * @memberof TabSend
   */
  private inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  /**
   * Select change handler
   *
   * @private
   * @memberof TabSend
   */
  private handleFee = (event: string) => {
    this.setState({ fee: event });
  };
  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {
    const selectFeesData: Array<SelectOptionData> = mockSelectFeesData;

    return (
      <Wrapper title="PAY TO" className={styles.pending}>
        <div className={styles.form}>
          <div className={styles["form-row"]}>
            <label className={styles.label}>Address</label>
            <DefaultInput
              className={styles["address-input"]}
              name="address"
              onChange={this.inputChange}
              value={this.state.address}
            />
            <Popover
              content={
                <p>
                  Don't forget to double check the address before pressing
                  'Send'
                </p>
              }
              trigger="hover"
              placement="right"
            >
              <p className={styles.info}>
                <i className={`fa fa-info ${styles.icon}`} />
              </p>
            </Popover>
          </div>
          <div className={styles["form-row"]}>
            <label className={styles.label}>Label</label>
            <DefaultInput
              className={styles["label-input"]}
              name="label"
              onChange={this.inputChange}
              value={this.state.label}
            />
          </div>
          <div className={styles["form-row"]}>
            <label className={styles.label}>Amount</label>
            <InputAmount
              className={`${styles["amount-input"]}`}
              type="number"
              min="0"
              name="amount"
              onChange={this.inputChange}
              value={this.state.amount}
            />
          </div>
          <div className={styles["form-row"]}>
            <label className={styles.label}>Fee</label>
            <SelectFees
              className={`${styles["fee-input"]}`}
              dataSource={selectFeesData}
              defaultValue={selectFeesData[0].text}
              onChange={this.handleFee}
              value={this.state.fee}
            />
          </div>
          <div className={styles["submit-area"]}>
            <ActionButton
              className={styles["submit-btn"]}
              onClick={this.props.services.showUnimplementedMessage}
            >
              SIGN AND SEND
            </ActionButton>
          </div>
        </div>
      </Wrapper>
    );
  }
}

const SendTab: TabInfo = {
  key: "send",
  caption: "Send",
  path: urls.SEND_TAB,
  component: TabSend
};

export default SendTab;
