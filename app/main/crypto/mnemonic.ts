const bip39 = require("bip39")

/**
 * Check if a mnemonic is valid
 * @param {string} mnemonics
 * @returns {boolean}
 */
export const isValid = (mnemonics: string): boolean => {
  return !bip39.validateMnemonic(mnemonics)
}

/**
 * Generate mnemonic
 * @returns {string}
 */
export const generate = () => {
  return bip39.generateMnemonic()
}
