import {publicKeyCreate} from "secp256k1"

export type PublicKey = Buffer

export const create = (privateKey: Buffer, compressed = true): PublicKey => {
  return publicKeyCreate(privateKey, compressed)
}
