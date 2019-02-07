/**
 * Key interface
 * The buffer should have a length of 32 bytes
 */
export interface Key {
  bytes: Buffer,
}

/**
 * Extended keys, as introduced by BIP-0032, pair a key with a chain code
 */
export interface ExtendedKey<Key> {
  key: Key,
  chainCode: ChainCode,
}

/**
 * Chain code (32 bytes)
 */
export type ChainCode = Buffer
