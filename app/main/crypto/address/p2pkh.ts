import * as Bech32 from "bech32"
import {PublicKey} from "../key/publicKey"
import {sha256} from "../hash"
import {ChainType} from "../../chain/chainType"
import {Errors} from "../errors"
import {kvSwap} from "../../utils/utils"

/**
 * This object maps Witnet address prefixes to chain types.
 */
const prefixToChainType: { [key: string]: number } = {
  twit: ChainType.test,
  wit: ChainType.main
}

/**
 * This object maps chain types to Witnet address prefixes.
 * @type {{ [key: number]: string }}
 */
const chainTypeToPrefix = kvSwap(prefixToChainType)

/**
 * Encode pay-to-public-key-hash (P2PKH) address
 * @param {PublicKey} pubKey public key
 * @param chain
 * @returns {string} address
 */
export const encode = (pubKey: PublicKey, chain: ChainType): string => {
  if (!(chain in chainTypeToPrefix)) {
    throw new Error(Errors.UNSUPPORTED_CHAIN_TYPE)
  }
  const b32 = Bech32.toWords(Buffer.concat([Buffer.from([0]), sha256(pubKey.bytes).slice(0, 20)]))
  const hrp: string = chainTypeToPrefix[chain]

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

  if (!(prefix in prefixToChainType)) {
    throw new Error(Errors.UNSUPPORTED_CHAIN_TYPE)
  }
  const chainType: ChainType = prefixToChainType[prefix]

  return [chainType, keyHash.slice(1)]
}
