/**
 * This interface abstract away the underlying database backend from the vault
 * logic.
 */
export default interface IStorageBackend {

  put(key: Buffer, value: Buffer): Promise<void>

  get(key: Buffer): Promise<Buffer>

  close(): Promise<void>

}