import { Account, WalletInfos, Wallet } from "app/common/runtimeTypes/storage/wallets"
import { ComputedTransactions } from "app/renderer/prefilledTransactions"

// Optional state for the wallet
export type WalletOption = Wallet | false

// Optional state for the account
export type AccountOption = Account | false

// Main store state
export interface StoreState {
  walletInfos: WalletInfos
  wallet: WalletOption
  transactions: ComputedTransactions
}
