import { JsonSerializable } from "app/common/serializers/json"
// import { JsonAesLevelStorage } from "./jsonAesLevel"
import { Storage } from "app/main/storage"
import { Config } from "app/common/config"
import { Lifecycle } from "app/main/lifecycle"

type StorageType = Storage<Buffer, JsonSerializable, Buffer, Buffer>

/**
 * This is a wrapper for JsonAESLevelStorage that provides the replace and close methods.
 * It is intended to be used as a singleton inside the WalletStorageSubsystem
 */
export class WalletStorage {

  /** The JsonAesLevelStorage */
  private storageRef: StorageType | undefined = undefined

  /**
   * Get storage
   */
  public get storage() {
    return this.storageRef
  }

  /**
   * Replace the storage of the wallet and closes the previous storage.
   * @param {JsonAesLevelStorage} storage
   * @returns {Promise<void>}
   */
  public async replace(storage: StorageType): Promise<void> {
    await this.close()
    this.storageRef = storage
  }

  /**
   * Replace the storage of the wallet with the storage returned by `storageFactory`.
   * Before creating the new storage the previous one is closed.
   * @param {() => Promise<JsonAesLevelStorage>} storageFactory Function returning the new storage
   * @returns {Promise<JsonAesLevelStorage>} The newly created storage
   */
  public async replaceWith(storageFactory: () => Promise<StorageType>): Promise<StorageType> {
    await this.close()
    const storage = await storageFactory()
    this.storageRef = storage

    return storage
  }

  /**
   * Closes the wallet storage and cleans after itself.
   * @returns {Promise<void>}
   */
  public async close(): Promise<void> {
    if (this.storage !== undefined) {
      await this.storage.close()
      this.storageRef = undefined
    }
  }
}

/**
 * This is a very simple subsystem containing a WalletStorage object.
 */
export class WalletStorageSubSystem
  implements Lifecycle<WalletStorage, Partial<Config>> {

  /**
   * The actual Wallet storage.
   * @type WalletStorage
   */
  private walletStorage: WalletStorage = new WalletStorage()

  /**
   * Lifecycle start function.
   * It simply returns the internal WalletStorage.
   */
  public async start(): Promise<WalletStorage> {
    return this.walletStorage
  }

  /**
   * Lifecycle stop function.
   * It closes the wallet storage.
   */
  public async stop() {
    return this.walletStorage.close()
  }

}
