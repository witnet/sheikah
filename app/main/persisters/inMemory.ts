import Persister from "./index"

/**
 * InMemoryBackend implements a mocked in-memory StorageBackend.
 */
export default class InMemoryPersister implements Persister<Buffer> {

  constructor(private memory: { [key: string]: Buffer } = {}) { }

  /**
   * Mocked database closing method implementation.
   * @returns {Promise<void>}
   */
  public close = async (): Promise<void> => {
    await Promise.resolve()
  }

  /**
   * Get value by key.
   * @param {Buffer} key
   * @returns {Promise<Buffer>}
   */
  public get = async (key: Buffer): Promise<Buffer> => {
    return Promise.resolve(this.memory[key.toString("utf8")])
  }

  /**
   * Put a value under a certain key.
   * @param {Buffer} key
   * @param {Buffer} value
   * @returns {Promise<boolean>}
   */
  public put = async (key: Buffer, value: Buffer): Promise<void> => {
    this.memory[key.toString("utf8")] = value

    return Promise.resolve()
  }

}