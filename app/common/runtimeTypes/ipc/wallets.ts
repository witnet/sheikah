import { GENERIC_IPC_ERROR } from "./index"
import { Empty } from "app/common/runtimeTypes/index"
import { Wallets, Wallet } from "app/common/runtimeTypes/storage/wallets"
import * as t from "io-ts"

export const GetWalletsParams = Empty
export type GetWalletsParams = t.TypeOf<typeof GetWalletsParams>

export const GetWalletsResponse = Wallets
export type GetWalletsResponse = t.TypeOf<typeof GetWalletsResponse>

export const ImportSeedParams = t.taggedUnion(
  "kind",
  [
    t.type({
      kind: t.literal("mnemonics"),
      mnemonics: t.string
    }, "mnemonics"),
    t.type({
      kind: t.literal("xprv"),
      xprv: t.string
    }, "xprv")
  ], "ImportSeedParams")
export type ImportSeedParams = t.TypeOf<typeof ImportSeedParams>

const ImportSeedSuccess = t.type({
  kind: t.literal("SUCCESS"),
})

export const importSeedErrors = {
  INVALID_METHOD_PARAMS: t.literal("INVALID_METHOD_PARAMS"),
  INVALID_MNEMONICS: t.literal("INVALID_MNEMONICS"),
  INVALID_XPRV: t.literal("INVALID_XPRV"),
  MISMATCHING_MNEMONICS: t.literal("MISMATCHING_MNEMONICS"),
  UNCONSOLIDATED_UPDATE_FAILURE: t.literal("UNCONSOLIDATED_UPDATE_FAILURE")
}

export const ImportSeedErrors = t.union(Object.values(importSeedErrors))
export type ImportSeedErrors = t.TypeOf<typeof ImportSeedErrors>

export const ImportSeedError = t.type({
  kind: t.literal("ERROR"),
  error: ImportSeedErrors
})
export type ImportSeedError = t.TypeOf<typeof ImportSeedError>

export const ImportSeedResponse = t.taggedUnion("kind", [
  ImportSeedSuccess,
  ImportSeedError,
], "ImportSeedResponse")
export type ImportSeedResponse = t.TypeOf<typeof ImportSeedResponse>

export const GetWalletParams = t.type({
  id: t.string,
  password: t.string
})
export type GetWalletParams = t.TypeOf<typeof GetWalletParams>

export const GetWalletSuccess = t.type({
  kind: t.literal("SUCCESS"),
  wallet: Wallet
})
export type GetWalletSuccess = t.TypeOf<typeof GetWalletSuccess>

export const getWalletErrors = {
  INVALID_PARAMS_TYPE: t.literal("INVALID_PARAMS_TYPE"),
  INVALID_WALLET_TYPE: t.literal("INVALID_WALLET_TYPE"),
  WALLET_NOT_FOUND: t.literal("WALLET_NOT_FOUND"),
  INSUFFICIENT_PERMISSIONS: t.literal("INSUFFICIENT_PERMISSIONS"),
  GENERIC_IPC_ERROR
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

/** Factory function for `GetWalletError` */
export function buildGetWalletError(error: t.LiteralType<GetWalletErrors>) {
  const walletError: GetWalletError = { kind: "ERROR", error: error.value }

  return walletError
}

export const EncryptWalletParams = t.intersection([
  t.type({
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
  ID_GENERATION_ERROR: t.literal("ID_GENERATION_ERROR"),
  INVALID_KEY_PATH: t.literal("INVALID_KEY_PATH"),
  INVALID_METHOD_PARAMS: t.literal("INVALID_METHOD_PARAMS"),
  INVALID_MNEMONICS: t.literal("INVALID_MNEMONICS"),
  INVALID_SEED: t.literal("INVALID_SEED"),
  INVALID_WALLET_ID: t.literal("INVALID_WALLET_ID"),
  STORAGE_CREATION_FAILURE: t.literal("STORAGE_CREATION_FAILURE"),
  UNAVAILABLE_UNCONSOLIDATED_WALLET: t.literal("UNAVAILABLE_UNCONSOLIDATED_WALLET"),
  UNAVAILABLE_WALLET_INFOS: t.literal("UNAVAILABLE_WALLET_INFOS"),
  WALLET_REPLACE_FAILURE: t.literal("WALLET_REPLACE_FAILURE"),
  WALLET_STORE_FAILURE: t.literal("WALLET_STORE_FAILURE"),
  WALLET_PLAIN_STORAGE_FAILURE: t.literal("WALLET_PLAIN_STORAGE_FAILURE"),
}

export const EncryptWalletErrors = t.union(Object.values(encryptWalletErrors))
export type EncryptWalletErrors = t.TypeOf<typeof EncryptWalletErrors>
export const EncryptWalletError = t.type({
  kind: t.literal("ERROR"),
  error: EncryptWalletErrors
}, "EncryptWalletError")
export type EncryptWalletError = t.TypeOf<typeof EncryptWalletError>

export const EncryptWalletResponse = t.taggedUnion(
  "kind",
  [EncryptWalletSuccess, EncryptWalletError],
  "EncryptWalletResponse"
)
export type EncryptWalletResponse = t.TypeOf<typeof EncryptWalletResponse>
