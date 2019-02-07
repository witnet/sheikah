/* eslint-disable @typescript-eslint/camelcase */
import { getMasterKey } from "test/__helpers__/crypto"
import * as fixtures from "./keyFixtures"
import * as PrivateKey from "app/main/crypto/key/privateKey"
import * as PublicKey from "app/main/crypto/key/publicKey"
import { hardened } from "app/main/crypto/keyPath"

/**
 * The test vectors come from bip32 and the bitcoin-lib scala library
 */
describe("basic key derivation", () => {
  const masterKey = getMasterKey(fixtures.basic.seedEntropy, fixtures.passPhrase)

  it("should derive child private key", () => {
    const data = fixtures.basic.deriveChildPrivateKey
    const derivedKey = PrivateKey.derive(masterKey, data.keyPath)
    expect(derivedKey.key.bytes.toString(fixtures.encoding))
      .toEqual(data.derivedKeyBytes)
    expect(derivedKey.chainCode.toString(fixtures.encoding))
      .toEqual(data.derivedChainCode)
  })

  it("should derive hardened child private key", () => {
    const data = fixtures.basic.deriveHardenedChildPrivateKey
    const derivedKeyHardened = PrivateKey.derive(masterKey, data.keyPath)
    expect(derivedKeyHardened.key.bytes.toString(fixtures.encoding))
      .toEqual(data.derivedKeyBytes)
    expect(derivedKeyHardened.chainCode.toString(fixtures.encoding))
      .toEqual(data.derivedChainCode)
  })

  it("should derive public key from private key", () => {
    const data = fixtures.basic.derivePublicKeyFromPrivate
    const publicKey = PublicKey.create(masterKey)
    expect(publicKey.key.bytes.toString(fixtures.encoding))
      .toEqual(data.derivedKeyBytes)
    expect(publicKey.chainCode.toString(fixtures.encoding))
      .toEqual(data.derivedChainCode)
  })

  it("should derive child public key", () => {
    const data = fixtures.basic.deriveChildPublickey
    const publicKey = PublicKey.create(masterKey)
    const derivedKey = PublicKey.derive(publicKey, data.keyPath)

    expect(derivedKey.key.bytes.toString(fixtures.encoding))
      .toEqual(data.derivedKeyBytes)
    expect(derivedKey.chainCode.toString(fixtures.encoding))
      .toEqual(data.derivedChainCode)
  })
})

