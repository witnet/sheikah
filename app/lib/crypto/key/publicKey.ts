import {publicKeyCreate, publicKeyTweakAdd} from "secp256k1"
import {PrivateKey, SECP256K1_N} from "./privateKey"
import {ChainCode, ExtendedKey, getExtendedKey as extendedKey, Key} from "./key"
import {sha512hmac} from "../hash"
import {integerAsBuffer} from "../../utils/conversions"
import BigNum = require("bignum")
import * as assert from "assert"
import * as KeyPath from "../keyPath"

export interface PublicKey extends Key {
  type: "public"
}

/**
 * Create an Extended public key from a private extended key
 * @param {ExtendedKey<PrivateKey>} privateExtendedKey
 * @param {boolean} compressed
 * @returns {ExtendedKey<PublicKey>}
 */
export const create =
  (privateExtendedKey: ExtendedKey<PrivateKey>, compressed = true): ExtendedKey<PublicKey> => {
    const bytes: Buffer = publicKeyCreate(privateExtendedKey.key.bytes, compressed)

    return {
      key: {type: "public", bytes},
      chainCode: privateExtendedKey.chainCode
    }
  }

export const getExtendedKey = (bytes: Buffer, chainCode: ChainCode): ExtendedKey<PublicKey> => {
  return extendedKey(bytes, chainCode, "public")
}

/**
 * Derive a descendant extended public key from a parent extended public key, using either a
 * keypath or child index.
 *
 * @param {ExtendedKey<PublicKey>} parentKey
 * @param {KeyPath | string | number} keyPath  or index
 * @returns {any}
 */
export const derive =
  (parentKey: ExtendedKey<PublicKey>, keyPath: KeyPath.KeyPath | string | number) => {
    let extendedKey: ExtendedKey<PublicKey>
    if (typeof keyPath !== "number") {
      const path =
        typeof keyPath === "string" ? KeyPath.fromString(keyPath) : keyPath
      extendedKey = path.reduce(deriveChildKey, parentKey)
    } else {
      // with child index
      extendedKey = deriveChildKey(parentKey, keyPath)
    }

    return extendedKey
  }

const deriveChildKey = (parentKey: ExtendedKey<PublicKey>,
                        childIndex: number): ExtendedKey<PublicKey> => {
  const childIndexBuffer = integerAsBuffer(childIndex)
  const data = Buffer.concat([parentKey.key.bytes, childIndexBuffer],
    parentKey.key.bytes.length + childIndexBuffer.length)
  const I: Buffer = sha512hmac(parentKey.chainCode, data)
  const IL = I.slice(0, 32)
  const IR = I.slice(32, 64)
  const p = BigNum.fromBuffer(IL)
  // Private point should be less than the secp256k1 order
  assert(p.cmp(SECP256K1_N) <= 0, "can't generate child public key")

  // Ki = point(parse256(IL)) + Kpar
  //    = G*IL + Kpar
  const Ki = publicKeyTweakAdd(parentKey.key.bytes, IL)

  if (Ki === null) {
    // In case Ki is the point at infinity, proceed with the next value for i
    return deriveChildKey(parentKey, childIndex + 1)
  }

  return getExtendedKey(Ki, IR)
}
