const bip39 = require("bip39")

/**
 * Validate mnemonic
 * @param {string} mnemonics
 * @returns {boolean}
 */
export const validate = (mnemonics: string): boolean => {
  return !bip39.validateMnemonic(mnemonics)
}

/**
 * Generate mnemonic
 * @returns {string}
 */
export const generate = () => {
  return bip39.generateMnemonic()
}
