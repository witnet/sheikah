import {
  CreateDataRequestParams, CreateWalletParams,
  GetTransactionsParams, ImportSeedParams,
  LockWalletParams, RunDataRequestParams, SayHelloParams,
  SendDataRequestParams, SendVTTParams, UnlockWalletParams,
  GenerateAddressParams,
} from "app/common/runtimeTypes/wallet"

export { sayHello } from "./sayHello"
export { createWallet } from "./createWallet"
export { generateAddress } from "./generateAddress"
export { createDataRequest } from "./createDataRequest"
export { createMnemonics } from "./createMnemonics"
export { getWalletInfos } from "./getWalletInfos"
export { importSeed } from "./importSeed"
export { lockWallet } from "./lockWallet"
export { runDataRequest } from "./runDataRequest"
export { sendVTT } from "./sendVTT"
export { unlockWallet } from "./unlockWallet"

const RPCWebsockets = require("rpc-websockets").Client

const defaultOptions: Options = {
  url: "ws://localhost:3030",
  autoconnect: true,
  reconnect: false,
  reconnectInterval: 5000,
  maxReconnects: 5,
}

/** ApiClient interface that concrete api clients must implement */
export interface ApiClient<T, U> {
  withOptions(opts: Partial<Options>): ApiClient<T, U>,
  notify(method: T, args: U): void,
  request(method: T, args?: U): Promise<any>,
  subscribe(method: T | Array<T>): Promise<any>,
  unsubscribe(method: T | Array<T>): Promise<any>,
}

export interface Options {
  url: string,
  autoconnect: boolean,
  reconnect: boolean,
  reconnectInterval: number,
  maxReconnects: number,
}

export type ApiMethod = "createDataRequest" | "createMnemonics" | "createWallet" | "generateAddress" |
"getTransactions" | "getWalletInfos" | "importSeed" | "lockWallet" | "runDataRequest" | "say_hello" |
"sendDataRequest" | "sendVTT" | "unlockWallet"

export type MethodArgs = CreateDataRequestParams | CreateWalletParams |
GetTransactionsParams | ImportSeedParams | LockWalletParams | RunDataRequestParams |
SayHelloParams | SendDataRequestParams |
SendVTTParams | UnlockWalletParams | GenerateAddressParams

export class Client implements ApiClient<ApiMethod, MethodArgs> {
  ws: any;
  constructor(public options: Options = defaultOptions) {
    // TODO: remove unneccessary option fields. For instance, url
    this.ws = new RPCWebsockets(this.options.url, { ...this.options })
  }

  public withOptions(opts: Partial<Options>): ApiClient<ApiMethod, MethodArgs> {
    return new Client({ ...this.options, ...opts })
  }

  public async notify(method: ApiMethod, params: MethodArgs): Promise<void> {
    return this.ws.notify(method, params)
  }

  public async request(method: ApiMethod, params: MethodArgs): Promise<void> {
    //  TODO: pass class options
    return this.ws.call(method, params)
  }

  public async subscribe(method: ApiMethod): Promise<void> {
    return this.ws.subscribe(method)
  }

  public async unsubscribe(method: ApiMethod): Promise<void> {
    return this.ws.unsubscribe(method)
  }

  public async open(handler: Function) {
    return this.ws.on("open", handler)
  }

  public async on(event: string, handler: Function) {
    return this.ws.on(event, handler)
  }
}
