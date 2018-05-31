import {deriveSeedFromEntropy} from "../../../../app/lib/crypto/seed"
import * as PrivateKey from "../../../../app/lib/crypto/key/privateKey"
import {ExtendedKey} from "../../../../app/lib/crypto/key/key"
import {hardened} from "../../../../app/lib/crypto/keyPath"

/**
 * The test vectors come from bip32 and the bitcoin-lib scala library
 */
describe("Private key", () => {
  const entropy = Buffer.from("000102030405060708090a0b0c0d0e0f", "hex")
  const {masterSecret, chainCode} = deriveSeedFromEntropy(entropy, "Bitcoin seed")
  const masterKey: ExtendedKey<PrivateKey.PrivateKey> =
    PrivateKey.getExtendedKey(masterSecret, chainCode)

  it("should encode", () => {

    const derivedKey = PrivateKey.derive(masterKey, 0)
    expect(derivedKey.key.bytes.toString("hex"))
      .toEqual("4e2cdcf2f14e802810e878cf9e6411fc4e712edf19a06bcfcc5d5572e489a3b7")
    expect(derivedKey.chainCode.toString("hex"))
      .toEqual("d323f1be5af39a2d2f08f5e8f664633849653dbe329802e9847cfc85f8d7b52a")
  })
  it("should encode hardened", () => {

    const derivedKeyHardened = PrivateKey.derive(masterKey, hardened(0))
    expect(derivedKeyHardened.key.bytes.toString("hex"))
      .toEqual("edb2e14f9ee77d26dd93b4ecede8d16ed408ce149b6cd80b0715a2d911a0afea")
    expect(derivedKeyHardened.chainCode.toString("hex"))
      .toEqual("47fdacbd0f1097043b78c63c20c34ef4ed9a111d980047ad16282c7ae6236141")
  })
})
