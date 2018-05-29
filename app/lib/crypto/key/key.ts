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