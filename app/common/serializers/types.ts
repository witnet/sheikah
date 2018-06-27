/**
 * Serializers must comply with this type.
 */
export type Serializer<A, B> = {
  serialize: (value: A) => Promise<B>
  deserialize: (serialized: B) => Promise<A>
}
