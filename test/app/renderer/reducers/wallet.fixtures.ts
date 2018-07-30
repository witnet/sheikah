import { SaveWalletAction } from "app/renderer/actions/actionTypes"
import { Wallet } from "app/common/runtimeTypes/storage/wallets"
import { WalletOption } from "app/renderer/store"

// Empty state
export const emptyState: WalletOption = false

// Non empty state
export const nonEmptyState: WalletOption = {
  id: "initial wallet",
  caption: "initial wallet",
  seed: { kind: "Wip3", mnemonics: { mnemonics: "" }, xprv: "", xpub: "" },
  epochs: { last: 0 },
  purpose: 0x80000003,
  accounts: []
}

// Create dummy wallet
export const newWallet: Wallet = {
  id: "test wallet",
  caption: "test wallet",
  seed: { kind: "Wip3", mnemonics: { mnemonics: "" }, xprv: "", xpub: "" },
  epochs: { last: 1 },
  purpose: 0x80000003,
  accounts: []
}

// Valid action to save a new wallet
export const validSaveWalletAction: SaveWalletAction = {
  type: "SAVE_WALLET",
  payload: newWallet
}

// Invalid action to save a new wallet
export const invalidSaveWalletAction: SaveWalletAction = {
  type: "UNKNOWN_ACTION",
  payload: newWallet
}