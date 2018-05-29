import * as crypto from "crypto"

/**
 * This module Contains all the functions related to encryption middleware for storage.
 */

/**
 * This type contains a set of settings for encryption.
 */
export type Settings = {
  /** The name of a ciphering algorithm */
  cipherAlgo: string
  /** The name of a hash function */
  hashFunction: string
  /** Number of PBKDF2 iterations */
  iterations: number
  /** PBFDK2 initialization vector byte length */
  ivByteLength: number
  /** AES key byte length */
  keyByteLength: number
  /** User defined password */
  password: string
  /** PBFDK2 salt byte length */
  saltByteLength: number
}

export const defaultSettings: Settings = {
  cipherAlgo: "aes-256-cbc",
  hashFunction: "sha256",
  iterations: 10_000,
  ivByteLength: 16,
  keyByteLength: 32,
  saltByteLength: 32,
  password: ""
}

/**
 * Crypto buffers serializer function.
 * @param {Array<Buffer>} buffers
 * @returns {Buffer}
 */
const serialize = (buffers: Array<Buffer>): Buffer => {
  const parts: Array<Buffer> = []

  buffers.forEach( (part: Buffer) => {
    const dataLength = Buffer.alloc(4)
    dataLength.writeUInt32BE(part.length, 0)
    parts.push(dataLength)
    parts.push(part)
  })

  return Buffer.concat(parts)
}

/**
 * Crypto buffers deserializer function.
 * @param {Buffer} data
 * @returns {Array<Buffer>}
 */
const deserialize = (data: Buffer): Array<Buffer> => {
  const parts: Array<Buffer> = []

  let idx = 0
  while (idx < data.length) {
    const dataLength = data.readUInt32BE(idx)
    idx += 4
    const start = idx
    const end = start + dataLength
    const part = data.slice(start, end)
    parts.push(part)
    idx += part.length
  }

  return parts
}

/**
 * Derives a PBKDF2 key from a password and salt.
 * @param {Settings} settings
 * @param {Buffer} salt
 * @returns {Buffer}
 */
const getCipherKey = (
  settings: Settings,
  salt: Buffer): Buffer => {
  return crypto.pbkdf2Sync(
    settings.password,
    salt,
    settings.iterations,
    settings.keyByteLength,
    settings.hashFunction
  )
}

export const ivFactory = (settings: Settings): Buffer => {
  return crypto.randomBytes(settings.ivByteLength)
}

export const saltFactory = (settings: Settings): Buffer => {
  return crypto.randomBytes(settings.saltByteLength)
}

/**
 * Applies SHA256 hash function on a string and returns the digest as a Buffer.
 * @param {string} key
 * @returns {Buffer}
 */
export const hash = (key: string): Buffer => {
  return crypto.createHash("sha256").update(key).digest()
}

/**
 * Encrypts any kind of object into a Buffer.
 * @param {Buffer} data
 * @param {Settings} settings
 * @param {Buffer} existingIv
 * @param {Buffer} existingSalt
 * @returns {Buffer}
 */
export const encrypt = (data: Buffer,
                        settings: Settings,
                        existingIv?: Buffer,
                        existingSalt?: Buffer): Buffer => {
  const iv = existingIv || ivFactory(settings)
  const salt = existingSalt || saltFactory(settings)
  const key = getCipherKey(settings, salt)
  const cipher = crypto.createCipheriv(settings.cipherAlgo, key, iv)
  const ciphertext = Buffer.concat([cipher.update(data), cipher.final()])
  const parts = [iv, ciphertext, salt]

  return serialize(parts)
}

/**
 * Decrypts any kind of object from a Buffer.
 * @param {Buffer} data
 * @param {Settings} settings
 * @returns {any}
 */
export const decrypt = (data: Buffer, settings: Settings): Buffer => {
  const parts = deserialize(data)
  const iv = parts[0]
  const ciphertext = parts[1]
  const salt = parts[2]
  const key = getCipherKey(settings, salt)

  const decipher = crypto.createDecipheriv(settings.cipherAlgo, key, iv)
  const plaintext = decipher.update(ciphertext)

  return Buffer.concat([plaintext, decipher.final()])
}