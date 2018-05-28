declare module "secp256k1" {
  /** Options for the `sign` function */
  export interface SignOptions {
    /** Nonce generator. By default it is rfc6979 */
    noncefn?: (message: Buffer, privateKey: Buffer, algo: Buffer | null,
               data: Buffer | null, attempt: number) => Buffer,

    /**
     * Additional data for noncefn (RFC 6979 3.6) (32 bytes).
     *
     * By default is `null`.
     */
    data?: Buffer
  }

  /**
   * Verify an ECDSA privateKey.
   */
  export const privateKeyVerify: (privateKey: Buffer) => boolean

  /**
   * Export a privateKey in DER format.
   */
  export const privateKeyExport: (privateKey: Buffer,
                                  compressed?: boolean) => Buffer

  /**
   * Import a privateKey in DER format.
   */
  export const privateKeyImport: (privateKey: Buffer) => Buffer

  /**
   * Negate a privateKey by subtracting it from the order of the
   * curve's base point.
   */
  export const privateKeyNegate: (privateKey: Buffer) => Buffer

  /**
   * Compute the inverse of a privateKey (modulo the order of the curve's
   * base point).
   */
  export const privateKeyModInverse: (privateKey: Buffer) => Buffer

  /**
   * Tweak a privateKey by adding tweak to it.
   */
  export const privateKeyTweakAdd: (privateKey: Buffer,
                                    tweak: Buffer) => Buffer

  /**
   * Tweak a privateKey by multiplying it by a tweak.
   */
  export const privateKeyTweakMul: (privateKey: Buffer,
                                    tweak: Buffer) => Buffer

  /**
   * Compute the public key for a privateKey.
   */
  export const publicKeyCreate: (privateKey: Buffer,
                                 compressed?: boolean) => Buffer

  /**
   * Convert a publicKey to compressed or uncompressed form.
   */
  export const publicKeyConvert: (publicKey: Buffer,
                                  compressed?: boolean) => Buffer

  /**
   * Verify an ECDSA publicKey.
   */
  export const publicKeyVerify: (publicKey: Buffer) => boolean

  /**
   * Tweak a publicKey by adding tweak times the generator to it.
   */
  export const publicKeyTweakAdd: (publicKey: Buffer, tweak: Buffer,
                                   compressed?: boolean) => Buffer

  /**
   * Tweak a publicKey by multiplying it by a tweak value.
   */
  export const publicKeyTweakMul: (publicKey: Buffer, tweak: Buffer,
                                   compressed?: boolean) => Buffer

  /**
   * Add a given publicKeys together.
   */
  export const publicKeyCombine: (publicKeys: Array<Buffer>,
                                  compressed?: boolean) => Buffer

  /**
   * Convert a signature to a normalized lower-S form.
   */
  export const signatureNormalize: (signature: Buffer) => Buffer

  /**
   * Serialize an ECDSA signature in DER format.
   */
  export const signatureExport: (signature: Buffer) => Buffer

  /**
   * Parse a DER ECDSA signature (follow by BIP66).
   */
  export const signatureImport: (signature: Buffer) => Buffer

  /**
   * Same as `signatureImport` but not follow by BIP66.
   */
  export const signatureImportLax: (signature: Buffer) => Buffer

  /**
   * Create an ECDSA signature. Always return low-S signature.
   *
   * Inputs: 32-byte message `m`, 32-byte scalar key `d`,
   * 32-byte scalar nonce `k`.
   * - Compute point `R = k * G`. Reject nonce if R's `x` coordinate is zero.
   * - Compute 32-byte scalar `r`, the serialization of R's `x` coordinate.
   * - Compose 32-byte scalar `s = k^-1 * (r * d + m)`. Reject nonce if `s`
   *   is zero.
   * - The signature is `(r, s)`.
   */
  export const sign: (message: Buffer, privateKey: Buffer,
                      options?: SignOptions) => {signature: Buffer,
                                                 recovery: number}

  /**
   * Verify an ECDSA signature.
   *
   * Note: return false for high signatures!
   *
   * Inputs: 32-byte message `m`, public key point `Q`,
   * signature: (32-byte `r`, scalar `s`).
   * - Signature is invalid if `r` is zero.
   * - Signature is invalid if `s` is zero.
   * - Compute point `R = (s^-1 * m * G + s^-1 * r * Q)`. Reject if `R`
   *   is infinity.
   * - Signature is valid if R's `x` coordinate equals to `r`.
   */
  export const verify: (message: Buffer, signature: Buffer,
                        publicKey: Buffer) => boolean

  /**
   * Recover an ECDSA public key from a signature.
   */
  export const recover: (message: Buffer, signature: Buffer, recovery: number,
                         compressed?: boolean) => Buffer

  /**
   * Compute an EC Diffie-Hellman secret and applied sha256 to compressed
   * public key.
   */
  export const ecdh: (publicKey: Buffer, privateKey: Buffer) => Buffer

  /**
   * Compute an EC Diffie-Hellman secret and return public key as result.
   */
  export const ecdhUnsafe: (publicKey: Buffer, privateKey: Buffer,
                            compressed?: boolean) => Buffer
}
