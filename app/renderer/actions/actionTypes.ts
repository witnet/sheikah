import { IActionWithPayload } from "app/renderer/actions/helpers"
import { Wallet } from "app/common/runtimeTypes/storage/wallets"

// Types for the actions that arrive at the wallet reducer
export type SaveWalletAction = IActionWithPayload<Wallet>