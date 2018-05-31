import * as assert from "assert"
import * as KeyPath from "../keyPath"
import * as BigNum from "bignum"
import {sha512hmac} from "../hash"
import {integerAsBuffer} from "../../utils/conversions"
import * as PublicKey from "./publicKey"
import {ChainCode, ExtendedKey, getExtendedKey as extendedKey, Key} from "./key"

export interface PrivateKey extends Key {
  type: "private"
}

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
/**
 * SECP256K1 G  (base point)
 * used to validate that the private key is a valid point in the elliptic curve
 * @type {BigNum}
 */
export const SECP256K1_G = BigNum.fromBuffer(
  Buffer.from(
    "79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798",
    "hex"
  )
)

/**
 * Derive a descendant extended private key from a parent extended private key (likely a master
 * key), using either a keypath or child index.
 *
 * @param {ExtendedKey<PrivateKey>} masterKey
 * @param {KeyPath | string | number} keyPath  or index
 * @returns {any}
 */
export const derive =
  (masterKey: ExtendedKey<PrivateKey>, keyPath: KeyPath.KeyPath | string | number) => {
    let extendedKey: ExtendedKey<PrivateKey>
    if (typeof keyPath !== "number") {
      const path =
        typeof keyPath === "string" ? KeyPath.fromString(keyPath) : keyPath
      extendedKey = path.reduce(deriveChildKey, masterKey)
    } else {
      // with child index
      extendedKey = deriveChildKey(masterKey, keyPath)
    }

    return extendedKey
  }

/**
 * Extended key from private key bytes and chainCode
 * @param {Buffer} private key bytes
 * @param {ChainCode} chainCode
 * @returns {ExtendedKey<PrivateKey>}
 */
export const getExtendedKey = (bytes: Buffer, chainCode: ChainCode): ExtendedKey<PrivateKey> => {
  return extendedKey(bytes, chainCode, "private")
}

/**
 * Generate extended private key
 * @param {PrivateKey} parentKey
 * @param {ChainCode} chainCode
 * @param {number} childIndex
 * @returns {ExtendedKey<PrivateKey>}
 */
const deriveChildKey = (
  parentKey: ExtendedKey<PrivateKey>,
  childIndex: number
): ExtendedKey<PrivateKey> => {

  let data: Buffer
  const childIndexBuffer = integerAsBuffer(childIndex)
  if (KeyPath.isHardened(childIndex)) {
    const buf =
      Buffer.concat([Buffer.from([0]), parentKey.key.bytes], parentKey.key.bytes.length + 1)
    data = Buffer.concat([buf, childIndexBuffer], buf.length + childIndexBuffer.length)
  } else {
    const {key: pubkey, chainCode: pubChain} = PublicKey.create(parentKey.key)
    data =
      Buffer.concat(
        [pubkey.bytes, pubChain, childIndexBuffer],
        pubkey.bytes.length + pubChain.length + childIndexBuffer.length
      )
  }
  const I: Buffer = sha512hmac(parentKey.chainCode, data)
  const IL = I.slice(0, 32)
  const IR = I.slice(32, 64)
  const p = BigNum.fromBuffer(IL)
  // Private point should be less than the secp256k1 order
  assert(p.cmp(SECP256K1_N) <= 0, "can't generate child private key")
  const key = BigNum
    .fromBuffer(IL)
    .add(BigNum.fromBuffer(parentKey.key.bytes))
    .mod(SECP256K1_N)
  // The key shouldn't be zero
  assert(!key.eq(0), "can't generate child private key")

  const keyBytes = key.toBuffer().slice(0, 32)

  return getExtendedKey(keyBytes, IR)
}

/**
 * Wrap private key bytes
 * @param {Buffer} bytes
 * @returns {PrivateKey}
 */
export const getKey = (bytes: Buffer): PrivateKey => {
  return {type: "private", bytes}
}
