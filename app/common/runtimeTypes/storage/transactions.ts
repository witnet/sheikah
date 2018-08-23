import * as t from "io-ts"
import { Version } from "app/common/runtimeTypes/storage"

// Reference to transaction output
export const Outpoint = t.type({
  txid: t.string,
  index: t.number
}, "Outpoint")
export type Outpoint = t.TypeOf<typeof Outpoint>

// Transaction input related types
export const TxInput = t.type({
  outpoint: Outpoint
}, "TxInput")
export type TxInput = t.TypeOf<typeof TxInput>

// Transaction output related types
export const P2PKHTxOutput = t.type({
  kind: t.literal("P2PKH"),
  value: t.number,
  pkh: t.string
}, "TxOutput")
export type P2PKHTxOutput = t.TypeOf<typeof P2PKHTxOutput>

export const P2SHTxOutput = t.type({
  kind: t.literal("P2SH"),
  value: t.number,
  sh: t.string
}, "TxOutput")
export type P2SHTxOutput = t.TypeOf<typeof P2SHTxOutput>

export const TxOutput = t.taggedUnion("kind", [P2PKHTxOutput, P2SHTxOutput])
export type TxOutput = t.TypeOf<typeof TxOutput>

// Transaction runtime type
export const Transaction = t.intersection([
  t.type({
    // Data structure version
    Version,

    // id (hash)
    txid: t.string,

    // tx locktime (0 if not timelocked)
    locktime: t.number,

    // tx inputs
    vin: t.array(TxInput),

    // tx outputs
    vout: t.array(TxOutput)
  }),
  t.partial({
    // reference to block id (hash) and height
    // empty if not included in a block
    blkid: t.string,
    height: t.number,
  })
], "Transaction")
export type Transaction = t.TypeOf<typeof Transaction>

// Transaction dictionary
export const Transactions = t.dictionary(t.string, Transaction)
export type Transactions = t.TypeOf<typeof Transactions>