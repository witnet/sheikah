import * as Bech32 from "bech32"
import { ChainType } from "app/common/chain/chainType"
import { kvSwap } from "app/common/utils"
import { Errors } from "app/common/witnet-js/addresses/errors"

/**
 * This object maps Witnet address prefixes to chain types.
 */
export const prefixToChainType: { [key: string]: number } = {
  twit: ChainType.test,
  wit: ChainType.main
}

/**
 * This object maps chain types to Witnet address prefixes.
 * @type {{ [key: number]: string }}
 */
export const chainTypeToPrefix = kvSwap(prefixToChainType)

/**
 * Encode public-key-hash to pay-to-public-key-hash (P2PKH) address
 * @param pkh
 * @param prefix
 */
export const encodeBech32 = (pkh: Buffer, chain: ChainType): string => {
  // Check support for chain type
  if (!(chain in chainTypeToPrefix)) {
    throw new Error(Errors.UNSUPPORTED_CHAIN_TYPE)
  }

  // Get prefix and words for Bech32 encode process
  const prefix: string = chainTypeToPrefix[chain]
  const words = Bech32.toWords(Buffer.concat([Buffer.from([0]), pkh]))

  // Bech32 encode
  return Bech32.encode(prefix, words)
}

/**
 * Decode pay-to-public-key-hash (P2PKH) address to pkh and prefix
 * @param address
 */
export const decodeBech32 = (address: string): [Buffer, ChainType] => {
  // Bech32 decode
  const { prefix, words } = Bech32.decode(address)

  // Check support for prefix
  if (!(prefix in prefixToChainType)) {
    throw new Error(Errors.UNSUPPORTED_CHAIN_TYPE)
  }

  // Get pkh and chain type from prefix and words
  const chainType: ChainType = prefixToChainType[prefix]
  const pkh = Buffer.from(Bech32.fromWords(words)).slice(1)

  return [pkh, chainType]
}