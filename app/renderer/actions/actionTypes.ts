import { IActionWithPayload } from "app/renderer/actions/helpers"
import { Wallet } from "app/common/runtimeTypes/storage/wallets"
import { ComputedTransactions } from "app/renderer/prefilledTransactions"

// Types for the actions that arrive at the wallet reducer
export type SaveWalletAction = IActionWithPayload<Wallet>

export type SaveTransactionsAction = IActionWithPayload<ComputedTransactions>
