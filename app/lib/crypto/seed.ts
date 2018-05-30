import * as Mnemonic from "./mnemonic"
import * as Hash from "./hash"
import * as assert from "assert"

const bip39 = require("bip39")

export type Seed = {
  masterSecret: Buffer
  chainCode: Buffer
}

export const deriveSeedFromMnemonics = (mnemonics: string): Seed => {
  if (Mnemonic.validate(mnemonics)) {
    throw new Error("Invalid mnemonic")
  }
  const entropy = bip39.mnemonicToSeed(mnemonics)

  return deriveSeedFromEntropy(entropy)
}

export const deriveSeedFromEntropy = (entropy: Buffer, hmacKey = "Witnet seed"): Seed => {
  assert(entropy.length >= 16 && entropy.length <= 64)
  const hash = Hash.sha512hmac(Buffer.from(hmacKey), entropy)

  return {
    masterSecret: hash.slice(0, 32),
    chainCode: hash.slice(32, 64)
  }
}
