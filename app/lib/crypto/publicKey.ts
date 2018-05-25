const secp256k1 = require("secp256k1")

export type PublicKey = Buffer

export const create = (privateKey: Buffer, compressed = true): PublicKey => {
  return secp256k1.publicKeyCreate(privateKey, compressed)
}
