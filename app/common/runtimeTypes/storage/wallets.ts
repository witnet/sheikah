import * as t from "io-ts"

export const WalletInfo = t.type({
  id: t.string,
  caption: t.string
}, "WalletInfo")
export type WalletInfo = t.TypeOf<typeof WalletInfo>

export const Wallets = t.array(WalletInfo)
export type Wallets = t.TypeOf<typeof Wallets>
