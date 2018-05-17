const bip39 = require("bip39")

/**
 * Seed
 */
export class Seed {
  /** mnemonics */
  private mnemonics: String
  /** seed */
  private seed: Buffer
  public constructor(mnemonics?: String) {
    if (mnemonics) {
      if (!bip39.validateMnemonic(mnemonics)) {
        throw new Error("Invalid mnemonic")
      }
      this.mnemonics = mnemonics
    } else {
      this.mnemonics = bip39.generateMnemonic()
    }
    // compute only once during instantiation
    this.seed = bip39.mnemonicToSeed(this.mnemonics)
  }
  /** get the mnemonic  */
  public getMnemonics(): String {
    return this.mnemonics
  }

  /** get the seed of the mnemonic */
  public getSeedBuffer(): Buffer {
    return this.seed
  }
}
