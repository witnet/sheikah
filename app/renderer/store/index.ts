import { WalletInfos, Wallet } from "app/common/runtimeTypes/storage/wallets"
import { Transactions } from "app/common/runtimeTypes/storage/transactions"

// Optional state for the wallet
export type WalletOption = Wallet | false
export type TransactionsOption = Transactions | {}

// Main store state
export interface StoreState {
  walletInfos: WalletInfos
  wallet: WalletOption
  transactions: Transactions
}
