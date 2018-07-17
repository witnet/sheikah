import {Config} from "app/common/config"
import {Lifecycle} from "app/main/lifecycle"
import {JsonAesLevelStorage} from "app/main/subsystems/jsonAesLevel"

/**
 * This is a wrapper for JsonAESLevelStorage that provides the replace and close methods.
 * It is intended to be used as a singleton inside the WalletStorageSubsystem
 */
export class WalletStorage {
  /** The JsonAesLevelStorage */
  private storage: JsonAesLevelStorage | undefined = undefined

  /**
   * Replace the storage of the wallet and closes the previous storage.
   * @param {JsonAesLevelStorage} storage
   * @returns {Promise<void>}
   */
  public async replace(storage: JsonAesLevelStorage): Promise<void> {
    await this.close()
    this.storage = storage
  }

  /**
   * Closes the wallet storage and cleans after itself.
   * @returns {Promise<void>}
   */
  public async close(): Promise<void> {
    if (this.storage !== undefined) {
      await this.storage.close()
      this.storage = undefined
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
  private item: WalletStorage = new WalletStorage()

  /**
   * Lifecycle start function.
   * It simply returns the internal WalletStorage.
   */
  public async start(): Promise<WalletStorage> {
    return this.item
  }

  /**
   * Lifecycle stop function.
   * It closes the wallet storage.
   */
  public async stop() {
    return this.item.close()
  }

}