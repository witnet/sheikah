import * as level from "level"
import { homedir } from "os"
import * as path from "path"
import Storage from "."
import log from "app/common/logging"
import { JsonSerializable } from "app/common/serializers"
import Cipher from "app/main/ciphers"
import { PlainCipher } from "app/main/ciphers/plain"
import { sha256BufferHasher } from "app/main/hashers/sha256Buffer"
import { Lifecycle } from "app/main/lifecycle"
import { LevelPersister } from "app/main/persisters/level"
import { jsonBufferSerializer } from "app/main/serializers/jsonBuffer"
import { ensurePath } from "./utils"

type Config = {
  name: string
}

export type JsonPlainLevelStorage = Storage<Buffer, JsonSerializable, Buffer, Buffer>

/**
 * JsonPlainLevel implements the Lifecycle of a Storage with:
 *  - SHA as key hashing function
 *  - JSON as serializer
 *  - Plain cipher (no ciphering at all)
 *  - LevelDB storage backend as persister
 */
export class JsonPlainLevel implements Lifecycle<JsonPlainLevelStorage, Config> {

  /**
   * Name of the storage.
   * This is used when constructing the filesystem path where the data will be written to.
   */
  private name: string

  /**
   * The storage object itself.
   * It exposes the Storage API (get, put, close).
   */
  private storage: JsonPlainLevelStorage

  /**
   * Start the Storage lifecycle.
   * @param config
   */
  public async start(config: Config) {
    this.name = config.name

    log.debug(`Starting "${this.name}" storage subsystem...`)

    // Compose the absolute path of the LevelDB directory
    const dbPath = path.normalize(`${homedir()}/.sheikah/storage/${this.name}`)

    // Ensure the path exists
    await ensurePath(dbPath)

    // Create the LevelDB connection
    const connection = level(dbPath, {
      keyEncoding: "binary",
      valueEncoding: "binary"
    })

    const keyHasher = sha256BufferHasher
    const serializer = jsonBufferSerializer
    const cipher: Cipher<Buffer, Buffer> = new PlainCipher()
    const backend = new LevelPersister(connection)

    this.storage = new Storage(keyHasher, serializer, cipher, backend)
    log.debug(`"${this.name}" storage subsystem started`)

    return this.storage
  }

  /**
   * Stop the Storage lifecycle.
   */
  public async stop() {
    await this.storage.close()

    return
  }

}