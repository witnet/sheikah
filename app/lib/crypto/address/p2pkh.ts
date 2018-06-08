import {PublicKey} from "../key/publicKey"
import * as Bech32 from "bech32"
import {sha256} from "../hash"

/**
 * Encode address
 * @param {PublicKey} pubKey public key
 * @param {"wit" | "twit"} hrp human readable part
 * @returns {string} address
 */
export const encode = (pubKey: PublicKey, hrp: "wit" | "twit"): string => {
  const b32 = Bech32.toWords(Buffer.concat([Buffer.from([0]), sha256(pubKey.bytes).slice(20)]))

  return Bech32.encode(hrp, b32)
}