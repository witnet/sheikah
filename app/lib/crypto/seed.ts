import {Mnemonic} from "./mnemonic"
const bip39 = require("bip39")

export type Seed = Buffer

export namespace Seed {
   export const deriveSeedFromMnemonics = (mnemonics: string) => {
     if (Mnemonic.validate(mnemonics)) {
       throw new Error("Invalid mnemonic")
     }

     return bip39.mnemonicToSeed(mnemonics)
   }
}
