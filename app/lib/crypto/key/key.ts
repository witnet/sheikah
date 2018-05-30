import {PublicKey} from "./publicKey"
import {PrivateKey} from "./privateKey"

/**
 * Key interface
 * The buffer should have a length of 32 bytes
 */
export interface Key {
  bytes: Buffer
}

/**
 * Extended key
 */
export type ExtendedKey<Key> = {
  key: Key
  chainCode: ChainCode
}

/**
 * Chain code (32 bytes)
 */
export type ChainCode = Buffer

export const getExtendedKey: {
  (bytes: Buffer, chainCode: ChainCode, type: "public"): ExtendedKey<PublicKey>
  (bytes: Buffer, chainCode: ChainCode, type: "private"): ExtendedKey<PrivateKey>
} = (bytes: Buffer, chainCode: ChainCode, type: "private" | "public"): any => {
  return {
    key: {type, bytes},
    chainCode
  }
}
