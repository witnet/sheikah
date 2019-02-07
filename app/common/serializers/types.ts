/**
 * Serializers must comply with this type.
 */
export interface Serializer<A, B> {
  serialize: (value: A) => Promise<B>,
  deserialize: (serialized: B) => Promise<A>,
}
