/**
 * This module exports the `Client` class which is used to interact via ipc with Electron main
 * process.
 */
import log from "app/common/logging"
import * as protocol from "app/common/ipc-protocol"
import * as ipc from "app/renderer/ipc"
import {
  JsonSerializable,
  jsonSerializer,
  JsonSerializer,
} from "app/common/serializers"

/**
 * Exports API renderer functions
 */
export { newMnemonics } from "./newMnemonics"
export { getWalletInfos } from "./getWalletInfos"
export { getWallet } from "./getWallet"
export { encryptWallet } from "./encryptWallet"
export { validateMnemonics, validateXprv } from "./validateMnemonics"
export { generateAddress } from "./generateAddress"

/** Options type expected by `Client` */
export interface Options {
  /** Channel name used by the client to send requests/notifications */
  channel: string,
  /** IPC backend used by the client to send requests and to listen for responses  */
  ipc: ipc.Ipc,
  /** Timeout in milliseconds to wait for a response */
  timeout: number,
  /** Generator of request ids used by the client */
  idGen: ipc.RequestIdGenerator,
  /** Function that handles the message deserialization and interpretation */
  messageHandler: (json: JsonSerializer, message: string) => Promise<any>,
  /** Json serializer to use for (de)serializing requests/responses */
  json: JsonSerializer,
}

/** ApiClient interface that concrete api clients must implement */
export interface ApiClient {
  withOptions(opts: Partial<Options>): ApiClient,
  notify(method: string, ...args: Array<any>): void,
  request(method: string, ...args: Array<any>): Promise<any>,
}

/** Default `Client` options */
export const defaultOptions: Options = {
  channel: ipc.asyncChannel,
  timeout: ipc.timeout,
  ipc: ipc.electronIpc,
  idGen: ipc.idGenerator,
  messageHandler: defaultMessageHandler,
  json: jsonSerializer,
}

/**
 * Default message handler used in Api Client's `defaultOptions`. This handler is the one processing
 * response messages from Electron's IPC Main process.
 */
export async function defaultMessageHandler(json: JsonSerializer, message: string): Promise<any> {
  try {
    const obj = await json.deserialize(message)
    const response = await protocol.decodeResponse(obj)
    if ("error" in response) {
      throw new Error(response.error.message)
    }

    return response.result
  } catch (e) {
    throw e
  }
}

/**
 * Class representing the Api Client used to send requests and notifications using the JSON-RPC
 * protocol to Electron's IPC Main process.
 */
export class Client implements ApiClient {
  constructor(public options: Options = defaultOptions) { }

  /** Returns a new client with its options overriden by `newOpts`. */
  public withOptions(newOpts: Partial<Options>): Client {
    return new Client({ ...this.options, ...newOpts })
  }

  /**
   * Invokes `method` asynchronously in IPC Main process as a notification.
   * Notifications are like requests but they don't expect any response.
   * This function will always return a resolved Promise with the `undefined`
   * value in case of success, or a rejected Promise in case of any error in
   * preparing the payload of the request.
   */
  public async notify(method: string, params: JsonSerializable = null): Promise<void> {
    return this.send(method, params).then((result) => undefined)
  }

  /** Invokes `method` asynchronously in IPC Main process as a request.
   * This function returns a Promise that will eventually be resolved with the
   * response of Main or it will reject it with a timeout error in case of
   * a response doesn't arrive in `ipc.timeout` milliseconds (by default) or if
   * any error ocurrs preparing the payload of the request.
   */
  public async request(method: string, params: JsonSerializable = null): Promise<any> {
    return this.send(method, params, this.options.idGen())
  }

  /** Helper method that contains the common logic for sending requests or notifications. */
  private async send(method: string, params: JsonSerializable, id?: string | number): Promise<any> {
    const { channel, timeout, ipc, json, messageHandler } = this.options
    const replyChannel = id ? protocol.replyChannel(id) : null
    const request = id ? protocol.request(method, id, params)
      : protocol.notification(method, params)

    return new Promise((resolve, reject) => {
      if (replyChannel) {
        log.debug(`[IPC Renderer] Client sending request ${request.method} (${replyChannel})`)

        ipc.once(replyChannel, (event: any, message: string) => {
          log.debug(`[IPC Renderer] Client received response for ${request.method}: ${message}`)
          messageHandler(json, message).then(resolve).catch(reject)
        })

        setTimeout(() => {
          ipc.removeAllListeners(replyChannel)
          reject(new protocol.TimeoutError(`[IPC Renderer] Client request ${method} timed out`))
        }, timeout)
      }

      json
        .serialize(request)
        .then((message) => {
          ipc.send(channel, message)
        })
        .then(() => {
          if (!replyChannel) {
            resolve()
          }
        })
        .catch((e) => {
          if (replyChannel) {
            ipc.removeAllListeners(replyChannel)
          }
          reject(e)
        })
    })
  }
}
