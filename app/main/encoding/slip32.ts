import * as Slip32 from "slip32"

import { ExtendedKey } from "../crypto/key/key"
import { KeyPath } from "../crypto/keyPath"
import { PrivateKey } from "../crypto/key/privateKey"
import { PublicKey } from "../crypto/key/publicKey"

/**
 * Export key to slip32 format
 * @param {KeyPath} keyPath
 * @param {ExtendedKey<PrivateKey | PublicKey>} extendedKey
 * @returns {string}
 */
export const exportKeyToSlip32 =
  (keyPath: KeyPath, extendedKey: ExtendedKey<PrivateKey | PublicKey>): string => {
    return Slip32.exportKeyToSlip32(keyPath, extendedKey)
  }

/**
 * Import key from slip32 format
 * @param {string} slip32
 * @returns {{keyPath: KeyPath; extendedKey: ExtendedKey<PrivateKey | PublicKey>}}
 */
export const importKeyFromSlip32 =
  (slip32: string): { keyPath: KeyPath, extendedKey: ExtendedKey<PrivateKey | PublicKey> } => {
    const { keyPath: keyPath, extendedKey: _extendedKey } = Slip32.importKeyFromSlip32(slip32)
    const key = { ..._extendedKey.key, bytes: Buffer.from(_extendedKey.key.bytes) }
    const extendedKey = { key, chainCode: Buffer.from(_extendedKey.chainCode) }

    return { keyPath, extendedKey }
  }