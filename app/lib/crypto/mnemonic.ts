const bip39 = require("bip39")

export namespace Mnemonic {
  export const validate = (mnemonics: string): boolean => {
    return !bip39.validateMnemonic(mnemonics)
  }
  export const generate = () => {
    return bip39.generateMnemonic()
  }
}
