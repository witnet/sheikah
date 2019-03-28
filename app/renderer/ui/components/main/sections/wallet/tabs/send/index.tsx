import * as React from "react"

import {
  TabInfo,
  TabComponent,
} from "app/renderer/ui/components/main/sections"
import Wrapper from "app/renderer/ui/components/wrapper"
import { DefaultInput, InputAmount } from "app/renderer/ui/components/input"
import { Button } from "app/renderer/ui/components/button"
import Popover from "app/renderer/ui/components/popover"
import { SelectFees } from "app/renderer/ui/components/select"

import * as urls from "app/renderer/constants/urls"
import { SelectOptionData } from "app/renderer/ui/components/select/fees"

import {
  selectFeesData as mockSelectFeesData,
} from "app/renderer/ui/components/main/sections/wallet/MockData"

const styles = require("./style.scss")

/**
 * TabSend component
 *
 * @class TabSend
 * @extends {TabComponent<any>}
 */
class TabSend extends TabComponent<any> {
  public state = {
    address: "",
    label: "",
    amount: "",
    fee: "high",
  }

  /**
   * Input change handler
   *
   * @private
   * @memberof TabSend
   */
  private inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  /**
   * Select change handler
   *
   * @private
   * @memberof TabSend
   */
  private handleFee = (event: string) => {
    this.setState({ fee: event })
  }
  public render() {
    const selectFeesData: Array<SelectOptionData> = mockSelectFeesData

    return (
      <div className={styles.left}>
        <Wrapper title="PAY TO" className={styles.pending}>
          <div className={styles["new-transaction"]}>
            <label className={styles.label}>Address</label>
            <DefaultInput
              className={`${styles.input} ${styles["large-input"]}`}
              name="address"
              onChange={this.inputChange}
              value={this.state.address}
            />
            <Popover
              content={<p>Don't forget to double check the address before pressing 'Send'</p>}
              trigger="hover"
              placement="right"
            >
              <p className={styles.info}>
                <i className={`fa fa-info ${styles.icon}`} />
              </p>
            </Popover>
            <label className={styles.label}>Label</label>
            <DefaultInput
              className={`${styles.input} ${styles["large-input"]}`}
              name="label"
              onChange={this.inputChange}
              value={this.state.label}
            />
            <label className={styles.label}>Amount</label>
            <InputAmount
              className={`${styles.input} ${styles["small-input"]} ${styles["amount-input"]}`}
              type="number"
              min="0"
              name="amount"
              onChange={this.inputChange}
              value={this.state.amount}
            />
            <label className={styles.label}>Fee</label>
            <SelectFees
              className={`${styles.input} ${styles["small-input"]}`}
              dataSource={selectFeesData}
              defaultValue={selectFeesData[0].text}
              onChange={this.handleFee}
              value={this.state.fee}
            />
            <Button
              type="action"
              className={styles.submit}
              onClick={this.props.services.showUnimplementedMessage}
            >
              SIGN AND SEND
            </Button>
          </div>
        </Wrapper>
      </div>
    )
  }
}

const SendTab: TabInfo = {
  key: "send",
  caption: "Send",
  path: urls.SEND_TAB,
  component: TabSend,
}

export default SendTab
