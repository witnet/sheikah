import * as BigNum from "bignum"

/**
 * SECP256K1 N (order)
 * @type {BigNum}
 */
export const SECP256K1_N = BigNum.fromBuffer(
  Buffer.from(
    "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141",
    "hex"
  )
)

export const HARDENED_KEY_INDEX = 0x80000000