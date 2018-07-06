import * as React from "react"

import { TabInfo, TabComponent } from "../../../index"
import Wrapper from "../../../../../wrapper"
import { InputDefault } from "../../../../../input"
import { ButtonDefault } from "../../../../../button"

const styles = require("./style.scss")

class TabSend extends TabComponent<any> {

  public render() {
    return (
      <Wrapper title="NEW PAYMENT REQUEST" className={styles.pending}>
        <div className={styles["new-transaction"]}>
          <label className={styles.label}>Address</label>
          <InputDefault className={`${styles.input} ${styles["large-input"]}`} />
          <p className={styles.info}><i className={`fa fa-info ${styles.icon}`} /> Don't forget to double check the address before pressing 'Send'</p>
          <label className={styles.label}>Label</label>
          <InputDefault className={`${styles.input} ${styles["large-input"]}`} />
          <label className={styles.label}>Amount</label>
          <InputDefault className={`${styles.input} ${styles["small-input"]}`} />
          <label className={styles.label}>Fee</label>
          <InputDefault className={`${styles.input} ${styles["small-input"]}`} />
          <ButtonDefault className={styles.submit} text="SIGN AND SEND" />
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
