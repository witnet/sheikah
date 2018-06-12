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

/**
 * Wrap crypto.createHash to streamline its worflow without losing parameterization.
 * @param {string} hashFunctionName name of a hash function
 * @param {Buffer} bytes
 * @returns {Buffer} sha function
 */
const hash = (hashFunctionName: string, bytes: Buffer) => {
  return crypto.createHash(hashFunctionName).update(bytes).digest()
}

/**
 * sha256
 * @param {Buffer} bytes
 * @returns {Buffer}
 */
export const sha256 = (bytes: Buffer): Buffer => {
  return hash("sha256", bytes)
}