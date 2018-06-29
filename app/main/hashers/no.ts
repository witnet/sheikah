/**
 * Hasher implementation that performs no actual hashing on input data.
 * Yes, this is just a dummy pass through that safely works over any type.
 * @param data
 */
export async function noHasher<T>(data: T): Promise<T> {
  return data
}