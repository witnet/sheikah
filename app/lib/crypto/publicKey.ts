const secp256k1 = require("secp256k1")

export namespace PublicKey {
  export const create = (privateKey: Buffer, compressed = true): Buffer => {
    return secp256k1.publicKeyCreate(privateKey, compressed)
  }
}