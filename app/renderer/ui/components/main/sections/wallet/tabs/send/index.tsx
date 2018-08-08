import * as React from "react"

import { TabInfo, TabComponent } from "app/renderer/ui/components/main/sections"
import Wrapper from "app/renderer/ui/components/wrapper"
import { InputDefault } from "app/renderer/ui/components/input"
import { ButtonDefault } from "app/renderer/ui/components/button"

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
          <InputDefault className={`${styles.input} ${styles["large-input"]}`} />
          <p className={styles.info}><i className={`fa fa-info ${styles.icon}`} />
            Don't forget to double check the address before pressing 'Send'
          </p>
          <label className={styles.label}>Label</label>
          <InputDefault className={`${styles.input} ${styles["large-input"]}`} />
          <label className={styles.label}>Amount</label>
          <InputDefault className={`${styles.input} ${styles["small-input"]}`} />
          <label className={styles.label}>Fee</label>
          <InputDefault className={`${styles.input} ${styles["small-input"]}`} />
          <ButtonDefault className={styles.submit} >SIGN AND SEND</ButtonDefault>
        </div>
      </Wrapper>
    )
  }
}

const TransactionsTab: TabInfo = {
  key: "send",
  caption: "Send",
  component: TabSend
}

export default TransactionsTab
