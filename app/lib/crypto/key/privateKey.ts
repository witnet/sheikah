import * as assert from "assert"
import * as KeyPath from "../keyPath"
import BigNum = require("bn.js")
import {sha512hmac} from "../hash"
import {integerAsBuffer} from "../../utils/conversions"
import * as PublicKey from "./publicKey"
import {ChainCode, ExtendedKey, Key} from "./key"
import {privateKeyTweakAdd} from "secp256k1"
import {SECP256K1_N} from "../constants"
import {Errors} from "../errors"

export interface PrivateKey extends Key {
  type: "private"
}

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
 * Extended key
 * @param {PrivateKey} private key
 * @param {ChainCode} chainCode
 * @returns {ExtendedKey<PrivateKey>}
 */
export const extend = (key: PrivateKey, chainCode: ChainCode): ExtendedKey<PrivateKey> => {
  return {key, chainCode}
}

/**
 * Derive child key
 * @param {PrivateKey} parentKey
 * @param {ChainCode} chainCode
 * @param {number} childIndex
 * @returns {ExtendedKey<PrivateKey>}
 */
const deriveChildKey = (
  parentKey: ExtendedKey<PrivateKey>,
  childIndex: number
): ExtendedKey<PrivateKey> => {
// This buffer will be populated later and then used as input data for the SHA512HMAC function that
// calculates the child key and chain code.
  let data: Buffer
  const childIndexBuffer = integerAsBuffer(childIndex)
  if (KeyPath.isHardened(childIndex)) {
    const buf =
      Buffer.concat([Buffer.from([0]), parentKey.key.bytes], parentKey.key.bytes.length + 1)
    data = Buffer.concat([buf, childIndexBuffer], buf.length + childIndexBuffer.length)
  } else {
    const pubkey = PublicKey.create(parentKey)
    data =
      Buffer.concat(
        [pubkey.key.bytes, childIndexBuffer],
        pubkey.key.bytes.length + childIndexBuffer.length
      )
  }
  const I: Buffer = sha512hmac(parentKey.chainCode, data)
  const IL = I.slice(0, 32)
  const IR = I.slice(32, 64)
  const p = new BigNum(IL)
  // Private point should be less than the secp256k1 order
  assert(p.cmp(SECP256K1_N) <= 0, Errors.PRIVATE_KEY_POINT_OUT_OF_RANGE)
  // ki = parse256(IL) + kpar (mod n)
  const keyBytes = privateKeyTweakAdd(parentKey.key.bytes, IL)
  if (keyBytes === null) {
    // In case ki == 0, proceed with the next value for i
    return deriveChildKey(parentKey, childIndex + 1)
  }

  return extend(fromBytes(keyBytes), IR)
}

export const fromBytes = (bytes: Buffer): PrivateKey => {
  return {type: "private", bytes}
}