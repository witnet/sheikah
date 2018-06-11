import * as Bech32 from "bech32"
import {PublicKey} from "../key/publicKey"
import {sha256} from "../hash"
import {ChainType} from "../../chain/chainType"

/**
 * Encode address
 * @param {PublicKey} pubKey public key
 * @param chain
 * @returns {string} address
 */
export const encode = (pubKey: PublicKey, chain: ChainType): string => {
  if (!(chain in Prefix)) {
    throw new Error("Unsupported chain type")
  }
  const b32 = Bech32.toWords(Buffer.concat([Buffer.from([0]), sha256(pubKey.bytes).slice(20)]))
  const hrp = Prefix[chain]

  return Bech32.encode(hrp, b32)
}

/**
 * Witnet chain prefix
 */
enum Prefix {
  "twit",
  "wit"
}