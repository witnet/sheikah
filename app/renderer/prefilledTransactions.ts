import { prefilledWalletCaption } from "./prefilledWallet"

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
  epoch?: number,

  // Date in POSIX time (could be derived from the epoch)
  date?: number,

  // Timelock in POSIX time
  timelock: number,
}

// Type to represent an array of transactions (as represented in the UI)
export type ComputedTransactions = Array<ComputedTransaction>

/**
 * Extend transactions for prefilled Transactions
 *
 * @export
 * @param {ComputedTransactions} transactions
 * @param {string} caption
 * @returns
 */
export const extendTransactionsData = (transactions: ComputedTransactions, caption: string) => {
  if (caption.trim() === prefilledWalletCaption.trim()) {
    return [...transactions, ...prefilledTransactions]
  } else {
    return transactions
  }
}

/**
 * Const with pre-filled transactions to be used in the pre-filled wallet.
 */

export const prefilledTransactions: ComputedTransactions = [
  {
    type: "incoming",
    addresses: ["twit1qre9fq64r5jgv0t3m8q3tvnqwphxm9xpacvrdhe5"],
    value: 1,
    timelock: 0,
  },
  {
    type: "incoming",
    addresses: ["Genesis block"],
    value: 0.1,
    timelock: 1571650511, // "(Vesting on October 21th 2019)"
  },
  {
    type: "incoming",
    addresses: ["twit1qqfu5rymje59k5wfpu3jympauer0g0rmwvealsr4"],
    value: 2.6,
    epoch: 377,
    date: 1536331543, // "Sept 7th at 14:45 UTC",
    timelock: 0,
  },
  {
    type: "outgoing",
    addresses: ["twit1qpk09r0c33vn4wxj8vkxn9nxaa2ucylg3uumayrx"],
    value: 0.1,
    epoch: 987,
    date: 1536260400, // "Sept 6th at 19:00 UTC",
    timelock: 0,
  },
  {
    type: "incoming",
    addresses: ["twit1qr0tynqm66fpyramrm4g8mtwua4yj6utnsap5733"],
    value: 0.1,
    epoch: 1597,
    date: 1534627618, // "August 18th",
    timelock: 0,
  },
  {
    type: "incoming",
    addresses: ["twit1qqfu5rymje59k5wfpu3jympauer0g0rmwvealsr4"],
    value: 0.5,
    epoch: 610,
    date: 1532954503, // "July 30th",
    timelock: 0,
  },
]
