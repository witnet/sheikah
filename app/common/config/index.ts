import { inDevelopment } from "app/common/env"
export { Config } from "./common"

export const config = inDevelopment ? require("./development") : require("./production")
