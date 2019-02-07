/**
 * All ciphers must implement this interface
 */
export interface Cipher<A, B> {
  encrypt: (plainText: A) => Promise<B>,
  decrypt: (cypherText: B) => Promise<A>,
}
