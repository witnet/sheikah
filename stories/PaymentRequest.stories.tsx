import *  as React from "react"
import { storiesOf } from "@storybook/react"
import PaymentRequest from "../app/renderer/ui/components/paymentRequest"

const confirmedOptions = [
  {
    text: "Option 1",
    onClick: () => console.log("CLICKED 1")
  },
  {
    text: "Option 2",
    onClick: () => console.log("CLICKED 2")
  },
  {
    text: "Option 3",
    onClick: () => console.log("CLICKED 3")
  }
]

storiesOf("PaymentRequest", module)
  .add("Still into force", () => (
    <div style={{ width: 600 }}>
    <PaymentRequest
      creationDate="May 17, 2018"
      expirationDate="May 15, 2018"
      status="still into force"
      from="Satoshi Nakamoto"
      amount="1"
      actions={confirmedOptions}
    />
    </div>
  ))
  .add("expired", () => (
    <div style={{ width: 600 }}>
      <PaymentRequest
        creationDate="May 17, 2018"
        expirationDate="May 15, 2018"
        status="expired"
        from="Nick Szabo"
        amount="1"
        actions={confirmedOptions}
      />
    </div>
  ))
  .add("never funded", () => (
    <div style={{ width: 600 }}>
      <PaymentRequest
        creationDate="May 17, 2018"
        status="never funded"
        from="Hal Finney"
        amount="1"
        actions={confirmedOptions}
      />
    </div>
  ))
