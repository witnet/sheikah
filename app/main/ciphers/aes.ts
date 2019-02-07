import * as crypto from "crypto"
import { Cipher } from "./index"

/**
 * Cipher implementation for AES encryption/decryption
 */
export class AesCipher implements Cipher<Buffer, Buffer> {
  public constructor(private settings: AesCipherSettings) { }

  /**
   * AES cipher encryption method
   * @param data
   * @param _salt
   * @param _iv
   */
  public encrypt = async (data: Buffer, _salt?: Buffer, _iv?: Buffer): Promise<Buffer> => {
    const salt = _salt || saltFactory(this.settings)
    const key = getCipherKey(this.settings, salt)
    const iv = _iv || ivFactory(this.settings)
    const cipher = crypto.createCipheriv(`aes-256-${this.settings.aesMode}`, key, iv)
    const cipherText = Buffer.concat([cipher.update(data), cipher.final()])

    return Buffer.concat([iv, cipherText, salt])
  }

  /**
   * AES cipher decryption method
   * @param data
   */
  public decrypt = async (data: Buffer): Promise<Buffer> => {
    const iv = data.slice(0, this.settings.aesIvByteLength)
    const cipherText = data.slice(this.settings.aesIvByteLength, -this.settings.pbkdSaltByteLength)
    const salt = data.slice(iv.length + cipherText.length)
    const key = getCipherKey(this.settings, salt)
    const decipher = crypto.createDecipheriv(`aes-256-${this.settings.aesMode}`, key, iv)
    const plainText = decipher.update(cipherText)

    return Buffer.concat([plainText, decipher.final()])
  }
}

/**
 * This type contains a set of settings for encryption.
 */
export interface AesCipherSettings {
  /** The name of an AES mode of operation */
  aesMode: "cbc" | "gcm",
  /** AES initialization vector byte length */
  aesIvByteLength: number,
  /** The name of a hash function */
  pbkdHashFunctionName: string,
  /** Number of PBKDF2 iterations */
  pbkdHashIterations: number,
  /** AES key byte length */
  pbkdKeyByteLength: number,
  /** PBFDK2 salt byte length */
  pbkdSaltByteLength: number,
  /** User defined password */
  pbkdPassword: string,
}

export const defaultAesCipherSettings: AesCipherSettings = {
  aesMode: "cbc",
  aesIvByteLength: 16,
  pbkdHashFunctionName: "sha256",
  pbkdHashIterations: 10_000,
  pbkdKeyByteLength: 32,
  pbkdSaltByteLength: 32,
  pbkdPassword: "",
}

/**
 * Derives an AES-suitable key from a password and salt using PBKDF2 key stretching
 * @param {Settings} settings
 * @param {Buffer} salt
 * @returns {Buffer}
 */
const getCipherKey = (settings: AesCipherSettings, salt: Buffer): Buffer => {
  return crypto.pbkdf2Sync(
    settings.pbkdPassword,
    salt,
    settings.pbkdHashIterations,
    settings.pbkdKeyByteLength,
    settings.pbkdHashFunctionName
  )
}

export const ivFactory = (settings: AesCipherSettings): Buffer => {
  return crypto.randomBytes(settings.aesIvByteLength)
}

export const saltFactory = (settings: AesCipherSettings): Buffer => {
  return crypto.randomBytes(settings.pbkdSaltByteLength)
}
