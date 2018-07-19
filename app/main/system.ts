import { Config } from "app/common/config"
import log from "app/common/logging"
import { JsonSerializer } from "app/common/serializers"
import { AppStateManager } from "app/main/appState"
import { appStorageInitializer } from "app/main/storage/initializers"
import { AppStateSubSystem } from "app/main/subsystems/appState"
import {
  WalletStorageCollection, WalletStorageCollectionSubSystem
} from "app/main/subsystems/wallets"
import { Lifecycle } from "./lifecycle"
import { jsonSubSystem } from "./subsystems/json"
import { JsonPlainLevelStorage, JsonPlainLevelSubSystem } from "./subsystems/jsonPlainLevel"

/**
 * Individual sub-systems that composed together form `SubSystems`.
 * This is intended to let handlers depend on specific sub-systems and not on the
 * too-big `SubSystems` type.
 */
export type JsonS = { json: JsonSerializer }
export type AppStorageS = { appStorage: JsonPlainLevelStorage }
export type WalletStorageS = { walletStorage: WalletStorageCollection }
export type AppStateS = { appStateManager: AppStateManager }

/**
 * Type of the system object returned by system.start()
 */
export type SubSystems =
  JsonS & AppStorageS & WalletStorageS & AppStateS

/**
 * Type of the "builders" object defined down below
 */
export type Builders = {
  [K in keyof SubSystems]: Lifecycle<SubSystems[K], Partial<Config>>
}

/**
 * Object containing all the subsystems that we want to start along the appSystem itself.
 * @type Builders
 */
const builders: Builders = {
  json: jsonSubSystem,
  appStorage: new JsonPlainLevelSubSystem("appStorage", appStorageInitializer),
  walletStorage: new WalletStorageCollectionSubSystem(),
  appStateManager: new AppStateSubSystem()
}

log.debug(`builders: ${JSON.stringify(builders)}`)

/**
 * Application wide system that starts all its components when started.
 * A system is just stateful object that supports Lifecycle protocol (it can be started and stopped)
 * and returns a map of type `SubSystems` that can be used as a global repository of services needed
 * by other parts of the application. Any part of the application can explicitly ask for all the
 * `SubSystems` or just a subset of it, e.g.: `json & appStorage`.
 */
export class System implements Lifecycle<SubSystems, Partial<Config>> {

  /**
   * Flag indicating whether the system has been started or not
   * @type {boolean}
   */
  public started = false

  /**
   * Object containing all the started subsystems.
   */
  public subSystems: SubSystems

  /**
   * System start function.
   * It starts the system and all its subsystems.
   * @param config
   */
  public async start(config?: Partial<Config>) {
    if (this.started) {
      log.error("System already started!")
    } else {
      log.info("Starting system...")

      const promises: Array<Promise<SubSystems[keyof SubSystems]>> = Object.entries(builders)
        .map(async ([name, cycle]) => {
          log.info(`\tStarting subsystem "${name}"...`)

          return cycle.start(config)
        })

      const values = await Promise.all(promises)
      this.subSystems = Object.keys(builders)
        .reduce((acc, name, index) => {
          return { ...acc, [name]: values[index] }
        }, {} as SubSystems)

      this.started = true
      log.info("System started")
    }

    return this.subSystems
  }

  /**
   * System stopper function.
   * It stops the system and all its subsystems.
   */
  public async stop() {
    if (this.started) {
      log.info("Stopping system...")

      const promises: Array<Promise<void>> = Object.entries(builders)
        .map(async ([name, cycle]) => {
          log.info(`\tStopping subsystem "${name}"...`)

          return cycle.stop()
        })

      await Promise.all(promises)
      this.subSystems = {} as SubSystems
      log.info("System stopped")
    } else {
      log.error("System already stopped!")
    }
  }

}

export const appSystem = new System()
