import { AppInfo } from "app/common/runtimeTypes/storage/app"
import { Wallets, UnconsolidatedWallet } from "app/common/runtimeTypes/storage/wallets"
import * as t from "io-ts"

export const AppState = t.intersection([
  t.type({
    _seq: t.number,
    wallets: Wallets,
  }),
  t.partial({
    appInfo: AppInfo,
    unconsolidatedWallet: UnconsolidatedWallet
  })
], "AppState")
export type AppState = t.TypeOf<typeof AppState>

export const GetStateParams = t.type({ })
export type GetStateParams = t.TypeOf<typeof GetStateParams>

export const GetStateResponse = AppState
export type GetStateResponse = t.TypeOf<typeof GetStateResponse>