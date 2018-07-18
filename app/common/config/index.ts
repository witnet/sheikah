import { inDevelopment } from "app/common/env"
import { AppInfo } from "app/common/runtimeTypes/storage/app"
import { ChainType } from "app/common/chain/chainType"

export type Config = {
  appInfo: AppInfo
  chainType: ChainType
}

export const config: Config = inDevelopment
  ? require("./development").default
  : require("./production").default
