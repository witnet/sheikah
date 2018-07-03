import { Cipher } from "./index"

/**
 * An identity async function returns a Promise that resolves to the input data.
 * @param data
 */
type IdentityAsyncFunction = {
  <T>(data: T): Promise<T>
}

/**
 * Cipher implementation for no encryption.
 * Yes, this is just a dummy pass through that safely works over any type.
 */
export class PlainCipher<T> implements Cipher<T, T> {

  /**
   * Dummy encrypt method that returns a promise that resolves to the input data.
   * @param data
   */
  public encrypt: IdentityAsyncFunction = async (data) => data

  /**
   * Dummy decrypt method that returns a promise that resolves to the input data.
   * @param data
   */
  public decrypt: IdentityAsyncFunction = async (data) => data
}