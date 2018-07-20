export interface Lifecycle<T, C> {
  start(config?: C): Promise<T>
  stop(): Promise<void>
}

/**
 * Helper function for creating subsystems. A subsystem is just an object that implements the
 * lifecycle protocol. A pure subsystem is just a subsystem that do not need to do any real
 * initialization/teardown when starting/stopping.
 *
 * @param {(config: C) => T} getValue A function that given an optional config object returns the
 * value of the subsystem.
 * @returns {Lifecycle<T, C>} The subsystem object.
 */
export function pureSubsystem<T, C>(getValue: (config?: C) => T): Lifecycle<T, C> {
  return {
    async start(config?: C) {
      return getValue(config)
    },
    stop: dummyStop
  }
}

/**
 * A dummy stopper for use in lightweight lifecycle implementations.
 */
export async function dummyStop(): Promise<void> {
  return
}