import log from "app/common/logging"
import { JsonSerializable } from "app/common/serializers"
import { AesCipher, AesCipherSettings, defaultAesCipherSettings } from "app/main/ciphers/aes"
import { sha256BufferHasher } from "app/main/hashers/sha256Buffer"
import { Lifecycle } from "app/main/lifecycle"
import { LevelPersister } from "app/main/persisters/level"
import { jsonBufferSerializer } from "app/main/serializers/jsonBuffer"
import { Storage } from "app/main/storage"
import { ensurePath } from "app/main/storage/utils"
import * as level from "level"
import { homedir } from "os"
import * as path from "path"

interface Config {
  name: string,
  password: string,
}

export type JsonAesLevelStorage = Storage<Buffer, JsonSerializable, Buffer, Buffer>

/**
 * JsonAesLevel implements the Lifecycle of a Storage with:
 *  - SHA as key hashing function
 *  - JSON as serializer
 *  - AES cipher in CBC operation mode
 *  - LevelDB storage backend as persister
 */
export class JsonAesLevelSubSystem implements Lifecycle<JsonAesLevelStorage, Config> {
  /**
   * Name of the storage.
   * This is used when constructing the filesystem path where the data will be written to.
   */
  private name: string | undefined

  /**
   * The storage object itself.
   * It exposes the Storage API (get, put, close).
   */
  private storage: JsonAesLevelStorage | undefined

  /**
   * Start the Storage lifecycle.
   * @param config
   */
  public async start(config: Config) {
    this.name = config.name

    log.debug(`Starting "${this.name}" encrypted storage subsystem...`)

    // Compose the absolute path of the LevelDB directory
    const dbPath = path.normalize(`${homedir()}/.sheikah/storage/${this.name}`)

    // Ensure the path exists
    await ensurePath(dbPath)

    // Create the LevelDB connection
    const connection = level(dbPath, {
      keyEncoding: "binary",
      valueEncoding: "binary",
    })

    const aesSettings: AesCipherSettings = {
      ...defaultAesCipherSettings,
      pbkdPassword: config.password,
    }

    const keyHasher = sha256BufferHasher
    const serializer = jsonBufferSerializer
    const cipher = new AesCipher(aesSettings)
    const backend = new LevelPersister(connection)

    this.storage = new Storage(keyHasher, serializer, cipher, backend)
    log.debug(`"${this.name}" encrypted storage subsystem started`)

    return this.storage
  }

  /**
   * Stop the Storage lifecycle.
   */
  public async stop() {
    if (this.storage !== undefined) {
      await this.storage.close()
    }
  }
}
