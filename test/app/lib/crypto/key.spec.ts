import {deriveSeedFromEntropy} from "../../../../app/lib/crypto/seed"
import * as PrivateKey from "../../../../app/lib/crypto/key/privateKey"
import {ExtendedKey} from "../../../../app/lib/crypto/key/key"
import {hardened} from "../../../../app/lib/crypto/keyPath"
import * as PublicKey from "../../../../app/lib/crypto/key/publicKey"

/**
 * The test vectors come from bip32 and the bitcoin-lib scala library
 */
describe("basic key derivation", () => {
  const masterKey = getMasterKey("000102030405060708090a0b0c0d0e0f")

  it("should derive child private key", () => {
    const derivedKey = PrivateKey.derive(masterKey, 0)
    expect(derivedKey.key.bytes.toString("hex"))
      .toEqual("4e2cdcf2f14e802810e878cf9e6411fc4e712edf19a06bcfcc5d5572e489a3b7")
    expect(derivedKey.chainCode.toString("hex"))
      .toEqual("d323f1be5af39a2d2f08f5e8f664633849653dbe329802e9847cfc85f8d7b52a")
  })

  it("should derive hardened child private key", () => {
    const derivedKeyHardened = PrivateKey.derive(masterKey, hardened(0))
    expect(derivedKeyHardened.key.bytes.toString("hex"))
      .toEqual("edb2e14f9ee77d26dd93b4ecede8d16ed408ce149b6cd80b0715a2d911a0afea")
    expect(derivedKeyHardened.chainCode.toString("hex"))
      .toEqual("47fdacbd0f1097043b78c63c20c34ef4ed9a111d980047ad16282c7ae6236141")
  })

  it("should derive public key from private key", () => {
    const publicKey = PublicKey.create(masterKey)
    expect(publicKey.key.bytes.toString("hex"))
      .toEqual("0339a36013301597daef41fbe593a02cc513d0b55527ec2df1050e2e8ff49c85c2")
    expect(publicKey.chainCode.toString("hex"))
      .toEqual("873dff81c02f525623fd1fe5167eac3a55a049de3d314bb42ee227ffed37d508")
  })

  it("should derive child public key", () => {
    const publicKey = PublicKey.create(masterKey)
    const derivedKey = PublicKey.derive(publicKey, 0)

    expect(derivedKey.key.bytes.toString("hex"))
      .toEqual("027c4b09ffb985c298afe7e5813266cbfcb7780b480ac294b0b43dc21f2be3d13c")
    expect(derivedKey.chainCode.toString("hex"))
      .toEqual("d323f1be5af39a2d2f08f5e8f664633849653dbe329802e9847cfc85f8d7b52a")
  })
})

