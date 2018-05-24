import {Mnemonic} from "./mnemonic"
import {Hash} from "./hash"
const bip39 = require("bip39")

export type Seed = {
<<<<<<< Updated upstream
  masterSecret: Buffer,
  chainCode: number
=======
  masterSecret: Buffer
  chainCode: Buffer
>>>>>>> Stashed changes
}

export namespace Seed {
   export const deriveSeedFromMnemonics = (mnemonics: string): Seed => {
     if (Mnemonic.validate(mnemonics)) {
       throw new Error("Invalid mnemonic")
     }
     const buf = bip39.mnemonicToSeed(mnemonics)
     const hash =  Hash.sha512hmac(buf, Buffer.from("Witnet seed"))

     return {
       masterSecret: hash.slice(0, 32),
       chainCode:  hash.readInt32BE(32)
     }
   }
}
