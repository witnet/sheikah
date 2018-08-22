import * as t from "io-ts"

import { KeyPath } from "app/common/runtimeTypes/storage/wallets"

export const GenerateAddressParams = t.intersection([
  t.type({
    account: t.number,
  }),
  t.partial({
    label: t.string,
    amount: t.number,
    expirationDate: t.number
  })
], "GenerateAddressParams")

export type GenerateAddressParams = t.TypeOf<typeof GenerateAddressParams>

export const GenerateAddressSuccess = t.type({
  kind: t.literal("SUCCESS"),
  keyPath: KeyPath,
  address: t.string,
  creationDate: t.number
}, "GenerateAddressSuccess")

export type GenerateAddressSuccess = t.TypeOf<typeof GenerateAddressSuccess>

export const GenerateAddressResponse = t.taggedUnion(
  "kind",
  [GenerateAddressSuccess],
  "GenerateAddressResponse"
)

export type GenerateAddressResponse = t.TypeOf<typeof GenerateAddressResponse>
