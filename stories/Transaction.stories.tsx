import * as React from "react"
import { storiesOf } from "@storybook/react"
import { ConfirmedTransaction, PendingTransaction } from "../app/renderer/ui/components/transaction"

storiesOf("Transaction", module)
  .add("Confirmed positive", () => (
    <ConfirmedTransaction
      address="wit1qre9fq64r5jgv0t3m8q3tvnqwphxm9xpacvrdhe5"
      receiver={true}
      amount={0.1}
      block="92673"
      date={new Date(23, 3, 2019)}
    />
  ))
  .add("Confirmed negative", () => (
    <ConfirmedTransaction
      address="wit1qre9fq64r5jgv0t3m8q3tvnqwphxm9xpacvrdhe5"
      receiver={false}
      amount={-0.1}
      block="92673"
      date={new Date(23, 3, 2019)}
    />
  ))
  .add("Pending unconfirmed", () => (
    <PendingTransaction
      status="unconfirmed"
      address="wit1qre9fq64r5jgv0t3m8q3tvnqwphxm9xpacvrdhe5"
      receiver={true}
      amount="+1"
    />
  ))
  .add("Pending confirmed", () => (
    <PendingTransaction
      status="timelocked"
      address="Genesis block"
      receiver={true}
      amount="+0.1"
      vestingTime={new Date(21, 10, 2019)}
    />
  ))
