import * as t from "io-ts"

export const CURRENT_WALLETS_VERSION = 0
export const CURRENT_WALLET_VERSION = 0
export const CURRENT_TRANSACTIONS_VERSION = 0

export const Version = t.type({
  _v: t.number
}, "Version")
export type Version = t.TypeOf<typeof Version>
