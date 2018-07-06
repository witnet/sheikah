import { LevelUp } from "levelup"
import Persister from "./index"

/**
 * LevelBackend implements the IStorageBackend for LevelDB.
 */
export default class LevelPersister implements Persister<Buffer> {

  /**
   * The LevelBackend constructor takes a reference to a LevelUp backend.
   * @param {levelup.LevelUp} connection
   */
  constructor(private connection: LevelUp) { }

  /**
   * Database closing method implementation for LevelDB.
   * @returns {Promise<void>}
   */
  public async close(): Promise<void> {
    this.connection.close()
  }

  /**
   * Get value by key.
   * @param {Buffer} key
   * @returns {Promise<Buffer>}
   */
  public async get(key: Buffer): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      this.connection.get(key, (error, value) => {
        if (error) {
          reject(error)
        } else {
          resolve(value)
        }
      })
    })
  }

  /**
   * Put a value under a certain key.
   * @param {Buffer} key
   * @param {Buffer} value
   * @returns {Promise<boolean>}
   */
  public async put(key: Buffer, value: Buffer): Promise<void> {
    this.connection.put(key, value)
  }

}