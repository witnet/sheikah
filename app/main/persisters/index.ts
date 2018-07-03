/**
 * This interface abstracts away the underlying database backend from the storage logic, and serves
 * as a common API for all possible storage backends.
 */
export interface Persister<A, B> {
  put: (key: A, value: B) => Promise<void>
  get: (key: A) => Promise<B>
  close: () => Promise<void>
}