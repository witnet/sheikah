import { ActionWithPayload } from "app/renderer/actions/helpers"
import { Wallet } from "app/common/runtimeTypes/storage/wallets"
import { ComputedTransactions } from "app/renderer/prefilledTransactions"
import { SaveFinalKeyParams } from "app/renderer/actions"
import { SAVE_WALLET, SAVE_FINALKEY, SAVE_TRANSACTIONS } from "app/renderer/actions/actionNames"

// Type for the transations reducer
export type SaveTransactionsAction =
  ActionWithPayload<typeof SAVE_TRANSACTIONS, ComputedTransactions>

// Types for the wallet reducer
export type SaveWalletAction = ActionWithPayload<typeof SAVE_WALLET, Wallet>
export type SaveFinalKeyAction = ActionWithPayload<typeof SAVE_FINALKEY, SaveFinalKeyParams>