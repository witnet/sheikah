import * as KeyPath from "../crypto/keyPath"
import * as Key from "../crypto/key/key"
import * as PrivateKey from "../crypto/key/privateKey"
import * as PublicKey from "../crypto/key/publicKey"
import {integerAsBuffer} from "../utils/conversions"
import {privateKeyVerify, publicKeyVerify} from "secp256k1"
import * as Bech32 from "bech32"

/*
 * Private and public key exchange format (slip32 serialization)
 */
const DEPTH_LENGTH = 1
const KEYPATH_LENGTH = 4
const CHAINCODE_LENGTH = 32
const KEY_LENGTH = 33

/*
 * Bech32 encoding limit for slip32 serialization
 * LIMIT = 1 byte + 4 * MAX_DEPTH bytes + 32 bytes + 33 bytes
 */
const BECH32_LIMIT = DEPTH_LENGTH + ((Math.pow(2, DEPTH_LENGTH * 8) - 1) * KEYPATH_LENGTH)
  + CHAINCODE_LENGTH + KEY_LENGTH

/**
 * Bech32 decode wrapper using the predefined limit
 * @param {string} string
 * @returns {{prefix: string; words: Buffer}}
 *         Human readable part and decoded words (5-bit)
 */
export const decode = (string: string): { prefix: string, words: Buffer } => {
  return Bech32.decode(string, BECH32_LIMIT)
}

/**
 * Bech32 decode wrapper using the predefined limit
 * @param {string} hrp
 * @param {Buffer} words
 * @returns {string}
 */
export const encode = (hrp: string, words: Buffer): string => {
  return Bech32.encode(hrp, Buffer.from(words), BECH32_LIMIT)
}

/**
 * Export key to slip32 format
 * @param {KeyPath} keyPath
 * @param {ExtendedKey<PrivateKey> | ExtendedKey<PublicKey>} extKey
 * @returns {string}
 */
export const exportKeyToSlip32 = (keyPath: KeyPath.KeyPath, extKey:
  Key.ExtendedKey<PrivateKey.PrivateKey> | Key.ExtendedKey<PublicKey.PublicKey>): string => {
  // Serialization (bytes)
  const data: Array<Buffer> = []
  // Depth (1 byte)
  data.push(Buffer.from([keyPath.length & 0xFF]))
  // KeyPath (4*depth)
  data.push(Buffer.concat(keyPath.map(integerAsBuffer)))
  // Chaincode (32 bytes)
  data.push(extKey.chainCode)
  // Public/Private Key (33 bytes)
  data.push(extKey.key.bytes)

  // Encode hrp + words (5-bit)
  const words = Bech32.toWords(Buffer.concat(data))
  if (extKey.key.type === "private") {
    return encode("xprv", words)
  } else {
    return encode("xpub", words)
  }
}

/**
 * Import key from slip32 format
 * @param {string} slip32
 * @returns {{keyPath: KeyPath; extendedKey: ExtendedKey<PrivateKey> | ExtendedKey<PublicKey>}}
 */
export const importKeyFromSlip32 = (slip32: string): {
  keyPath: KeyPath.KeyPath,
  extendedKey: Key.ExtendedKey<PrivateKey.PrivateKey> | Key.ExtendedKey<PublicKey.PublicKey>
} => {
  // Decode slip32
  const {prefix, words}: { prefix: string, words: Buffer } = decode(slip32)
  // Check hrp
  if ((prefix !== "xprv") && (prefix !== "xpub")) {
    throw Error("Malformed slip32 serialized key: invalid hrp")
  }

  // Convert from words to bytes
  const data = Bech32.fromWords(words)

  // Extract Key Path depth
  const depth: number = Buffer.from(data).readIntBE(0, DEPTH_LENGTH)

  // Check data length
  if (data.length !== DEPTH_LENGTH + depth * KEYPATH_LENGTH + CHAINCODE_LENGTH + KEY_LENGTH) {
    throw Error("Malformed slip32 serialized key: invalid data length" +
      `(expected: ${DEPTH_LENGTH + depth * KEYPATH_LENGTH + CHAINCODE_LENGTH + KEY_LENGTH},` +
      `was: ${data.length}`)
  }

  // Extract Key Path
  const keyPath: KeyPath.KeyPath = []
  for (let i = 0; i < depth; i++) {
    keyPath.push(Buffer.from(data.slice(
      DEPTH_LENGTH + i * KEYPATH_LENGTH,
      DEPTH_LENGTH + ((i + 1) * KEYPATH_LENGTH))).readUInt32BE(0))
  }

  // Extract Chaincode
  const chaincode: Buffer = Buffer.from(data.slice(
    DEPTH_LENGTH + depth * KEYPATH_LENGTH,
    DEPTH_LENGTH + depth * KEYPATH_LENGTH + CHAINCODE_LENGTH))

  // Extract Key
  const key: Buffer = Buffer.from(data.slice(
    DEPTH_LENGTH + depth * KEYPATH_LENGTH + CHAINCODE_LENGTH))

  // Check if private key is valid (1st byte is sliced, check requires 32-bytes)
  if (prefix === "xprv" && !privateKeyVerify(key.slice(1))) {
    throw Error("Import slip32 error: invalid private key")
  }
  // Check if public key is valid
  if (prefix === "xpub" && !publicKeyVerify(key)) {
    throw Error("Import slip32 error: invalid public key")
  }

  // Create Extended Key of the type private (xprv) or public (xpub)
  const extendedKey: Key.ExtendedKey<PrivateKey.PrivateKey> | Key.ExtendedKey<PublicKey.PublicKey> =
    prefix === "xprv" ? PrivateKey.extend(PrivateKey.fromBytes(key), chaincode) :
      PublicKey.extend(PublicKey.fromBytes(key), chaincode)

  return {
    keyPath,
    extendedKey
  }
}