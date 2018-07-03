import { Config } from "app/common/config"
import { Lifecycle } from "app/main/lifecycle"
import { JsonAesLevelStorage } from "app/main/subsystems/jsonAesLevel"

type WalletStorage = JsonAesLevelStorage

export type WalletStorageCollection = { [name: string]: WalletStorage }

/**
 * This is a very simple subsystem containing a collection of WalletStorage objects that can be
 * easily accessed by name.
 */
export class WalletStorageCollectionSubSystem
  implements Lifecycle<WalletStorageCollection, Partial<Config>> {

  /**
   * This is the actual collection where references to the WalletStorage objects are stored.
   * @type WalletStorageCollection
   */
  private items: WalletStorageCollection = {}

  /**
   * Lifecycle start function.
   * It simply returns a reference to the internal WalletStorage collection.
   */
  public async start(): Promise<WalletStorageCollection> {
    return this.items
  }

  /**
   * Lifecycle stop function.
   * It closes all referenced WalletStorages and cleans after itself.
   */
  public async stop() {
    const promises = Object.values(this.items)
      .map(async (storage: WalletStorage) => storage.close())
    await Promise.all(promises)
    this.items = {}

    return
  }

}