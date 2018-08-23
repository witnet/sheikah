import * as React from "react"

import { TabInfo, TabComponent } from "app/renderer/ui/components/main/sections"
import Wrapper from "app/renderer/ui/components/wrapper"
import { DefaultInput } from "app/renderer/ui/components/input"
import { ActionButton } from "app/renderer/ui/components/button"

import * as urls from "app/renderer/constants/urls"

const styles = require("./style.scss")

/**
 * TabSend component
 *
 * @class TabSend
 * @extends {TabComponent<any>}
 */
class TabSend extends TabComponent<any> {
  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {
    return (
      <Wrapper title="NEW PAYMENT REQUEST" className={styles.pending}>
        <div className={styles["new-transaction"]}>
          <label className={styles.label}>Address</label>
          <DefaultInput className={`${styles.input} ${styles["large-input"]}`} />
          <p className={styles.info}><i className={`fa fa-info ${styles.icon}`} />
            Don't forget to double check the address before pressing 'Send'
          </p>
          <label className={styles.label}>Label</label>
          <DefaultInput className={`${styles.input} ${styles["large-input"]}`} />
          <label className={styles.label}>Amount</label>
          <DefaultInput className={`${styles.input} ${styles["small-input"]}`} />
          <label className={styles.label}>Fee</label>
          <DefaultInput className={`${styles.input} ${styles["small-input"]}`} />
          <ActionButton
            className={styles.submit}
            onClick={this.props.services.showUnimplementedMessage}
          >
            SIGN AND SEND
          </ActionButton>
        </div>
      </Wrapper>
    )
  }
}

const SendTab: TabInfo = {
  key: "send",
  caption: "Send",
  path: urls.SEND_TAB,
  component: TabSend
}

export default SendTab
