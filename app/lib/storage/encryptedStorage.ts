import * as hydra from "hydration"
import * as Encryption from "./encryption"
import IStorageBackend from "./storageBackend"

/**
 * A transparently encrypted database.
 */
export default class EncryptedStorage {
  /** Vault name */
  public name: string
  /** Database backend */
  protected databaseBackend: IStorageBackend
  /** Encryption settings structure */
  protected encryptionSettings: Encryption.Settings

  /**
   * EncryptedStorage
   * @param {IStorageBackend} databaseBackend
   * @param {Settings} encryptionSettings
   */
  constructor(
    databaseBackend: IStorageBackend,
    encryptionSettings: Encryption.Settings
  ) {

    // Set the underlying database.
    this.databaseBackend = databaseBackend
    // Set the encryption options.
    this.encryptionSettings = encryptionSettings
  }

  /**
   * Create or overwrite a value entry for a certain key.
   * @param {string} key
   * @param value
   * @returns {Promise<boolean>}
   */
  public async put(key: string, value: any): Promise<void> {
    // Keys are hashed for privacy and to allow arbitrary key size
    const hashedKey = Encryption.hash(key)
    // Dehydrate/deflate and serialize the object to convert it into a typed
    // JSON that can be rehydrated/inflated afterwards without losing types.
    const dehydratedValue = hydra.dehydrate(value)
    const jsonValue = Buffer.from(JSON.stringify(dehydratedValue))
    // Encrypt the serialized object.
    const encryptedValue =
      Encryption.encrypt(jsonValue, this.encryptionSettings)
    // Put the value into the storage and wait for write to complete.
    await this.databaseBackend.put(hashedKey, encryptedValue)
  }

  /**
   * Get the value associated with a certain key.
   * @param {string} key
   * @returns {Promise<any>}
   */
  public async get(key: string): Promise<any> {
    // Hash the key for privacy and to allow arbitrary key size.
    const hashedKey = Encryption.hash(key)
    // Retrieve the encrypted value.
    const encryptedValue = await this.databaseBackend.get(hashedKey)
    // Decrypt the encrypted value from the database.
    const jsonBuffer =
      Encryption.decrypt(encryptedValue, this.encryptionSettings)
    // Parse the JSON from a Buffer and hydrate/inflate the decrypted value t
    // recover the original object with types and everything.
    const dehydratedValue = JSON.parse(jsonBuffer.toString())

    return hydra.hydrate(dehydratedValue)
  }

  /**
   * Close the vault, the database backend and the underlying storage, freeing
   *  up any locks and file descriptors.
   * @returns {Promise<any>}
   */
  public async close(): Promise<void> {
    await this.databaseBackend.close()
  }

}