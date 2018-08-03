import { SaveWalletAction } from "app/renderer/actions/actionTypes"
import { Wallet, CURRENT_WALLET_VERSION } from "app/common/runtimeTypes/storage/wallets"
import { WalletOption } from "app/renderer/store"

// Empty state
export const emptyState: WalletOption = false

// Non empty state
export const nonEmptyState: WalletOption = {
  _v: CURRENT_WALLET_VERSION,
  id: "initial wallet",
  caption: "initial wallet",
  seed: {
    mnemonics: "",
    kind: "Wip3",
    seed: { masterSecret: Buffer.from(""), chainCode: Buffer.from("") }
  },
  epochs: { last: 0 },
  purpose: 0x80000003,
  accounts: []
}

// Create dummy wallet
export const newWallet: Wallet = {
  _v: CURRENT_WALLET_VERSION,
  id: "test wallet",
  caption: "test wallet",
  seed: {
    mnemonics: "",
    kind: "Wip3",
    seed: { masterSecret: Buffer.from(""), chainCode: Buffer.from("") }
  },
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