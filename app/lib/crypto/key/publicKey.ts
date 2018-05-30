import {publicKeyCreate} from "secp256k1"
import {PrivateKey} from "./privateKey"
import {ChainCode, ExtendedKey, getExtendedKey as getKey, Key} from "./key"

export interface PublicKey extends Key {
  type: "public"
}

export const create = (privateKey: PrivateKey, compressed = true): ExtendedKey<PublicKey> => {
  const bytes = publicKeyCreate(privateKey.bytes, compressed)

  return {
    key: {type: "public", bytes: bytes.slice(0, 32)},
    chainCode: bytes.slice(32, 64)
  }
}

export const getExtendedKey = (bytes: Buffer, chainCode: ChainCode): ExtendedKey<PublicKey> => {
  return getKey(bytes, chainCode, "public")
}