import { Persister } from "./index"

/**
 * InMemoryBackend implements a mocked in-memory StorageBackend.
 */
export class InMemoryPersister implements Persister<string, Buffer> {

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
  public get = async (key: string): Promise<Buffer> => {
    return Promise.resolve(this.memory[key])
  }

  /**
   * Put a value under a certain key.
   * @param {Buffer} key
   * @param {Buffer} value
   * @returns {Promise<boolean>}
   */
  public put = async (key: string, value: Buffer): Promise<void> => {
    this.memory[key] = value

    return Promise.resolve()
  }

}