describe("derive keys (test vector #1)", () => {
  const masterKey = getMasterKey("000102030405060708090a0b0c0d0e0f")
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
    const derivedKey = PrivateKey.derive(masterKey, "m/0'/1")
    expect(derivedKey.key.bytes.toString("hex"))
      .toEqual("3c6cb8d0f6a264c91ea8b5030fadaa8e538b020f0a387421a12de9319dc93368")
    expect(derivedKey.chainCode.toString("hex"))
      .toEqual("2a7857631386ba23dacac34180dd1983734e444fdbf774041578e9b6adb37c19")

  })

  it("should derive public key from path m/0'/1/pub", () => {
    expect(m0h_1_pub.key.bytes.toString("hex"))
      .toEqual("03501e454bf00751f24b1b489aa925215d66af2234e3891c3b21a52bedb3cd711c")
    expect(m0h_1_pub.chainCode.toString("hex"))
      .toEqual("2a7857631386ba23dacac34180dd1983734e444fdbf774041578e9b6adb37c19")
  })

  it("should derive public key for path m/0'/1/pub from the parent's public key", () => {
    const m0h_1_pub = PublicKey.derive(m0h_pub, 1)

    expect(m0h_1_pub.key.bytes.toString("hex"))
      .toEqual("03501e454bf00751f24b1b489aa925215d66af2234e3891c3b21a52bedb3cd711c")
    expect(m0h_1_pub.chainCode.toString("hex"))
      .toEqual("2a7857631386ba23dacac34180dd1983734e444fdbf774041578e9b6adb37c19")

  })

  it("should derive private key from path m/0'/1/2'", () => {
    const derivedKey = PrivateKey.derive(masterKey, "m/0'/1/2'")
    expect(derivedKey.key.bytes.toString("hex"))
      .toEqual("cbce0d719ecf7431d88e6a89fa1483e02e35092af60c042b1df2ff59fa424dca")
    expect(derivedKey.chainCode.toString("hex"))
      .toEqual("04466b9cc8e161e966409ca52986c584f07e9dc81f735db683c3ff6ec7b1503f")
  })

  it("should derive public key for path m/0'/1/2'/pub", () => {
    expect(m0h_1_2h_pub.key.bytes.toString("hex"))
      .toEqual("0357bfe1e341d01c69fe5654309956cbea516822fba8a601743a012a7896ee8dc2")
    expect(m0h_1_2h_pub.chainCode.toString("hex"))
      .toEqual("04466b9cc8e161e966409ca52986c584f07e9dc81f735db683c3ff6ec7b1503f")

  })

  it("should derive private key from path m/0'/1/2'/2", () => {
    const derivedKey = PrivateKey.derive(masterKey, "m/0'/1/2'/2")
    expect(derivedKey.key.bytes.toString("hex"))
      .toEqual("0f479245fb19a38a1954c5c7c0ebab2f9bdfd96a17563ef28a6a4b1a2a764ef4")
    expect(derivedKey.chainCode.toString("hex"))
      .toEqual("cfb71883f01676f587d023cc53a35bc7f88f724b1f8c2892ac1275ac822a3edd")
  })

  it("should derive public key for path m/0'/1/2'/2/pub", () => {
    expect(m0h_1_2h_2_pub.key.bytes.toString("hex"))
      .toEqual("02e8445082a72f29b75ca48748a914df60622a609cacfce8ed0e35804560741d29")
    expect(m0h_1_2h_2_pub.chainCode.toString("hex"))
      .toEqual("cfb71883f01676f587d023cc53a35bc7f88f724b1f8c2892ac1275ac822a3edd")
  })

  it("should derive public key for path m/0'/1/2'/2/pub1", () => {
    const m0h_1_2h_2_pub1 = PublicKey.derive(m0h_1_2h_pub, 2)
    expect(m0h_1_2h_2_pub1.key.bytes.toString("hex"))
      .toEqual("02e8445082a72f29b75ca48748a914df60622a609cacfce8ed0e35804560741d29")
    expect(m0h_1_2h_2_pub1.chainCode.toString("hex"))
      .toEqual("cfb71883f01676f587d023cc53a35bc7f88f724b1f8c2892ac1275ac822a3edd")
  })

  it("should derive private key from path m/0'/1/2'/2/1000000000", () => {
    const derivedKey = PrivateKey.derive(masterKey, "m/0'/1/2'/2/1000000000")
    expect(derivedKey.key.bytes.toString("hex"))
      .toEqual("471b76e389e528d6de6d816857e012c5455051cad6660850e58372a6c3e6e7c8")
    expect(derivedKey.chainCode.toString("hex"))
      .toEqual("c783e67b921d2beb8f6b389cc646d7263b4145701dadd2161548a8b078e65e9e")
  })

  it("should derive public key for path m/0'/1/2'/2/1000000000/pub", () => {
    expect(m0h_1_2h_2_1000000000_pub.key.bytes.toString("hex"))
      .toEqual("022a471424da5e657499d1ff51cb43c47481a03b1e77f951fe64cec9f5a48f7011")
    expect(m0h_1_2h_2_1000000000_pub.chainCode.toString("hex"))
      .toEqual("c783e67b921d2beb8f6b389cc646d7263b4145701dadd2161548a8b078e65e9e")
  })

  it("should derive private key from path m/0'/1/2'/2/1000000000 (chained)", () => {

    expect(m0h_1_2h_2_1000000000.key.bytes.toString("hex"))
      .toEqual("471b76e389e528d6de6d816857e012c5455051cad6660850e58372a6c3e6e7c8")
    expect(m0h_1_2h_2_1000000000.chainCode.toString("hex"))
      .toEqual("c783e67b921d2beb8f6b389cc646d7263b4145701dadd2161548a8b078e65e9e")
  })
})

