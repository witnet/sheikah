import * as KeyPath from "../crypto/keyPath"
import * as Key from "../crypto/key/key"
import * as PrivateKey from "../crypto/key/privateKey"
import * as PublicKey from "../crypto/key/publicKey"
import { integerAsBuffer } from "../utils/conversions"
import { privateKeyVerify, publicKeyVerify } from "secp256k1"
import * as Bech32 from "bech32"

/*
 * Private and public key exchange format (slip32 serialization)
 * Field lengths in bytes
 */
const DEPTH_LENGTH = 1
const KEYPATH_LENGTH = 4
const CHAINCODE_LENGTH = 32
const KEY_LENGTH = 33

/*
 * Bech32 encoding limit for slip32 serialization
 * LIMIT = 1 byte + 4 * MAX_DEPTH bytes + 32 bytes + 33 bytes
 */
const BECH32_LIMIT = computeSlip32Limit()

/**
 * Buffer with a Human Readable Part (hrp) as prefix, used for Bech32 encoding/decoding
 */
type PrefixedBuffer = {
  hrp: string
  words: Buffer
}

/**
 * Bech32 decode wrapper using the predefined limit
 * @param {string} encodedBech32
 * @returns {PrefixedBuffer}
 */
export const decode = (encodedBech32: string): PrefixedBuffer => {
  const { prefix: hrp, words } = Bech32.decode(encodedBech32, BECH32_LIMIT)

  return { hrp, words }
}

/**
 * Bech32 decode wrapper using the predefined limit
 * @param {string} hrp
 * @param {Buffer} words
 * @returns {string}
 */
export const encode = ({ hrp, words }: PrefixedBuffer): string => {
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
    return encode({ hrp: "xprv", words })
  } else {
    return encode({ hrp: "xpub", words })
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
  const { hrp, words }: { hrp: string, words: Buffer } = decode(slip32)
  // Check hrp
  if ((hrp !== "xprv") && (hrp !== "xpub")) {
    throw Error("Malformed slip32 serialized key: invalid hrp")
  }

  // Convert from words to bytes
  const data = Bech32.fromWords(words)

  // Extract Key Path depth
  const depth: number = Buffer.from(data).readIntBE(0, DEPTH_LENGTH)

  // Check expected data length
  const expectedLength = getExpectedDataLength(depth)
  if (data.length !== expectedLength) {
    throw Error("Malformed slip32 serialized key: invalid data length" +
      `(expected: ${expectedLength}, was: ${data.length}`)
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

  // Check if private key is valid (1st byte is sliced due to check requires 32-bytes)
  if (hrp === "xprv" && !privateKeyVerify(key.slice(1))) {
    throw Error("Import slip32 error: invalid private key")
  }
  // Check if public key is valid
  if (hrp === "xpub" && !publicKeyVerify(key)) {
    throw Error("Import slip32 error: invalid public key")
  }

  // Create Extended Key of the type private (xprv) or public (xpub)
  const extendedKey: Key.ExtendedKey<PrivateKey.PrivateKey> | Key.ExtendedKey<PublicKey.PublicKey> =
    hrp === "xprv" ? PrivateKey.extend(PrivateKey.fromBytes(key), chaincode) :
      PublicKey.extend(PublicKey.fromBytes(key), chaincode)

  return {
    keyPath,
    extendedKey
  }
}

/**
 * Computes the Bech32 limit for the slip32 serialization
 * @returns {number}
 */
export function computeSlip32Limit() {
  return DEPTH_LENGTH + ((Math.pow(256, DEPTH_LENGTH) - 1) * KEYPATH_LENGTH) + CHAINCODE_LENGTH +
    KEY_LENGTH
}

/**
 * Returns the expected data length given a depth (in bytes)
 * @param {number} depth
 * @returns {number}
 */
function getExpectedDataLength(depth: number) {
  return DEPTH_LENGTH + depth * KEYPATH_LENGTH + CHAINCODE_LENGTH + KEY_LENGTH
}