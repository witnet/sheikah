import { Empty } from "app/common/runtimeTypes/index"
import { Wallets } from "app/common/runtimeTypes/storage/wallets"
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
