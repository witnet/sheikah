import * as React from "react"
import Wrapper from "../../../../../wrapper"
import List from '../../../../../list/index';
import { InputDefault } from "../../../../../input"
import { ButtonDefault } from '../../../../../button/index';
import PaymentRequest from "../../../../../paymentRequest"


import { TabInfo, TabComponent } from "../../../index"

import {
  paymentRequest,
  confirmedOptions
} from "../../MockData"

const styles = require("./style.scss")

class TabReceive extends TabComponent<any> {

  public render() {

    return (
      <>
        <div className={styles.left}>
          <Wrapper title="NEW PAYMENT REQUEST" className={styles.pending}>
            <div className={styles["new-payment-request"]}>
              <div className={styles.form}>
                <label className={styles.label}>Label</label>
                <InputDefault className={styles["label-input"]} />
                <label className={styles.label}>Amount</label>
                <InputDefault />
                <label className={styles.label}> Expires </label>
                <InputDefault />
                <ButtonDefault className={styles.submit} text="SAVE AND GENERATE ADDRESS" />
              </div>
              <div className={styles.qr}>
                Your address and QR code will appear here once the payment request is saved
              </div>
            </div>
          </Wrapper>

          <Wrapper title="PENDING AND EXPIRED PAYMENT REQUESTS" caption="Addresses that were generated but never received funds" actions={confirmedOptions}>
            <List dataSource={paymentRequest} renderItem={PaymentRequest}/>
          </Wrapper>
        </div>

        <div className={styles.right}>
          <p className={styles.title}>About payment requests</p>
          <p className={styles.text}>Every time you generate a receiveng address in Sheikah, you can label and store it as a payment request. This allows you to better trace every payment you receive.</p>
          <p className={styles.text}>You can generate as many payment requests at once. However, it is advised that you only generate as you need them, instead of creating a lot of them preemptively.</p>
          <p className={styles.text}>All this data is completely private and it is only stored in your device a encrypted database that only you can read</p>
        </div>
      </>
    )
  }
}

const TransactionsTab: TabInfo = {
  key: "receive",
  caption: "Receive",
  component: TabReceive
}

export default TransactionsTab