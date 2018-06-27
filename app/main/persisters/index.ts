/**
 * This interface abstract away the underlying database backend from the vault logic.
 */
export default interface Persister<A> {

  put(key: Buffer, value: A): Promise<void>

  get(key: Buffer): Promise<A>

  close(): Promise<void>

}