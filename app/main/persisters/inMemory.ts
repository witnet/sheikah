import { Persister } from "./index"

/**
 * InMemoryBackend implements a mocked in-memory StorageBackend.
 */
export class InMemoryPersister implements Persister<Buffer, Buffer> {
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
    return Promise.resolve(this.memory[key.toString()])
  }

  /**
   * Put a value under a certain ke.
   * @param {Buffer} key
   * @param {Buffer} value
   * @returns {Promise<boolean>}
   */
  public put = async (key: Buffer, value: Buffer): Promise<void> => {
    this.memory[key.toString()] = value

    return Promise.resolve()
  }
}
