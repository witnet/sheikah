import { Wallets, Wallet } from "app/common/runtimeTypes/storage/wallets"

// Optional state for the wallet
export type WalletOption = Wallet | false

// State for the soft login page
export interface SoftLoginForm {
  id?: string
  password?: string
  unlockInProgress?: boolean
  errorMessage?: string
}

// State for the forms in all the pages
export interface AppForms {
  softLogin: SoftLoginForm
}

// Main store state
export interface StoreState {
  wallets: Wallets
  wallet: WalletOption
  forms: AppForms
}