import { getMasterKey } from "test/__helpers__/crypto"
import * as PublicKey from "app/main/crypto/key/publicKey"
import { ChainType } from "app/common/chain/chainType"
import * as fixtures from "./addressFixtures"
import { sha256 } from "app/main/crypto/hash"
import { computeAddress, decodeAddress } from "app/main/crypto/address/p2pkh"

describe("p2pkh", () => {
  const masterKey = getMasterKey(fixtures.p2pkh.seedEntropy, fixtures.p2pkh.passPhrase)
  const publicKey = PublicKey.create(masterKey)

  it("should derive a Bech32-encoded P2PKH address from an extended public key", () => {

    expect(computeAddress(publicKey.key, ChainType.main))
      .toEqual(fixtures.p2pkh.encodedAddress)
  })

  it("should decode a Bech32-encoded P2PKH address", () => {
    const [publicKeyHash, chainType] = decodeAddress(fixtures.p2pkh.encodedAddress)
    expect(chainType).toEqual(ChainType.main)
    expect(publicKeyHash).toEqual(sha256(publicKey.key.bytes).slice(0, 20))
  })
})
