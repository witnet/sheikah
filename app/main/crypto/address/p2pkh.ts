import { PublicKey } from "app/main/crypto/key/publicKey"
import { sha256 } from "app/main/crypto/hash"
import { Errors } from "app/main/crypto/errors"
import { encodeBech32, decodeBech32, chainTypeToPrefix } from "app/common/witnet-js/addresses/p2pkh"
import { ChainType } from "app/common/chain/chainType"

/**
 * Get first 20 bytes of public-key-hash from public key
 * @param pubKey
 */
export const computePkh = (pubKey: PublicKey) => {
  return sha256(pubKey.bytes).slice(0, 20)
}

/**
 * Get pay-to-public-key-hash (P2PKH) address from public key
 * @param {PublicKey} pubKey public key
 * @param chain
 * @returns {string} address
 */
export const computeAddress = (pubKey: PublicKey, chain: ChainType): string => {
  // Check chain type prior to crypto ops
  if (!(chain in chainTypeToPrefix)) {
    throw new Error(Errors.UNSUPPORTED_CHAIN_TYPE)
  }

  // Compute pkh
  const pkh: Buffer = computePkh(pubKey)

  return encodeBech32(pkh, chain)
}

/**
 * Decode the chain type and the first 20 bytes of the hash of the public key
 * @param {string} address
 * @returns {[Buffer, ChainType]}
 */
export const decodeAddress = (address: string): [Buffer, ChainType] => {
  return decodeBech32(address)
}
