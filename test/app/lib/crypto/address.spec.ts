import {getMasterKey} from "./helpers"
import * as PublicKey from "../../../../app/lib/crypto/key/publicKey"
import {encode} from "../../../../app/lib/crypto/address/p2pkh"
import {ChainType} from "../../../../app/lib/chain/chainType"

describe("p2pkh", () => {
  const masterKey = getMasterKey("000102030405060708090a0b0c0d0e0f", "Bitcoin seed")

  it("should derive a Bech32-encoded P2PKH address from an extended public key", () => {
    const publicKey = PublicKey.create(masterKey)
    expect(encode(publicKey.key, ChainType.main))
      .toEqual("wit1qrjjds4kvrr95kyydrs2klu8k85")
  })
})
