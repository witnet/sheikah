import * as crypto from "crypto"

/**
 *  Create hmac function for the indicated number of bits
 * @param {string} hmacBits number of bits for the hmac sha function
 * @returns {(buf: Buffer) => Buffer} hmac function
 */
const hmacFunction = (hmacBits: string, key: Buffer) => {
  return (buf: Buffer) => crypto.createHmac(hmacBits, key).update(buf).digest()
}

/**
 * sha512mac
 * @param {Buffer} data to be hashed
 * @param {Buffer} key to hash the data
 * @returns {Buffer}
 */
export const sha512hmac = (key: Buffer, data: Buffer) => {
  return hmacFunction("sha512", key)(data)
}
