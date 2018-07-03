import { sha256 } from "../crypto/hash"
import { Hasher } from "./index"

export type Sha256BufferHasher = Hasher<string, Buffer>

export const sha256BufferHasher: Sha256BufferHasher = async (input): Promise<Buffer> => {
  return sha256(Buffer.from(input))
}