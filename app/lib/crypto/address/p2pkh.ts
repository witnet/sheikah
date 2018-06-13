import * as Bech32 from "bech32"
import {PublicKey} from "../key/publicKey"
import {sha256} from "../hash"
import {ChainType} from "../../chain/chainType"
import {Errors} from "../errors"

/**
 * Witnet chain prefix
 */
enum Prefix {
  twit,
  wit
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
  const hrp = Prefix[chain]

  return Bech32.encode(hrp, b32)
}
