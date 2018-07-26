import { SoftLoginForm } from "app/renderer/store"
import { IActionWithPayload } from "app/renderer/actions/helpers"
import { Wallet } from "app/common/runtimeTypes/storage/wallets"

// Types for the actions that arrive at the soft login reducer
export type SoftLoginKey = keyof SoftLoginForm
export type SoftLoginAction = IActionWithPayload<Partial<SoftLoginForm> | SoftLoginKey>

// Types for the actions that arrive at the forms reducer
export type FormsAction = IActionWithPayload<SoftLoginAction>

// Types for the actions that arrive at the wallet reducer
export type SaveWalletAction = IActionWithPayload<Wallet>