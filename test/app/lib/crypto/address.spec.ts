import {getMasterKey} from "./helpers"
import * as PublicKey from "../../../../app/lib/crypto/key/publicKey"
import {decode, encode} from "../../../../app/lib/crypto/address/p2pkh"
import {ChainType} from "../../../../app/lib/chain/chainType"
import {sha256} from "../../../../app/lib/crypto/hash"

describe("p2pkh", () => {
  const masterKey = getMasterKey("000102030405060708090a0b0c0d0e0f", "Bitcoin seed")
  const publicKey = PublicKey.create(masterKey)

  it("should derive a Bech32-encoded P2PKH address from an extended public key", () => {

    expect(encode(publicKey.key, ChainType.main))
      .toEqual("wit1qzmkvfrw4nrk73uppwaaelxupd89f3vc85r9mwjh")
  })

  it("should decode a Bech32-encoded P2PKH address", () => {
    const [chainType, publicKeyHash] = decode("wit1qzmkvfrw4nrk73uppwaaelxupd89f3vc85r9mwjh")
    expect(chainType).toEqual(ChainType.main)
    expect(publicKeyHash).toEqual(sha256(publicKey.key.bytes).slice(0, 20))
  })
})
