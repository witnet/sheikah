import { sha256 } from "../crypto/hash"
import { Hasher } from "./index"

export type Sha256Hasher = Hasher<string, Buffer>

export const sha256Hasher: Sha256Hasher = async (input) => {
  return sha256(Buffer.from(input))
}