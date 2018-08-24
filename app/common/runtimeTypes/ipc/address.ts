import * as t from "io-ts"

import { KeyPath } from "app/common/runtimeTypes/storage/wallets"
import { GENERIC_IPC_ERROR } from "app/common/runtimeTypes/ipc"

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

export const generateAddressErrors = {
  GENERIC_IPC_ERROR
}

export const generateAddressErrorMessages = {
  GENERIC_IPC_ERROR: "Unknown Error"
}

export const GenerateAddressErrors = t.union(Object.values(generateAddressErrors))
export type GenerateAddressErrors = t.TypeOf<typeof GenerateAddressErrors>

export const GenerateAddressError = t.type({
  kind: t.literal("ERROR"),
  error: GenerateAddressErrors
})
export type GenerateAddressError = t.TypeOf<typeof GenerateAddressError>

export const GenerateAddressResponse = t.taggedUnion(
  "kind",
  [GenerateAddressSuccess, GenerateAddressError],
  "GenerateAddressResponse"
)
export type GenerateAddressResponse = t.TypeOf<typeof GenerateAddressResponse>

/** Factory function for `GenerateAddressError` */
export function buildGenerateAddressError(error: t.LiteralType<GenerateAddressErrors>) {
  const addressError: GenerateAddressError = { kind: "ERROR", error: error.value }

  return addressError
}