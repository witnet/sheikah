import * as React from "react"
import { storiesOf } from "@storybook/react"
import { ConfirmedTransaction, PendingTransaction } from "../app/renderer/ui/components/transaction"

storiesOf("Transaction", module)
  .add("Confirmed positive", () => (
    <ConfirmedTransaction
      address="wit1qre9fq64r5jgv0t3m8q3tvnqwphxm9xpacvrdhe5"
      receiver={true}
      amount="+0.1"
      block="92673"
      date="April 23 at 14:38"
    />
  ))
  .add("Confirmed negative", () => (
    <ConfirmedTransaction
      address="wit1qre9fq64r5jgv0t3m8q3tvnqwphxm9xpacvrdhe5"
      receiver={false}
      amount="-0.1"
      block="92673"
      date="April 23 at 14:38"
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
      vestingTime="(Vesting on October 21th 2019)"
    />
  ))
