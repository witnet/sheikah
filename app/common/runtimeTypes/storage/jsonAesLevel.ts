import * as t from "io-ts"

export const JsonAesLevelStorageParams = t.type({
  id: t.string,
  password: t.string,
}, "JsonAesLevelStorageParams")
export type JsonAesLevelStorageParams = t.TypeOf<typeof JsonAesLevelStorageParams>
