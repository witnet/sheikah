import { Empty } from "app/common/runtimeTypes/index"
import { Wallets, Wallet } from "app/common/runtimeTypes/storage/wallets"
import * as t from "io-ts"

export const GetWalletsParams = Empty
export type GetWalletsParams = t.TypeOf<typeof GetWalletsParams>

export const GetWalletsResponse = Wallets
export type GetWalletsResponse = t.TypeOf<typeof GetWalletsResponse>

export const ValidateMnemonicsParams = t.type({
  mnemonics: t.string
})
export type ValidateMnemonicsParams = t.TypeOf<typeof ValidateMnemonicsParams>

const ValidateMnemonicsSuccess = t.type({
  kind: t.literal("SUCCESS"),
  id: t.string
})

export const validateMnemonicsErrors = {
  INVALID_METHOD_PARAMS: t.literal("INVALID_METHOD_PARAMS"),
  ID_GENERATION_ERROR: t.literal("ID_GENERATION_ERROR"),
  INVALID_MNEMONICS: t.literal("INVALID_MNEMONICS"),
  MISMATCHING_MNEMONICS: t.literal("MISMATCHING_MNEMONICS"),
  UNCONSOLIDATED_UPDATE_FAILURE: t.literal("UNCONSOLIDATED_UPDATE_FAILURE")
}

export const ValidateMnemonicsErrors = t.union(Object.values(validateMnemonicsErrors))
export type ValidateMnemonicsErrors = t.TypeOf<typeof ValidateMnemonicsErrors>

export const ValidateMnemonicsError = t.type({
  kind: t.literal("ERROR"),
  error: ValidateMnemonicsErrors
})
export type ValidateMnemonicsError = t.TypeOf<typeof ValidateMnemonicsError>

export const ValidateMnemonicsResponse = t.taggedUnion("kind", [
  ValidateMnemonicsSuccess,
  ValidateMnemonicsError,
], "ValidateMnemonicsResponse")
export type ValidateMnemonicsResponse = t.TypeOf<typeof ValidateMnemonicsResponse>

export const GetWalletParams = t.type({
  id: t.string,
  password: t.string
})
export type GetWalletParams = t.TypeOf<typeof GetWalletParams>

export const GetWalletSuccess = t.type({
  kind: t.literal("SUCCESS"),
  wallet: Wallet
})
export type GetWalletSucccess = t.TypeOf<typeof GetWalletSuccess>

export const getWalletErrors = {
  INVALID_PARAMS_TYPE: t.literal("INVALID_PARAMS_TYPE"),
  INVALID_WALLET_TYPE: t.literal("INVALID_WALLET_TYPE"),
  WALLET_NOT_FOUND: t.literal("WALLET_NOT_FOUND"),
  INSUFFICIENT_PERMISSIONS: t.literal("INSUFFICIENT_PERMISSIONS")
}

export const GetWalletErrors = t.union(Object.values(getWalletErrors))
export type GetWalletErrors = t.TypeOf<typeof GetWalletErrors>

export const GetWalletError = t.type({
  kind: t.literal("ERROR"),
  error: GetWalletErrors
})
export type GetWalletError = t.TypeOf<typeof GetWalletError>

export const GetWalletResponse = t.taggedUnion("kind", [GetWalletSuccess, GetWalletError])
export type GetWalletResponse = t.TypeOf<typeof GetWalletResponse>
export const EncryptWalletParams = t.intersection([
  t.type({
    id: t.string,
    password: t.string
  }),
  t.partial({
    caption: t.string
  })
])

export type EncryptWalletParams = t.TypeOf<typeof EncryptWalletParams>

export const EncryptWalletSuccess = t.type({
  kind: t.literal("SUCCESS"),
  wallet: Wallet
}, "EncryptWalletSuccess")

export const encryptWalletErrors = {
  STORAGE_CREATION_FAILURE: t.literal("STORAGE_CREATION_FAILURE"),
  WRONG_TYPE_PARAMS: t.literal("WRONG_TYPE_PARAMS"),
  UNAVAILABLE_UNCONSOLIDATED_WALLET: t.literal("UNAVAILABLE_UNCONSOLIDATED_WALLET"),
  INVALID_WALLET_ID: t.literal("INVALID_WALLET_ID"),
  WALLET_STORE_FAILURE: t.literal("WALLET_STORE_FAILURE"),
  WALLET_REPLACE_FAILURE: t.literal("WALLET_REPLACE_FAILURE"),
  INVALID_MNEMONICS: t.literal("INVALID_MNEMONICS")
}

export const EncryptWalletError = t.type({
  kind: t.literal("ERROR"),
  error: t.union(Object.values(encryptWalletErrors))
}, "EncryptWalletError")
export type EncryptWalletError = t.TypeOf<typeof EncryptWalletError>

export const EncryptWalletResponse = t.taggedUnion(
  "kind",
  [EncryptWalletSuccess, EncryptWalletError],
  "EncryptWalletResponse"
)
export type EncryptWalletResponse = t.TypeOf<typeof EncryptWalletResponse>