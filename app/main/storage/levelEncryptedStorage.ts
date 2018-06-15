import EncryptedStorage from "./encryptedStorage"
import * as Encryption from "./encryption"
import * as path from "path"
import { homedir } from "os"
import LevelBackend from "./levelBackend"
import * as level from "level"

const levelEncryptedStorageFactory = async (
  name: string,
  encryptionSettings: Encryption.Settings
): Promise<EncryptedStorage> => {

  // Compose the absolute path of the LevelDB directory
  const dbPath = path.normalize(`${homedir()}/.sheikah/vault/${name}`)

  // Create the LevelDB connection
  const connection = level(dbPath, {
    keyEncoding: "binary",
    valueEncoding: "binary"
  })

  const database = new LevelBackend(connection)

  return new EncryptedStorage(database, encryptionSettings)
}

export { levelEncryptedStorageFactory }