import { Event } from "app/main/synthetic"

interface EventOptions {
  send: (channel: string, ...args: Array<any>) => void,
  returnValue: any,
}

/**
 * Helper function for creating synthetic events.
 */
export function syntheticEvent(options: Partial<EventOptions> = {}): Event {
  return {
    sender: {
      send(channel: string, ...args: Array<any>) {
        if (options.send) {
          options.send(channel, ...args)
        }
      },
    },
    returnValue: options.returnValue,
  }
}
