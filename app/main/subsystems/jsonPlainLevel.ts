import { Config } from "app/common/config"
import log from "app/common/logging"
import { JsonSerializable, JsonSerializableObject } from "app/common/serializers"
import { Cipher } from "app/main/ciphers"
import { PlainCipher } from "app/main/ciphers/plain"
import { sha256BufferHasher } from "app/main/hashers/sha256Buffer"
import { Lifecycle } from "app/main/lifecycle"
import { LevelPersister } from "app/main/persisters/level"
import { jsonBufferSerializer } from "app/main/serializers/jsonBuffer"
import { Storage } from "app/main/storage"
import * as level from "level"
import { homedir } from "os"
import * as path from "path"
import { ensurePath } from "app/main/storage/utils"

export type JsonPlainLevelStorage = Storage<Buffer, JsonSerializable, Buffer, Buffer>

/**
 * JsonPlainLevel implements the Lifecycle of a Storage with:
 *  - SHA as key hashing function
 *  - JSON as serializer
 *  - Plain cipher (no ciphering at all)
 *  - LevelDB storage backend as persister
 */
export class JsonPlainLevelSubSystem implements Lifecycle<JsonPlainLevelStorage, Config> {
  /**
   * The storage object itself.
   * It exposes the Storage API (get, put, close).
   */
  private storage: JsonPlainLevelStorage | undefined

  /**
   * The name of the storage (used to compute the filesystem path where data will be written to).
   */
  private name: string

  /**
   * An object containing keys and values to assign if they are not yet in the storage.
   */
  private initializer: JsonSerializableObject

  public constructor(name: string, initializer = {}) {
    this.name = name
    this.initializer = initializer
  }

  /**
   * Start the Storage lifecycle.
   * @param config
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async start(config?: Partial<Config>) {
    log.debug(`Starting "${this.name}" storage subsystem...`)

    // Compose the absolute path of the LevelDB directory
    const dbPath = path.normalize(`${homedir()}/.sheikah/storage/${this.name}`)

    // Ensure the path exists
    await ensurePath(dbPath)

    // Create the LevelDB connection
    const connection = level(dbPath, {
      keyEncoding: "binary",
      valueEncoding: "binary",
    })

    const keyHasher = sha256BufferHasher
    const serializer = jsonBufferSerializer
    const cipher: Cipher<Buffer, Buffer> = new PlainCipher()
    const backend = new LevelPersister(connection)

    const storage = new Storage(keyHasher, serializer, cipher, backend)

    // Storage initialization.
    // This will get the current values of the keys, check if they exist and set the initial value
    // for those who don't.
    await Promise.all(Object.keys(this.initializer)
      .map(async (key) => {
        return storage.get(key)
          .catch(() => undefined)
          .then(async (val) => {
            return val
              ? Promise.resolve()
              : storage.put(key, this.initializer[key])
          })
      })
    )

    this.storage = storage
    log.debug(`"${this.name}" storage subsystem started`)

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
