import * as level from "level"
import { homedir } from "os"
import * as path from "path"

import { AesCipher, AesCipherSettings, defaultAesCipherSettings } from "app/main/ciphers/aes"
import { sha256BufferHasher } from "app/main/hashers/sha256Buffer"
import { LevelPersister } from "app/main/persisters/level"
import { jsonBufferSerializer } from "app/main/serializers/jsonBuffer"
import { Storage } from "app/main/storage"
import { ensurePath } from "app/main/storage/utils"

const createAesSettings = (pbkdPassword: string): AesCipherSettings => ({
  ...defaultAesCipherSettings,
  pbkdPassword
})

/**
 * Function that creates aes level storage
 *
 * @export
 * @param {string} id
 * @returns Promise<Storage<Buffer, JsonSerializable, Buffer, Buffer>>
 */
export async function createAesLevelStorage(id: string, password: string) {
  const keyHasher = sha256BufferHasher
  const serializer = jsonBufferSerializer
  const cipher = new AesCipher(createAesSettings(password))
  const dbPath = path.normalize(`${homedir()}/.sheikah/storage/${id}`)

  // Ensure the path exists
  await ensurePath(dbPath)

  // Create the LevelDB connection
  const connection = level(dbPath, {
    keyEncoding: "binary",
    valueEncoding: "binary"
  })

  const backend = new LevelPersister(connection)

  return new Storage(keyHasher, serializer, cipher, backend)
}

export default createAesLevelStorage