describe("derive keys (test vector #2)", () => {
  const masterKey = getMasterKey("fffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5" +
    "a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542")
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
    const derivedKey = PrivateKey.derive(masterKey, "m/0")
    expect(derivedKey.key.bytes.toString("hex"))
      .toEqual("abe74a98f6c7eabee0428f53798f0ab8aa1bd37873999041703c742f15ac7e1e")
    expect(derivedKey.chainCode.toString("hex"))
      .toEqual("f0909affaa7ee7abe5dd4e100598d4dc53cd709d5a5c2cac40e7412f232f7c9c")
  })

  it("should derive public key from path m/0/pub", () => {
    expect(m0_pub.key.bytes.toString("hex"))
      .toEqual("02fc9e5af0ac8d9b3cecfe2a888e2117ba3d089d8585886c9c826b6b22a98d12ea")
    expect(m0_pub.chainCode.toString("hex"))
      .toEqual("f0909affaa7ee7abe5dd4e100598d4dc53cd709d5a5c2cac40e7412f232f7c9c")
  })

  it("should derive private key from path m/0/2147483647'", () => {
    const derivedKey = PrivateKey.derive(masterKey, "m/0/2147483647'")
    expect(derivedKey.key.bytes.toString("hex"))
      .toEqual("877c779ad9687164e9c2f4f0f4ff0340814392330693ce95a58fe18fd52e6e93")
    expect(derivedKey.chainCode.toString("hex"))
      .toEqual("be17a268474a6bb9c61e1d720cf6215e2a88c5406c4aee7b38547f585c9a37d9")
  })

  it("should derive public key from path m/0/2147483647'/pub", () => {
    expect(m0_2147483647h_pub.key.bytes.toString("hex"))
      .toEqual("03c01e7425647bdefa82b12d9bad5e3e6865bee0502694b94ca58b666abc0a5c3b")
    expect(m0_2147483647h_pub.chainCode.toString("hex"))
      .toEqual("be17a268474a6bb9c61e1d720cf6215e2a88c5406c4aee7b38547f585c9a37d9")
  })

  it("should derive private key from path m0_2147483647'/1", () => {
    const derivedKey = PrivateKey.derive(masterKey, "m0/2147483647'/1")
    expect(derivedKey.key.bytes.toString("hex"))
      .toEqual("704addf544a06e5ee4bea37098463c23613da32020d604506da8c0518e1da4b7")
    expect(derivedKey.chainCode.toString("hex"))
      .toEqual("f366f48f1ea9f2d1d3fe958c95ca84ea18e4c4ddb9366c336c927eb246fb38cb")
  })

  it("should derive public key from path m/0/2147483647'/1/pub", () => {
    expect(m0_2147483647h_1_pub.key.bytes.toString("hex"))
      .toEqual("03a7d1d856deb74c508e05031f9895dab54626251b3806e16b4bd12e781a7df5b9")
    expect(m0_2147483647h_1_pub.chainCode.toString("hex"))
      .toEqual("f366f48f1ea9f2d1d3fe958c95ca84ea18e4c4ddb9366c336c927eb246fb38cb")
  })

  it("should derive private key from path m0/2147483647'/1/2147483646'", () => {
    const derivedKey = PrivateKey.derive(masterKey, "m0/2147483647'/1/2147483646'")
    expect(derivedKey.key.bytes.toString("hex"))
      .toEqual("f1c7c871a54a804afe328b4c83a1c33b8e5ff48f5087273f04efa83b247d6a2d")
    expect(derivedKey.chainCode.toString("hex"))
      .toEqual("637807030d55d01f9a0cb3a7839515d796bd07706386a6eddf06cc29a65a0e29")
  })

  it("should derive public key from path m/0/2147483647'/1/2147483646'/pub", () => {
    expect(m0_2147483647h_1_2147483646h_pub.key.bytes.toString("hex"))
      .toEqual("02d2b36900396c9282fa14628566582f206a5dd0bcc8d5e892611806cafb0301f0")
    expect(m0_2147483647h_1_2147483646h_pub.chainCode.toString("hex"))
      .toEqual("637807030d55d01f9a0cb3a7839515d796bd07706386a6eddf06cc29a65a0e29")
  })

  it("should derive private key from path m0/2147483647'/1/2147483646'/2", () => {
    const derivedKey = PrivateKey.derive(masterKey, "m0/2147483647'/1/2147483646'/2")
    expect(derivedKey.key.bytes.toString("hex"))
      .toEqual("bb7d39bdb83ecf58f2fd82b6d918341cbef428661ef01ab97c28a4842125ac23")
    expect(derivedKey.chainCode.toString("hex"))
      .toEqual("9452b549be8cea3ecb7a84bec10dcfd94afe4d129ebfd3b3cb58eedf394ed271")
  })

  it("should derive public key from path m/0/2147483647'/1/2147483646'/2/pub", () => {
    expect(m0_2147483647h_1_2147483646h_2_pub.key.bytes.toString("hex"))
      .toEqual("024d902e1a2fc7a8755ab5b694c575fce742c48d9ff192e63df5193e4c7afe1f9c")
    expect(m0_2147483647h_1_2147483646h_2_pub.chainCode.toString("hex"))
      .toEqual("9452b549be8cea3ecb7a84bec10dcfd94afe4d129ebfd3b3cb58eedf394ed271")
  })

  it("should derive private key from path m0/2147483647'/1/2147483646'/2 (chained)", () => {
    expect(m0_2147483647h_1_2147483646h_2.key.bytes.toString("hex"))
      .toEqual("bb7d39bdb83ecf58f2fd82b6d918341cbef428661ef01ab97c28a4842125ac23")
    expect(m0_2147483647h_1_2147483646h_2.chainCode.toString("hex"))
      .toEqual("9452b549be8cea3ecb7a84bec10dcfd94afe4d129ebfd3b3cb58eedf394ed271")
  })
})

/**
 * Helper for testing
 * @param {string} seedEntropy
 * @param {string} passPhrase
 * @returns {ExtendedKey<PrivateKey>}
 */
function getMasterKey(seedEntropy: string, passPhrase = "Bitcoin seed"):
  ExtendedKey<PrivateKey.PrivateKey> {

  const entropy = Buffer.from(seedEntropy, "hex")
  const {masterSecret, chainCode} = deriveSeedFromEntropy(entropy, passPhrase)
  const masterKey: ExtendedKey<PrivateKey.PrivateKey> =
    PrivateKey.getExtendedKey(masterSecret, chainCode)

  return masterKey
}