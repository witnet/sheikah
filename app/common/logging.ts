import {error, warn, info, debug} from "electron-log"

type LogFunction = (arg: any) => void

type Logger = {
  error: LogFunction;
  warn: LogFunction;
  info: LogFunction;
  debug: LogFunction;
}

export default {
  error,
  warn,
  info,
  debug
} as Logger
