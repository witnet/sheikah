import * as t from "io-ts"

import { ExternalFinalKey } from "app/common/runtimeTypes/storage/wallets"
import { GENERIC_IPC_ERROR } from "app/common/runtimeTypes/ipc"

export const GenerateAddressParams = t.intersection([
  t.type({
    account: t.number,
  }),
  t.partial({
    label: t.string,
    requestedAmount: t.number,
    expirationDate: t.number
  })
], "GenerateAddressParams")
export type GenerateAddressParams = t.TypeOf<typeof GenerateAddressParams>

export const GenerateAddressSuccess = t.type({
  kind: t.literal("SUCCESS"),
  finalKey: ExternalFinalKey
}, "GenerateAddressSuccess")
export type GenerateAddressSuccess = t.TypeOf<typeof GenerateAddressSuccess>

export const generateAddressErrors = {
  WRONG_PARAMS: t.literal("WRONG_PARAMS"),
  NO_UNLOCKED_WALLET: t.literal("NO_UNLOCKED_WALLET"),
  WRONG_ACCOUNT: t.literal("WRONG_ACCOUNT"),
  NEGATIVE_AMOUNT: t.literal("NEGATIVE_AMOUNT"),
  PAST_EXPIRATION_DATE: t.literal("PAST_EXPIRATION_DATE"),
  TOO_FAR_EXPIRATION_DATE: t.literal("TOO_FAR_EXPIRATION_DATE"),
  WALLET_UPDATE_FAILURE: t.literal("WALLET_UPDATE_FAILURE"),
  WALLET_STORE_FAILURE: t.literal("WALLET_STORE_FAILURE"),
  ADDRESS_ENCODING_FAILURE: t.literal("ADDRESS_ENCODING_FAILURE"),
  GENERIC_IPC_ERROR
}

export const generateAddressErrorMessages = {
  WRONG_PARAMS: "Wrong parameters",
  NO_UNLOCKED_WALLET: "No unlocked wallet",
  WRONG_ACCOUNT: "Wrong account",
  NEGATIVE_AMOUNT: "Negative amount is forbidden",
  PAST_EXPIRATION_DATE: "Past expiration date is forbidden",
  TOO_FAR_EXPIRATION_DATE: "Expiration date is too far",
  WALLET_UPDATE_FAILURE: "Wallet update failure",
  WALLET_STORE_FAILURE: "Wallet store failure",
  ADDRESS_ENCODING_FAILURE: "Address encoding failure",
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
