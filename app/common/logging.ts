import { error, warn, info, debug } from "electron-log"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LogFunction = (arg: any) => void

interface Logger {
  error: LogFunction,
  warn: LogFunction,
  info: LogFunction,
  debug: LogFunction,
}

const loggers: Logger = {
  error,
  warn,
  info,
  debug,
}

export default loggers
