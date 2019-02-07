import { JsonSerializable, Serializer } from "app/common/serializers"

/**
 * Type of the jsonSerializer object
 */
export type JsonBufferSerializer = Serializer<JsonSerializable, Buffer>

/**
 * JSON Serializer implementation with Buffer as output type
 */
export const jsonBufferSerializer: JsonBufferSerializer = {
  serialize: async (value: JsonSerializable): Promise<Buffer> => {
    return Buffer.from(JSON.stringify(value))
  },
  deserialize: async (serialized: Buffer): Promise<JsonSerializable> => {
    return JSON.parse(serialized.toString())
  },
}
