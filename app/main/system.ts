import { Config } from "app/common/config"
import log from "app/common/logging"
import * as serializers from "app/common/serializers"
import { Lifecycle } from "app/main/lifecycle"
import * as components from "app/main/components"

export type Json = { json: serializers.Json }

/**
 * A type representing all the values returned when the system starts.
 */
export type Values = Json

/**
 * Application wide system that starts all its components when started.
 * A system is just stateful object that supports Lifecycle protocol (it can be started and stopped)
 * and returns a map of type `Values` that can be used as a global repository of services needed by
 * other parts of the application. Any part of the application can explicitly ask for all the
 * `Values` or just a subset of it, e.g.: `Json & Db`.
 */
export const appSystem: Lifecycle<Values, Partial<Config>> = {
  async start(config?: Partial<Config>) {
    log.info("Starting system...")
    const [json] = await Promise.all([
      components.json.start()
    ])
    log.info("System started")

    return { json }
  },

  async stop() {
    log.info("Stopping system...")
    await Promise.all([
      components.json.stop()
    ])
    log.info("System stopped")
  }
}
