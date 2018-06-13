import * as exchange from "../../../../app/lib/encoding/slip32"
import * as KeyPath from "../../../../app/lib/crypto/keyPath"
import * as PrivateKey from "../../../../app/lib/crypto/key/privateKey"
import * as PublicKey from "../../../../app/lib/crypto/key/publicKey"
import * as Key from "../../../../app/lib/crypto/key/key"

import * as fixtures from "./fixtures"

describe(`Bech32 lib: decode valid inputs  (${fixtures.bech32.valid.length} test vectors)`, () => {
  fixtures.bech32.valid.forEach((item, index) => {
    it(`should decode bech32 (${index + 1}, string: ${cropString(item.string, 40)})`, () => {
      const decodedStr = exchange.decode(item.string)
      expect(decodedStr.hrp).toEqual(item.hrp)
      expect(decodedStr.words).toEqual(item.words)
    })
  })
})
describe(`Bech32 lib: encode valid inputs  (${fixtures.bech32.valid.length} test vectors)`, () => {
  fixtures.bech32.valid.forEach((item, index) => {
    it(`should encode bech32 (${index + 1}, ` +
      `prefix: ${cropString(item.hrp, 10)}, hex: ${cropString(item.hex, 20)})`, () => {
      const encodedStr: string = exchange.encode({
        hrp: item.hrp,
        words: Buffer.from(item.words)
      })
      expect(encodedStr).toEqual(item.string)
    })
  })
})
describe("Bech32 lib: decode invalid inputs " +
  `(${fixtures.bech32.invalid.decode.length} test vectors)`, () => {
  fixtures.bech32.invalid.decode.forEach((item, index) => {
    it("should not decode invalid bech32" + ` (${index + 1}, exception: ${item.exception})`, () => {
      expect(() => exchange.decode(item.string)).toThrow()
    })
  })
})
describe("Bech32 lib: encode invalid inputs " +
  `(${fixtures.bech32.invalid.encode.length} test vectors)`, () => {
  fixtures.bech32.invalid.encode.forEach((item, index) => {
    it("should not encode invalid bech32" + ` (${index + 1}, exception: ${item.exception})`, () => {
      expect(() => exchange.encode({hrp: item.hrp, words: Buffer.from(item.words)})).toThrow()
    })
  })
})

describe("Slip32 key exchange: maximum data length", () => {
  it("should have a limit set to 1086 bytes", () => {
    expect(exchange.computeSlip32Limit()).toEqual(1086)
  })
})

describe(`Slip32 key exchange: import private key (${fixtures.slip32.valid.length} test vectors)`,
  () => {
    fixtures.slip32.valid.forEach((item, index) => {
      it("should import private key from slip32 " +
        `(${index + 1}, key: ${cropString(item.prv_bech32, 20, true)})`, () => {
        const importedKey = exchange.importKeyFromSlip32(item.prv_bech32)
        // Compare key path
        const keyPath = KeyPath.fromString(item.keyPath)
        expect(importedKey.keyPath).toEqual(keyPath)
        // Compare hex to imported key data
        const {key, chaincode} = getBytesFromHex(item.prv_hex)
        expect(importedKey.extendedKey.key.bytes).toEqual(key)
        expect(importedKey.extendedKey.chainCode).toEqual(chaincode)
      })
    })
  })
describe(`Slip32 key exchange: import public key (${fixtures.slip32.valid.length} test vectors)`,
  () => {
    fixtures.slip32.valid.forEach((item, index) => {
      it("should import public key from slip32 " +
        `(${index + 1}, key: ${cropString(item.pub_bech32, 20, true)})`, () => {
        const importedKey = exchange.importKeyFromSlip32(item.pub_bech32)
        // Compare key path
        const keyPath = KeyPath.fromString(item.keyPath)
        expect(importedKey.keyPath).toEqual(keyPath)
        // Compare hex to imported key data
        const {key, chaincode} = getBytesFromHex(item.pub_hex)
        expect(importedKey.extendedKey.key.bytes).toEqual(key)
        expect(importedKey.extendedKey.chainCode).toEqual(chaincode)
      })
    })
  })
describe(`Slip32 key exchange: export private key (${fixtures.slip32.valid.length} test vectors)`,
  () => {
    fixtures.slip32.valid.forEach((item, index) => {
      it("should export private key as slip32 " +
        `(${index + 1}, hex: ${cropString(item.prv_hex, 20)})`, () => {
        const keyPath = KeyPath.fromString(item.keyPath)
        const {key, chaincode} = getBytesFromHex(item.prv_hex)
        const extendedKey: Key.ExtendedKey<PrivateKey.PrivateKey> =
          PrivateKey.extend(PrivateKey.fromBytes(key), chaincode)
        const exportedKey = exchange.exportKeyToSlip32(keyPath, extendedKey)
        expect(exportedKey).toEqual(item.prv_bech32)
      })
    })
  })
describe(`Slip32 key exchange: export public key (${fixtures.slip32.valid.length} test vectors)`,
  () => {
    fixtures.slip32.valid.forEach((item, index) => {
      it("should export public key as slip32 " +
        `(${index + 1}, hex: ${cropString(item.pub_hex, 20)})`, () => {
        const keyPath = KeyPath.fromString(item.keyPath)
        const {key, chaincode} = getBytesFromHex(item.pub_hex)
        const extendedKey: Key.ExtendedKey<PublicKey.PublicKey> =
          PublicKey.extend(PublicKey.fromBytes(key), chaincode)
        const exportedKey = exchange.exportKeyToSlip32(keyPath, extendedKey)
        expect(exportedKey).toEqual(item.pub_bech32)
      })
    })
  })

/**
 * Get key and chaincode bytes from hexidecimal representation
 * @param {string} hex
 * @returns {{key: Buffer; chaincode: Buffer}}
 */
function getBytesFromHex(hex: string) {
  const buffer = Buffer.from(hex, "hex")
  const key = buffer.slice(buffer.length - 33)
  const chaincode = buffer.slice(buffer.length - 33 - 32, buffer.length - 33)

  return {key, chaincode}
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