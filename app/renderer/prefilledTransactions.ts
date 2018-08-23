/**
 * Transaction type:
 *  Outgoing (to)
 *  Incoming (from) type
 *  Internal (change) type
 */
export type ComputedTransactionType = "incoming" | "outgoing" | "internal"

/**
 * Computed transaction interface, from which different categories may be extracted:
 *   Pending -> !epoch
 *     + Unconfirmed -> !epoch && timelock==0
 *     + Timelocked -> !epoch && timelock !=0
 *   Confirmed -> epoch
 */
export interface ComputedTransaction {
  // Tx type
  type: ComputedTransactionType,

  // Value (in WITs)
  value: number,

  // Addresses
  addresses: Array<string>,

  // Epoch (block height)
  epoch?: number

  // Date in POSIX time (could be derived from the epoch)
  date?: number

  // Timelock in POSIX time
  timelock: number
}

// Type to represent an array of transactions (as represented in the UI)
export type ComputedTransactions = Array<ComputedTransaction>

/**
 * Const with pre-filled transactions to be used in the pre-filled wallet.
 */
export const prefilledTransactions: ComputedTransactions = [
  {
    type: "incoming",
    addresses: ["wit1qre9fq64r5jgv0t3m8q3tvnqwphxm9xpacvrdhe5"],
    value: 1,
    timelock: 0
  },
  {
    type: "incoming",
    addresses: ["Genesis block"],
    value: 0.1,
    timelock: 1571650511 // "(Vesting on October 21th 2019)"
  },
  {
    type: "incoming",
    addresses: ["wit1qre9fq64r5jgv0t3m8q3tvnqwphxm9xpacvrdhe5"],
    value: 0.1,
    epoch: 92673,
    date: 1556030291, //"April 23 at 14:38",
    timelock: 0
  },
  {
    type: "outgoing",
    addresses: ["wit1qre9fq64r5jgv0t3m8q3tvnqwphxm9xpacvrdhe5"],
    value: 0.1,
    epoch: 92673,
    date: 1556030291, //"April 23 at 14:38",
    timelock: 0
  },
  {
    type: "incoming",
    addresses: ["wit1qre9fq64r5jgv0t3m8q3tvnqwphxm9xpacvrdhe5"],
    value: 0.1,
    epoch: 92673,
    date: 1556030291, //"April 23 at 14:38",
    timelock: 0
  }
]
