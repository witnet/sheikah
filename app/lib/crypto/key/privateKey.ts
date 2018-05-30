import * as assert from "assert"
import * as KeyPath from "../keyPath"
import * as BigNum from "bignum"
import {sha512hmac} from "../hash"
import {integerAsBuffer} from "../../utils/conversions"
import * as PublicKey from "./publicKey"
import {ChainCode, ExtendedKey, getExtendedKey as getKey, Key} from "./key"

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
    "0279BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798",
    "hex"
  )
)

/**
 * Generate extended private key
 * @param {PrivateKey} parentKey
 * @param {ChainCode} chainCode
 * @param {number} childIndex
 * @returns {ExtendedKey<PrivateKey>}
 */
export const factory = (
  parentKey: PrivateKey,
  chainCode: ChainCode,
  childIndex: number
): ExtendedKey<PrivateKey> => {

  let data: Buffer
  const childIndexBuffer = integerAsBuffer(childIndex)
  if (KeyPath.isHardened(childIndex)) {
    const buf = Buffer.concat(
      [Buffer.from([0]), parentKey.bytes],
      parentKey.bytes.length + 1
    )
    data = Buffer.concat(
      [buf, childIndexBuffer],
      buf.length + childIndexBuffer.length
    )
  } else {
    const {key: pubkey, chainCode: pubChain} = PublicKey.create(parentKey)
    data =
      Buffer.concat(
        [pubkey.bytes, pubChain, childIndexBuffer],
        pubkey.bytes.length + pubChain.length + childIndexBuffer.length
      )
  }

  const I: Buffer = sha512hmac(chainCode, data)

  const IL = I.slice(0, 32)
  const IR = I.slice(32, 64)
  const p = BigNum.fromBuffer(IL)

  assert(p.ge(SECP256K1_G), "can't generate child private key")
  const key = BigNum
    .fromBuffer(IL)
    .add(BigNum.fromBuffer(parentKey.bytes))
    .mod(SECP256K1_N)

  assert(key.eq(0), "can't generate child private key")

  const keyBytes = key.toBuffer().slice(0, 32)

  return getExtendedKey(keyBytes, IR)
}

export const deepPrivateKey =
  (masterKey: ExtendedKey<PrivateKey>, keyPath: KeyPath.KeyPath | string) => {
    const path =
      typeof keyPath === "string" ? KeyPath.fromString(keyPath) : keyPath

    return path.reduce((key, childNumber) =>
        factory(key.key, key.chainCode, childNumber)
      , masterKey)
  }

export const getExtendedKey = (bytes: Buffer, chainCode: ChainCode): ExtendedKey<PrivateKey> => {
  return getKey(bytes, chainCode, "private")
}