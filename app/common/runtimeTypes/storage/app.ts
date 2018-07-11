import * as t from "io-ts"

export const ExecutionEnvironment = t.union([
  t.literal("dev"),
  t.literal("prod")
])
export type ExecutionEnvironment = t.TypeOf<typeof ExecutionEnvironment>

export const AppInfo = t.type({
  name: t.string,
  version: t.array(t.number),
  env: ExecutionEnvironment
}, "AppInfo")
export type AppInfo = t.TypeOf<typeof AppInfo>