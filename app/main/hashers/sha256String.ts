import { sha256BufferHasher } from "app/main/hashers/sha256Buffer"
import { Hasher } from "./index"

export type Sha256StringHasher = Hasher<string, string>

export const sha256StringHasher: Sha256StringHasher = async (input): Promise<string> => {
  const buf = await sha256BufferHasher(input)

  return buf.toString("hex")
}
