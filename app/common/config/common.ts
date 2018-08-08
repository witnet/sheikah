import { Config } from "app/common/config/index"
import { inDevelopment } from "app/common/env"

export const commonConfig: Partial<Config> = {
  appInfo: {
    name: process.env.npm_package_productName || "this app",
    version: (process.env.npm_package_version || "0.0.0").split(".").map((n) => parseInt(n, 10)),
    env: inDevelopment ? "dev" : "prod"
  },
  mnemonicsIdGeneration: {
    salt: "sheikah seed",
    hashIterations: 4096,
    keyByteLength: 32,
    hashFunctionName: "sha256"
  }
}
