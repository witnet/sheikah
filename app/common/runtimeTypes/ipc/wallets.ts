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

export namespace ValidateMnemonicsResponses {
  // Success case
  export const Id = t.type({
    tag: t.literal("id"),
    id: t.string
  })
  export type Id = t.TypeOf<typeof Id>

  /** Factory function for `Id` response */
  export function id(id: string): Id {
    return { tag: "id", id }
  }

  // Error due to invalid mnemonic
  export const Invalid = t.type({ tag: t.literal("invalid") })
  export type Invalid = t.TypeOf<typeof Invalid>

  /** Factory function for `Invalid` response */
  export function invalid(): Invalid {
    return { tag: "invalid" }
  }

  // Error due to mnemonic not matching the one in the unconsolidated wallet in the app state
  export const MatchError = t.type({ tag: t.literal("matcherr") })
  export type MatchError = t.TypeOf<typeof MatchError>

  /** Factory function for `MatchError` response */
  export function matchError(): MatchError {
    return { tag: "matcherr" }
  }
}

export const ValidateMnemonicsResponse = t.taggedUnion("tag", [
  ValidateMnemonicsResponses.Id,
  ValidateMnemonicsResponses.Invalid,
  ValidateMnemonicsResponses.MatchError
], "ValidateMnemonicsResponse")
export type ValidateMnemonicsResponse = t.TypeOf<typeof ValidateMnemonicsResponse>

export const GetWalletParams = t.type({
  id: t.string,
  password: t.string
})
export type GetWalletParams = t.TypeOf<typeof GetWalletParams>

export const GetWalletSuccess = t.type({
  kind: t.literal("success"),
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
  kind: t.literal("error"),
  error: GetWalletErrors
})
export type GetWalletError = t.TypeOf<typeof GetWalletError>

export const GetWalletResponse = t.taggedUnion("kind", [GetWalletSuccess, GetWalletError])
export type GetWalletResponse = t.TypeOf<typeof GetWalletResponse>
