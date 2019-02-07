export interface Options {
  fair: boolean,
}

/**
 * Factory function for creating IpcRenderer-like objects that support basic
 * event-listening features and can be used to test behaviours that depend
 * on this.
 */
export function ipcRendererFactory(opts?: Partial<Options>) {
  const options = {
    fair: true,
    ...opts,
  }
  let currentListener: Function | undefined

  const stub = {
    listener() {
      return currentListener
    },
    once(chan: string, listener: any) {
      currentListener = (...args: Array<any>) => {
        listener(...args)
        stub.removeAllListeners(chan)
      }
    },
    send(chan: string, message: string) {
      if (options.fair && currentListener) {
        currentListener("event", message)
      }
    },
    sendSync(chan: string, message: string) {
      if (options.fair && currentListener) {
        currentListener("event", message)
      }
    },
    removeAllListeners(chan: string) {
      currentListener = undefined
    },
  }

  return stub
}
