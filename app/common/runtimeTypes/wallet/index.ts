/* eslint-disable @typescript-eslint/camelcase */
import * as t from "io-ts"
import { JsonSerializable } from "app/common/serializers"

/**
 * Json runtime type. This type is intended to replace `any` and hence make function signatures
 * more strict.
 */
const JsonRT = t.recursion<JsonSerializable>(
  "JsonRT",
  (self) => t.union([
    t.nullType,
    t.number,
    t.string,
    t.boolean,
    t.array(self),
    t.dictionary(t.string, self),
  ])
)

// To be defined
// Mnemonics runtime type
export const Mnemonics = t.type({
  mnemonics: JsonRT,
})
export type Mnemonics = t.TypeOf<typeof Mnemonics>

// To be defined
// Data request runtime type
export const DataRequest = JsonRT
// Data request type
export type DataRequest = t.TypeOf<typeof DataRequest>

// Rad runtime type
export const RADType = t.string
// Rad type
export type RADType = t.TypeOf<typeof RADType>

// RADRetrieve args runtime type
export const RADRetrieveArgs = t.type({
  kind: RADType,
  url: t.string,
  script: t.array(JsonRT),
})
// RADRetrieve args type
export type RADRetrieveArgs = t.TypeOf<typeof RADRetrieveArgs>

// RADAggregate args runtime type
export const RADAggregateArgs = t.type({
  script: t.array(JsonRT),
})
// RADAggregate args type
export type RADAggregateArgs = t.TypeOf<typeof RADAggregateArgs>

// RADConsensus args runtime type
export const RADConsensusArgs = t.type({
  script: t.array(JsonRT),
})
// RADConsensus args type
export type RADConsensusArgs = t.TypeOf<typeof RADConsensusArgs>

// RADDelivery args runtime type
export const RADDeliverArgs = t.type({
  kind: RADType,
  url: t.string,
})
// RADDelivery args type
export type RADDeliverArgs = t.TypeOf<typeof RADDeliverArgs>

// Wallet info runtime type
export const WalletInfo = t.type({
  id: t.string,
  caption: t.string,
})
// Wallet info type
export type WalletInfo = t.TypeOf<typeof WalletInfo>

// Seed runtime type
export const Seed = t.array(t.number)
// Seed type
export type Seed = t.TypeOf<typeof Seed>

// Wip3 runtime type
export const Wip3 = t.type({
  seed: Seed,
})
// Wip3 runtime type
export type Wip3 = t.TypeOf<typeof Wip3>

// Seed info runtime type
export const SeedInfo = Wip3
// uncomment if exist more SeedInfo types
// export const SeedInfo = t.union([
//     Wip3,

// ])
// Seed info type
export type SeedInfo = t.TypeOf<typeof SeedInfo>

// Epochs information runtime type
export const EpochsInfo = t.type({
  last: t.number,
  born: t.number,
})
// Epochs information type
export type EpochsInfo = t.TypeOf<typeof EpochsInfo>

// Derivation path runtime type
export const DerivationPath = t.string
// Derivation path type
export type DerivationPath = t.TypeOf<typeof DerivationPath>

// Key path runtime type
export const KeyPath = t.array(t.number)
// Key path type
export type KeyPath = t.TypeOf<typeof KeyPath>

// Child number runtime type
export const ChildNumber = t.number
// Child number type
export type ChildNumber = t.TypeOf<typeof ChildNumber>

// Key chain runtime type
export const KeyChain = t.union([
  t.literal("External"),
  t.literal("Internal"),
  t.literal("Rad"),
])
// Key chain type
export type KeyChain = t.TypeOf<typeof KeyChain>

// Account runtime type
export const Account = t.type({
  key_path: KeyPath,
  key_chains: t.array(KeyChain),
  balance: t.number,
})
// Account type
export type Account = t.TypeOf<typeof Account>

// Wallet runtime type
export const Wallet = t.type({
  version: t.number,
  info: WalletInfo,
  seed: SeedInfo,
  epochs: EpochsInfo,
  purpose: DerivationPath,
  accounts: t.array(Account),
})
// Wallet type
export type Wallet = t.TypeOf<typeof Wallet>

// Create data request method params runtime type
export const CreateDataRequestParams = t.type({
  not_before: t.number,
  retrieve: t.array(RADRetrieveArgs),
})
// Create data request method params type
export type CreateDataRequestParams = t.TypeOf<typeof CreateDataRequestParams>

// Create wallet method params runtime type
export const CreateWalletParams = t.type({
  name: t.string,
  password: t.string,
})
// Create wallet method params type
export type CreateWalletParams = t.TypeOf<typeof CreateWalletParams>

// Get transactions method params runtime type
export const GetTransactionsParams = t.type({
  wallet_id: t.string,
  limit: t.number,
  page: t.number,
})
// Get transactions method params type
export type GetTransactionsParams = t.TypeOf<typeof GetTransactionsParams>

// Import seed method params runtime type
export const ImportSeedParams = t.union([
  Mnemonics,
  Seed,
])
// Import seed method params type
export type ImportSeedParams = t.TypeOf<typeof ImportSeedParams>

// Lock wallet method params runtime type
export const LockWalletParams = t.type({
  wallet_id: t.string,
  wipe: t.boolean,
})
// Lock wallet methods params type
export type LockWalletParams = t.TypeOf<typeof LockWalletParams>

// Run data request method params runtime types
export const RunDataRequestParams = t.type({
  data_request: DataRequest,
})
// Run data request method params types
export type RunDataRequestParams = t.TypeOf<typeof RunDataRequestParams>

// Say hello args method params runtime types
export const SayHelloParams = t.type({
  name: t.string,
})
// Say hello args method params types
export type SayHelloParams = t.TypeOf<typeof SayHelloParams>

// Send data request method args runtime type
export const SendDataRequestParams = t.type({
  data_request: DataRequest,
})
// Send data request method args type
export type SendDataRequestParams = t.TypeOf<typeof SendDataRequestParams>

// Send value transfer transaction method params runtime type
export const SendVTTParams = t.type({
  wallet_id: t.string,
  to_address: t.array(t.number),
  amount: t.number,
  fee: t.number,
  subject: t.string,
})
// Send value transfer transaction method params type
export type SendVTTParams = t.TypeOf<typeof SendVTTParams>

// Unlock wallet method params runtime types
export const UnlockWalletParams = t.type({
  id: t.string,
  password: t.string,
})
// Unlock wallet method params types
export type UnlockWalletParams = t.TypeOf<typeof UnlockWalletParams>
