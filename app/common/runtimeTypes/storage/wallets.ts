import * as t from "io-ts"

export const CURRENT_WALLETS_VERSION = 0
export const CURRENT_WALLET_VERSION = 0

export const Version = t.type({
  _v: t.number
}, "Version")
export type Version = t.TypeOf<typeof Version>

export const WalletInfo = t.type({
  id: t.string,
  caption: t.string
}, "WalletInfo")
export type WalletInfo = t.TypeOf<typeof WalletInfo>

export const WalletInfoCollection = t.array(WalletInfo)
export type WalletInfoCollection = t.TypeOf<typeof WalletInfoCollection>

export const Wallets = t.intersection([
  Version,
  t.type({
    infos: WalletInfoCollection
  }, "Wallets"),
])
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

export const Input = t.type({}, "Input")
export type Input = t.TypeOf<typeof Input>

export const OutputTypes = t.union([
  t.literal("P2PKH"),
  t.literal("P2SH")
], "OutputTypes")
export type OutputTypes = t.TypeOf<typeof OutputTypes>

export const Outpoint = t.type({
  txid: t.string,
  index: t.number // output index
}, "Outpoint")
export type Outpoint = t.TypeOf<typeof Outpoint>

export const Output = t.type({
  type: OutputTypes,
  outpoint: Outpoint,
  value: t.number
}, "Output")
export type Output = t.TypeOf<typeof Output>

export const KeyPath = t.array(t.number)
export type KeyPath = t.TypeOf<typeof KeyPath>

export const Uint8 = t.refinement(t.number, n => n >= 0 && n <= 0xFF)
export type Uint8 = t.TypeOf<typeof Uint8>

export const ByteArray = t.array(Uint8)
export type ByteArray = t.TypeOf<typeof ByteArray>

export const ExtendedKey = t.type({
  type: t.union([t.literal("private"), t.literal("public")], "type"),
  key: t.array(Uint8, "key"),
  chainCode: t.array(Uint8, "ChainCode")
}, "ExtendedKey")
export type ExtendedKey = t.TypeOf<typeof ExtendedKey>

export const FinalKey = t.intersection([
  ExtendedKey,
  t.type({
    keyPath: KeyPath,
    pkh: t.string,
  }),
  t.partial({
    utxo: t.array(Output),
    stxo: t.array(Input)
  })
], "FinalKey")
export type FinalKey = t.TypeOf<typeof FinalKey>

export const KeyChain = t.type({
  keyPath: KeyPath,
  finalKeys: t.array(FinalKey)
}, "KeyChain")
export type KeyChain = t.TypeOf<typeof KeyChain>

export const EpochsInfo = t.union([
  t.type({
    last: t.number
  }),
  t.partial({
    born: t.number
  })
], "EpochsInfo")
export type EpochsInfo = t.TypeOf<typeof EpochsInfo>

export const Account = t.type({
  keyPath: KeyPath,
  // this will likely contain chain 0 (external), 1 (internal) and 2 (rad<sup>1</sup>)
  keyChains: t.array(KeyChain),
  // how much value is in this branch of the Wip3 key tree
  balance: t.number
}, "EpochsInfo")
export type Account = t.TypeOf<typeof Account>

export const Wip3SeedInfo = t.type({
  kind: t.literal("Wip3"),
  mnemonics: Mnemonics,
  xprv: t.string,
  xpub: t.string
}, "Wip3SeedInfo")
export type Wip3SeedInfoRT = t.TypeOf<typeof Wip3SeedInfo>

export type Wip3SeedInfo = {
  kind: "Wip3",
  mnemonics: string,
  seed: Seed
}

export const HexByteArray = t.string
export type HexByteArray = t.TypeOf<typeof HexByteArray>

/**
 * Custom type to encode/decode bytearray to hexstring
 * @type {Type<ByteArray, HexByteArray>}
 */
export const SerializableByteArray = new t.Type<ByteArray, HexByteArray>(
  "SerializableByteArray",
  /** is: a custom type guard */
  t.array(Uint8).is,
  /** validate: succeeds if a value of type t.mixed can be decoded to a value of type ByteArray */
  (input: t.mixed, context: t.Context): t.Validation<ByteArray> =>
    t.string.validate(input, context).chain(inputString => {
      let res: t.Validation<ByteArray>
      try {
        res = t.success(toByteArray(inputString))
      } catch (e) {
        res = t.failure(inputString, context)
      }

      return res
    }),
  /** encode: converts a value of type ByteArray to a value of type HexString */
  toHexString
)

export const Seed = t.type({
  masterSecret: SerializableByteArray,
  chainCode: SerializableByteArray
}, "Seed")
export type Seed = t.TypeOf<typeof Seed>

export const SeedInfo = t.union([Wip3SeedInfo], "SeedInfo") // , TrezorSeedInfo, LedgerSeedInfo])
export type SeedInfo = t.TypeOf<typeof SeedInfo>

export const Wallet = t.intersection([
  Version,
  WalletInfo,
  t.type({
    seed: SeedInfo,
    epochs: EpochsInfo,
    purpose: t.literal(0x80000003), // this wallet uses derivation path m/3'/*
    accounts: t.array(Account)
  }, "Wallet"),
])
export type Wallet = t.TypeOf<typeof Wallet>

/**
 * Encode byte array to hex string.
 * @param {ByteArray} byteArray
 * @returns {HexByteArray}
 */
function toHexString(byteArray: ByteArray): HexByteArray {
  return byteArray.map((byte) => {
    if (byte > 0xFF || byte < 0) {
      throw new Error("Invalid u8 found in ByteArray (value out of [0, 255] range)")
    }

    return (`0${(byte & 0xFF).toString(16)}`).slice(-2)
  }).join("")
}

/**
 * Decode byte array from hex string
 * @param {string} hexString
 * @returns {Array<number>}
 */
function toByteArray(hexString: string) {
  return (hexString
    .match(/.{1,2}/g) || [])
    .map((x) => {
      const val = parseInt(x, 16)
      if (isNaN(val)) { throw new Error("Invalid hex value found in hexString") }

      return val
    })
}