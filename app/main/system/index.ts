import { Config } from "app/common/config"
import log from "app/common/logging"
import { Lifecycle } from "./lifecycle"
import * as serializers from "./serializers"

export type JsonC = { json: serializers.Serializer }

/**
 * A component is any object implementing the Lifecycle interface.
 */
export type Components = JsonC

/**
 * Application wide system that contains all components in Components.
 * A system is just stateful object that supports Lifecycle protocol (it can be started and stopped)
 * and returns a map of components that can be used as a global repository of services needed by
 * other parts of the application. Any part of the application can explicitly ask for a set of
 * components needs instead of requiring the entire system.
 */
export const appSystem: Lifecycle<Components, Partial<Config>> = {
  async start(config?: Partial<Config>) {
    log.info("Starting system...")
    const [json] = await Promise.all([
      serializers.json.start()
    ])
    log.info("System started")

    return { json }
  },

  async stop() {
    log.info("Stopping system...")
    await Promise.all([
      serializers.json.stop()
    ])
    log.info("System stopped")
  }
}
