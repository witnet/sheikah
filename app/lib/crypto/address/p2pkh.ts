import * as Bech32 from "bech32"
import {PublicKey} from "../key/publicKey"
import {sha256} from "../hash"
import {ChainType} from "../../chain/chainType"
import {Errors} from "../errors"

/**
 * Witnet chain prefix
 */
enum Prefix {
  twit = ChainType.test,
  wit = ChainType.main
}

/**
 * Encode pay-to-public-key-hash (P2PKH) address
 * @param {PublicKey} pubKey public key
 * @param chain
 * @returns {string} address
 */
export const encode = (pubKey: PublicKey, chain: ChainType): string => {
  if (!(chain in Prefix)) {
    throw new Error(Errors.UNSUPPORTED_CHAIN_TYPE)
  }
  const b32 = Bech32.toWords(Buffer.concat([Buffer.from([0]), sha256(pubKey.bytes).slice(0, 20)]))
  const hrp: string = Prefix[chain]

  return Bech32.encode(hrp, b32)
}

/**
 * Decode the chain type and the hash of the first 20 bytes of the public key
 * @param {string} address
 * @returns {[ChainType , Buffer]}
 */
export const decode = (address: string): [ChainType, Buffer] => {
  const {prefix, words} = Bech32.decode(address)
  const keyHash = Buffer.from(Bech32.fromWords(words))

  let chainType: ChainType

  switch (prefix) {
    case "twit":
      chainType = ChainType.test
      break
    case "wit":
      chainType = ChainType.main
      break
    default:
      throw new Error(Errors.UNSUPPORTED_CHAIN_TYPE)
  }

  return [chainType, keyHash.slice(1)]
}
