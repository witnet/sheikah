import * as Slip32 from "app/main/encoding/slip32"
import { KeyPath } from "app/main/crypto/keyPath"
import { ExtendedKey } from "app/main/crypto/key/key"
import { PrivateKey } from "app/main/crypto/key/privateKey"
import { PublicKey } from "app/main/crypto/key/publicKey"

import * as fixtures from "./fixtures"

describe(`Slip32 key exchange: import private key (${fixtures.slip32.valid.length} test vectors)`,
  () => {
    fixtures.slip32.valid.forEach((item, index) => {
      it("should import private key from Slip32 " +
        `(${index + 1}, key: ${cropString(item.prvBech32, 15, true)})`, () => {
        const importedKey = Slip32.importKeyFromSlip32(item.prvBech32)
        // Compare key path
        const keyPath = keyPathFromString(item.keyPath)
        expect(importedKey.keyPath).toEqual(keyPath)
        // Compare hex to imported key data
        const { key, chainCode } = getKeysFromHex(item.prvHex)
        expect(importedKey.extendedKey.key.bytes).toEqual(key)
        expect(importedKey.extendedKey.chainCode).toEqual(chainCode)
      })
    })
  })
describe(`Slip32 key exchange: import public key (${fixtures.slip32.valid.length} test vectors)`,
  () => {
    fixtures.slip32.valid.forEach((item, index) => {
      it("should import public key from Slip32 " +
        `(${index + 1}, key: ${cropString(item.pubBech32, 15, true)})`, () => {
        const importedKey = Slip32.importKeyFromSlip32(item.pubBech32)
        // Compare key path
        const keyPath = keyPathFromString(item.keyPath)
        expect(importedKey.keyPath).toEqual(keyPath)
        // Compare hex to imported key data
        const { key, chainCode } = getKeysFromHex(item.pubHex)
        expect(importedKey.extendedKey.key.bytes).toEqual(key)
        expect(importedKey.extendedKey.chainCode).toEqual(chainCode)
      })
    })
  })
describe(`Slip32 key exchange: export private key (${fixtures.slip32.valid.length} test vectors)`,
  () => {
    fixtures.slip32.valid.forEach((item, index) => {
      it("should export private key as Slip32 " +
        `(${index + 1}, hex: ${cropString(item.prvHex, 15, true)})`, () => {
        const keyPath = keyPathFromString(item.keyPath)
        const { key, chainCode } = getKeysFromHex(item.prvHex)
        const extendedKey: ExtendedKey<PrivateKey> = {
          key: { type: "private", bytes: key }, chainCode
        }
        const exportedKey = Slip32.exportKeyToSlip32(keyPath, extendedKey)
        expect(exportedKey).toEqual(item.prvBech32)
      })
    })
  })
describe(`Slip32 key exchange: export public key (${fixtures.slip32.valid.length} test vectors)`,
  () => {
    fixtures.slip32.valid.forEach((item, index) => {
      it("should export public key as Slip32 " +
        `(${index + 1}, hex: ${cropString(item.pubHex, 15, true)})`, () => {
        const keyPath = keyPathFromString(item.keyPath)
        const { key, chainCode } = getKeysFromHex(item.pubHex)
        const extendedKey: ExtendedKey<PublicKey> = {
          key: { type: "public", bytes: key }, chainCode
        }
        const exportedKey = Slip32.exportKeyToSlip32(keyPath, extendedKey)
        expect(exportedKey).toEqual(item.pubBech32)
      })
    })
  })

/**
 * Get key and chaincode bytes from hexidecimal representation
 * @param {string} hex
 * @returns {{key: Buffer; chainCode: Buffer}}
 */
function getKeysFromHex(hex: string) {
  const buffer = Buffer.from(hex, "hex")
  const key = buffer.slice(buffer.length - 33)
  const chainCode = buffer.slice(buffer.length - 33 - 32, buffer.length - 33)

  return {key, chainCode}
}

/**
 * Crop long strings to be displayed in the tests
 * It crops the text from the beginning (default) or from the end of the given string
 * @param {string} text
 * @param {number} limit
 * @param {boolean} end
 * @returns {string}
 */
function cropString(text: string, limit: number, end?: boolean) {
  if (!end) {
    return text.length > limit ? text.substr(0, limit).concat("...") : text
  } else {
    return text.length > limit ? "...".concat(text.substr(text.length - limit, text.length)) : text
  }
}

/**
 * Returns hardened key paths
 * @param {number} index
 * @returns {number}
 */
function hardened(index: number) {
  return index + 0x80000000
}

/**
 * KeyPath from string
 * @param {string} path a string containing a list of integers separated by a '/'. May start with
 * "/" or "m/". A single quote appended at the end means use the hardened version of the key index
 * (e.g. m/44'/0'/0'/0)
 * @returns {KeyPath}
 */
function keyPathFromString(path: string): KeyPath {
  const toNumber = (value: string): number => {
    const number = value.slice(-1) === "'" ?
      hardened(parseInt(value.slice(0, -1))) : parseInt(value)
    if (isNaN(number)) {
      throw Error("Invalid number")
    }

    return number
  }
  // const path1 = _.trimStart(_.trimStart(path, "m"), "/")
  const path1 = path.replace(/^m*\/*/, "")

  return path1.length === 0 ? [] : path1.split("/").map(toNumber)
}