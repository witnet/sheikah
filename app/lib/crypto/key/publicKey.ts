import {publicKeyCreate} from "secp256k1"
import {PrivateKey} from "./privateKey"
import {ChainCode, ExtendedKey, getExtendedKey as extendedKey, Key} from "./key"

export interface PublicKey extends Key {
  type: "public"
}

export const create =
  (privateKey: ExtendedKey<PrivateKey>, compressed = true): ExtendedKey<PublicKey> => {
    const bytes: Buffer = publicKeyCreate(privateKey.key.bytes, compressed)

    return {
      key: {type: "public", bytes},
      chainCode: privateKey.chainCode
    }
  }

export const getExtendedKey = (bytes: Buffer, chainCode: ChainCode): ExtendedKey<PublicKey> => {
  return extendedKey(bytes, chainCode, "public")
}
