import { ComputedTransaction, ComputedTransactions } from "app/renderer/prefilledTransactions"
import { ConfirmedTransactionProps } from "app/renderer/ui/components/transaction/confirmed"
import { PendingTransactionProps } from "app/renderer/ui/components/transaction/pending"
// TODO: Add reselect #issue-?
export const filterConfirmedTransactions = (transactions: ComputedTransactions)
: Array<ConfirmedTransactionProps> => {
  return transactions.length
    ? transactions.filter(transaction => transaction.epoch)
      .map((transaction: ComputedTransaction) => (
        {
          address: `${transaction.addresses[0]}`,
          receiver: transaction.type === "incoming",
          amount: transaction.value,
          block: `${transaction.epoch}`,
          // From seconds to ms
          date: transaction.date ? new Date(transaction.date * 1000) : undefined
        }
      ))
    : []
}

export const filterPendingTransactions = (transactions: ComputedTransactions)
: Array<PendingTransactionProps> => {
  return transactions.length
    ? transactions
      .filter(transaction => !transaction.epoch)
      .map((transaction: ComputedTransaction) => (
        {
          status: transaction.timelock === 0 ? "unconfirmed" : "timelocked",
          address: `${transaction.addresses[0]}`,
          receiver: transaction.type === "incoming",
          amount: `${transaction.value}`,
          vestingTime: transaction.timelock !== 0
          // From seconds to ms
            ? new Date(transaction.timelock * 1000)
            : undefined
        }
      ))
      : []
}