export type Lifecycle<T, C> = {
  start(config?: Partial<C>): Promise<T>
  stop(): Promise<void>
}

/**
 * Helper function for creating components (lifecycled objects) that don't do any real
 * initialization when starting, or teardown when stopping.
 *
 * @param {(config: C) => T} getValue A function that given an optional config object
 * returns the value of the component.
 * @returns {Lifecycle<T, C>} The component object.
 */
export function pureComponent<T, C>(getValue: (config?: C) => T): Lifecycle<T, C> {
  return {
    async start(config?: C) {
      return getValue(config)
    },
    async stop() {
      return
    }
  }
}
