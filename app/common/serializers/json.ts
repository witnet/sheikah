import { Serializer } from "./types"

/**
 * JsonSerializable type represents all subtypes known to be safely serializable and deserializable
 * by Javascript's own JSON library.
 */
export type JsonSerializable =
  null | number | string | boolean | JsonSerializableObject | JsonSerializableArray
export interface JsonSerializableObject { [key: string]: JsonSerializable }
export interface JsonSerializableArray extends Array<JsonSerializable> { }

/**
 * Type of the jsonSerializer object
 */
export type JsonSerializer = Serializer<JsonSerializable, string>

/**
 * JSON Serializer implementation
 */
export const jsonSerializer: JsonSerializer = {
  serialize: async (value: JsonSerializable): Promise<string> => JSON.stringify(value),
  deserialize: async (serialized: string): Promise<JsonSerializable> => JSON.parse(serialized),
}