describe("derive keys (test vector #1)", () => {
  const masterKey = getMasterKey(fixtures.vector1.seedEntropy, fixtures.passPhrase)
  const m0h = PrivateKey.derive(masterKey, hardened(0))
  const m0h_pub = PublicKey.create(m0h)
  const m0h_1 = PrivateKey.derive(m0h, 1)
  const m0h_1_pub = PublicKey.create(m0h_1)
  const m0h_1_2h = PrivateKey.derive(m0h_1, hardened(2))
  const m0h_1_2h_pub = PublicKey.create(m0h_1_2h)
  const m0h_1_2h_2 = PrivateKey.derive(m0h_1_2h, 2)
  const m0h_1_2h_2_pub = PublicKey.create(m0h_1_2h_2)
  const m0h_1_2h_2_1000000000 = PrivateKey.derive(m0h_1_2h_2, 1000000000)
  const m0h_1_2h_2_1000000000_pub = PublicKey.create(m0h_1_2h_2_1000000000)

  it("should derive private key from path m/0'/1", () => {
    const data = fixtures.vector1.m0h
    const derivedKey = PrivateKey.derive(masterKey, data.keyPath)

    expect(derivedKey.key.bytes.toString(fixtures.encoding))
      .toEqual(data.derivedKeyBytes)
    expect(derivedKey.chainCode.toString(fixtures.encoding))
      .toEqual(data.derivedChainCode)
  })

  it("should derive public key from path m/0'/1/pub", () => {
    const data = fixtures.vector1.m0h_1_pub
    expect(m0h_1_pub.key.bytes.toString(fixtures.encoding))
      .toEqual(data.derivedKeyBytes)
    expect(m0h_1_pub.chainCode.toString(fixtures.encoding))
      .toEqual(data.derivedChainCode)
  })

  it("should derive public key for path m/0'/1/pub from the parent's public key", () => {
    const data = fixtures.vector1.m0h_1_pub
    const m0h_1_pub = PublicKey.derive(m0h_pub, data.keyPath)

    expect(m0h_1_pub.key.bytes.toString(fixtures.encoding))
      .toEqual(data.derivedKeyBytes)
    expect(m0h_1_pub.chainCode.toString(fixtures.encoding))
      .toEqual(data.derivedChainCode)
  })

  it("should derive private key from path m/0'/1/2'", () => {
    const data = fixtures.vector1.m0h_1_2h
    const derivedKey = PrivateKey.derive(masterKey, data.keyPath)
    expect(derivedKey.key.bytes.toString(fixtures.encoding))
      .toEqual(data.derivedKeyBytes)
    expect(derivedKey.chainCode.toString(fixtures.encoding))
      .toEqual(data.derivedChainCode)
  })

  it("should derive public key for path m/0'/1/2'/pub", () => {
    const data = fixtures.vector1.m0h_1_2h_pub
    expect(m0h_1_2h_pub.key.bytes.toString(fixtures.encoding))
      .toEqual(data.derivedKeyBytes)
    expect(m0h_1_2h_pub.chainCode.toString(fixtures.encoding))
      .toEqual(data.derivedChainCode)
  })

  it("should derive private key from path m/0'/1/2'/2", () => {
    const data = fixtures.vector1.m0h_1_2h_2
    const derivedKey = PrivateKey.derive(masterKey, data.keyPath)
    expect(derivedKey.key.bytes.toString(fixtures.encoding))
      .toEqual(data.derivedKeyBytes)
    expect(derivedKey.chainCode.toString(fixtures.encoding))
      .toEqual(data.derivedChainCode)
  })

  it("should derive public key for path m/0'/1/2'/2/pub", () => {
    const data = fixtures.vector1.m0h_1_2h_2_pub
    expect(m0h_1_2h_2_pub.key.bytes.toString(fixtures.encoding))
      .toEqual(data.derivedKeyBytes)
    expect(m0h_1_2h_2_pub.chainCode.toString(fixtures.encoding))
      .toEqual(data.derivedChainCode)
  })

  it("should derive public key for path m/0'/1/2'/2/pub1", () => {
    const data = fixtures.vector1.m0h_1_2h_2_pub1
    const m0h_1_2h_2_pub1 = PublicKey.derive(m0h_1_2h_pub, data.keyPath)
    expect(m0h_1_2h_2_pub1.key.bytes.toString(fixtures.encoding))
      .toEqual(data.derivedKeyBytes)
    expect(m0h_1_2h_2_pub1.chainCode.toString(fixtures.encoding))
      .toEqual(data.derivedChainCode)
  })

  it("should derive private key from path m/0'/1/2'/2/1000000000", () => {
    const data = fixtures.vector1.m0h_1_2h_2_1000000000
    const derivedKey = PrivateKey.derive(masterKey, data.keyPath)
    expect(derivedKey.key.bytes.toString(fixtures.encoding))
      .toEqual(data.derivedKeyBytes)
    expect(derivedKey.chainCode.toString(fixtures.encoding))
      .toEqual(data.derivedChainCode)
  })

  it("should derive public key for path m/0'/1/2'/2/1000000000/pub", () => {
    const data = fixtures.vector1.m0h_1_2h_2_1000000000_pub
    expect(m0h_1_2h_2_1000000000_pub.key.bytes.toString(fixtures.encoding))
      .toEqual(data.derivedKeyBytes)
    expect(m0h_1_2h_2_1000000000_pub.chainCode.toString(fixtures.encoding))
      .toEqual(data.derivedChainCode)
  })

  it("should derive private key from path m/0'/1/2'/2/1000000000 (chained)", () => {
    const data = fixtures.vector1.m0h_1_2h_2_1000000000_pub_chained

    expect(m0h_1_2h_2_1000000000.key.bytes.toString(fixtures.encoding))
      .toEqual(data.derivedKeyBytes)
    expect(m0h_1_2h_2_1000000000.chainCode.toString(fixtures.encoding))
      .toEqual(data.derivedChainCode)
  })
})

