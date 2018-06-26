import { Serializer } from "./types"

export type JsonSerializable =
  number | string | boolean | JsonSerializableObject | JsonSerializableArray
export type JsonSerializableObject = { [key: string]: JsonSerializable }
export interface JsonSerializableArray extends Array<JsonSerializable> { }

export type Json = Serializer<JsonSerializable, string>

export const json = {
  encode: async (v: JsonSerializable) => JSON.stringify(v),
  decode: async (t: string) => JSON.parse(t)
}
