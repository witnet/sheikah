import * as crypto from "crypto"

/**
 *  Create hmac function for the indicated hash function
 * @param {string} hashFunctionName name of a hash function
 * @returns {(buf: Buffer) => Buffer} hmac function
 */
const hmacFunction = (hashFunctionName: string, key: Buffer) => {
  return (buf: Buffer) => crypto.createHmac(hashFunctionName, key).update(buf).digest()
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
