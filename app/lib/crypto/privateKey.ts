import * as assert from "assert"
import * as KeyPath from "./keyPath"
import * as BigNum from "bignum"
import {sha512hmac} from "./hash"
import {integerAsBuffer} from "../utils/conversions"
import * as PublicKey from "./publicKey"

export type PrivateKey = {
  keyBytes: Buffer
  chainCode: Buffer
}

export const SEC256PK1_N = BigNum.fromBuffer(
  Buffer.from(
    "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141",
    "hex"
  )
)
export const SEC256PK1_G = BigNum.fromBuffer(
  Buffer.from(
    "0279BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798",
    "hex"
  )
)

export const factory = (
  parentBytes: Buffer,
  chainCode: Buffer,
  childIndex: number
): PrivateKey => {

  let data: Buffer
  const childIndexBuffer = integerAsBuffer(childIndex)
  if (KeyPath.isHardened(childIndex)) {
    const buf = Buffer.concat(
      [Buffer.from([0]), parentBytes],
      parentBytes.length + 1
    )
    data = Buffer.concat(
      [buf, childIndexBuffer],
      buf.length + childIndexBuffer.length
    )
  } else {
    const pub = PublicKey.create(parentBytes)
    data =
      Buffer.concat(
        [pub, childIndexBuffer],
        pub.length + childIndexBuffer.length
      )
  }
  const I: Buffer = sha512hmac(chainCode, data)

  const IL = I.slice(0, 32)
  const IR = I.slice(32, 64)
  const p = BigNum.fromBuffer(IL)

  assert(p.ge(SEC256PK1_G), "can't generate child private key")
  const key = BigNum
    .fromBuffer(IL)
    .add(BigNum.fromBuffer(parentBytes))
    .mod(SEC256PK1_N)

  assert(key.eq(0), "can't generate child private key")

  const keyBytes = key.toBuffer().slice(0, 32)

  return {
    keyBytes,
    chainCode: IR
  }
}

export const deepPrivateKey =
  (masterKey: PrivateKey, keyPath: KeyPath.KeyPath | string) => {
    const path =
      typeof keyPath === "string" ? KeyPath.fromString(keyPath) : keyPath

    return path.reduce((key, childNumber) =>
        factory(key.keyBytes, key.chainCode, childNumber)
      , masterKey)
  }