describe("derive keys (test vector #2)", () => {
  const masterKey = getMasterKey(fixtures.vector2.seedEntropy, fixtures.passPhrase)
  const m0 = PrivateKey.derive(masterKey, 0)
  const m0_pub = PublicKey.create(m0)
  const m0_2147483647h = PrivateKey.derive(m0, hardened(2147483647))
  const m0_2147483647h_pub = PublicKey.create(m0_2147483647h)
  const m0_2147483647h_1 = PrivateKey.derive(m0_2147483647h, 1)
  const m0_2147483647h_1_pub = PublicKey.create(m0_2147483647h_1)
  const m0_2147483647h_1_2147483646h = PrivateKey.derive(m0_2147483647h_1, hardened(2147483646))
  const m0_2147483647h_1_2147483646h_pub = PublicKey.create(m0_2147483647h_1_2147483646h)
  const m0_2147483647h_1_2147483646h_2 = PrivateKey.derive(m0_2147483647h_1_2147483646h, 2)
  const m0_2147483647h_1_2147483646h_2_pub = PublicKey.create(m0_2147483647h_1_2147483646h_2)

  it("should derive private key from path m/0", () => {
    const data = fixtures.vector2.m0
    const derivedKey = PrivateKey.derive(masterKey, data.keyPath)
    expect(derivedKey.key.bytes.toString(fixtures.encoding))
      .toEqual(data.derivedKeyBytes)
    expect(derivedKey.chainCode.toString(fixtures.encoding))
      .toEqual(data.derivedChainCode)
  })

  it("should derive public key from path m/0/pub", () => {
    const data = fixtures.vector2.m0_pub
    expect(m0_pub.key.bytes.toString(fixtures.encoding))
      .toEqual(data.derivedKeyBytes)
    expect(m0_pub.chainCode.toString(fixtures.encoding))
      .toEqual(data.derivedChainCode)
  })

  it("should derive private key from path m/0/2147483647'", () => {
    const data = fixtures.vector2.m0_2147483647h
    const derivedKey = PrivateKey.derive(masterKey, data.keyPath)
    expect(derivedKey.key.bytes.toString(fixtures.encoding))
      .toEqual(data.derivedKeyBytes)
    expect(derivedKey.chainCode.toString(fixtures.encoding))
      .toEqual(data.derivedChainCode)
  })

  it("should derive public key from path m/0/2147483647'/pub", () => {
    const data = fixtures.vector2.m0_2147483647h_pub
    expect(m0_2147483647h_pub.key.bytes.toString(fixtures.encoding))
      .toEqual(data.derivedKeyBytes)
    expect(m0_2147483647h_pub.chainCode.toString(fixtures.encoding))
      .toEqual(data.derivedChainCode)
  })

  it("should derive private key from path m0_2147483647'/1", () => {
    const data = fixtures.vector2.m0_2147483647h_1
    const derivedKey = PrivateKey.derive(masterKey, data.keyPath)
    expect(derivedKey.key.bytes.toString(fixtures.encoding))
      .toEqual(data.derivedKeyBytes)
    expect(derivedKey.chainCode.toString(fixtures.encoding))
      .toEqual(data.derivedChainCode)
  })

  it("should derive public key from path m/0/2147483647'/1/pub", () => {
    const data = fixtures.vector2.m0_2147483647h_1_pub
    expect(m0_2147483647h_1_pub.key.bytes.toString(fixtures.encoding))
      .toEqual(data.derivedKeyBytes)
    expect(m0_2147483647h_1_pub.chainCode.toString(fixtures.encoding))
      .toEqual(data.derivedChainCode)
  })

  it("should derive private key from path m0/2147483647'/1/2147483646'", () => {
    const data = fixtures.vector2.m0_2147483647h_1_2147483646h
    const derivedKey = PrivateKey.derive(masterKey, data.keyPath)
    expect(derivedKey.key.bytes.toString(fixtures.encoding))
      .toEqual(data.derivedKeyBytes)
    expect(derivedKey.chainCode.toString(fixtures.encoding))
      .toEqual(data.derivedChainCode)
  })

  it("should derive public key from path m/0/2147483647'/1/2147483646'/pub", () => {
    const data = fixtures.vector2.m0_2147483647h_1_2147483646h_pub
    expect(m0_2147483647h_1_2147483646h_pub.key.bytes.toString(fixtures.encoding))
      .toEqual(data.derivedKeyBytes)
    expect(m0_2147483647h_1_2147483646h_pub.chainCode.toString(fixtures.encoding))
      .toEqual(data.derivedChainCode)
  })

  it("should derive private key from path m0/2147483647'/1/2147483646'/2", () => {
    const data = fixtures.vector2.m0_2147483647h_1_2147483646h_2
    const derivedKey = PrivateKey.derive(masterKey, data.keyPath)
    expect(derivedKey.key.bytes.toString(fixtures.encoding))
      .toEqual(data.derivedKeyBytes)
    expect(derivedKey.chainCode.toString(fixtures.encoding))
      .toEqual(data.derivedChainCode)
  })

  it("should derive public key from path m/0/2147483647'/1/2147483646'/2/pub", () => {
    const data = fixtures.vector2.m0_2147483647h_1_2147483646h_2_pub
    expect(m0_2147483647h_1_2147483646h_2_pub.key.bytes.toString(fixtures.encoding))
      .toEqual(data.derivedKeyBytes)
    expect(m0_2147483647h_1_2147483646h_2_pub.chainCode.toString(fixtures.encoding))
      .toEqual(data.derivedChainCode)
  })

  it("should derive private key from path m0/2147483647'/1/2147483646'/2 (chained)", () => {
    const data = fixtures.vector2.m0_2147483647h_1_2147483646h_2
    expect(m0_2147483647h_1_2147483646h_2.key.bytes.toString(fixtures.encoding))
      .toEqual(data.derivedKeyBytes)
    expect(m0_2147483647h_1_2147483646h_2.chainCode.toString(fixtures.encoding))
      .toEqual(data.derivedChainCode)
  })
})
