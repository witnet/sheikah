import * as t from "io-ts"

export const WalletInfo = t.type({
  id: t.string,
  caption: t.string
}, "WalletInfo")
export type WalletInfo = t.TypeOf<typeof WalletInfo>

export const Wallets = t.array(WalletInfo)
export type Wallets = t.TypeOf<typeof Wallets>

const Mnemonics = t.type({
  mnemonics: t.string
})

export const NewMnemonicsResponse = t.exact(Mnemonics)
export type NewMnemonicsResponse = t.TypeOf<typeof NewMnemonicsResponse>

// UnconsolidatedWallet represents a transient wallet which is being created
export const UnconsolidatedWallet = t.intersection([
  Mnemonics,
  t.partial({
    id: t.string,
    caption: t.string
  })
])
export type UnconsolidatedWallet = t.TypeOf<typeof UnconsolidatedWallet>