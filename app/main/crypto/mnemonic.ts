import * as bip39 from "bip39"

/**
 * Check if a mnemonic is valid
 * @param {string} mnemonics
 * @returns {boolean}
 */
export function isValid(mnemonics: string): boolean {
  return bip39.validateMnemonic(mnemonics)
}

/**
 * Generate mnemonic
 * @returns {string}
 */
export function generate() {
  return bip39.generateMnemonic()
}
