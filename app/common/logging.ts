import { error, warn, info, debug } from "electron-log"

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
