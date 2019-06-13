const RPCWebsockets = require('rpc-websockets').Client

const defaultOptions = {
  url: 'ws://localhost:11212',
  autoconnect: true,
  reconnect: false,
  reconnectInterval: 5000,
  maxReconnects: 5,
}

export class ApiClient {
  options
  ws

  constructor (options) {
    this.options = options || defaultOptions
    this.ws = new RPCWebsockets(this.options.url, { ...this.options })
  }

  withOptions (opts) {
    return new ApiClient({ ...this.options, ...opts })
  }

  async notify (method, params) {
    return this.ws.notify(method, params)
  }

  async request (method, params) {
    return this.ws.call(method, params)
  }

  async subscribe (method) {
    return this.ws.subscribe(method)
  }

  async unsubscribe (method) {
    return this.ws.unsubscribe(method)
  }

  async open (handler) {
    return this.ws.on('open', handler)
  }

  async on (event, handler) {
    return this.ws.on(event, handler)
  }
}

function callApiMethod (methodName) {
  return (client, params) => client
    .request(methodName, params)
    .then(handleResponse)
    .catch(handleError)
}

function handleResponse (response) {
  return response.code ? { error: response } : { ...response }
}

function handleError (error) {
  return error
}

export const createDataRequest = callApiMethod('createDataRequest')
export const createMnemonics = callApiMethod('createMnemonics')
export const createWallet = callApiMethod('createWallet')
export const generateAddress = callApiMethod('generateAddress')
export const getTransactions = callApiMethod('getTransactions')
export const getWalletInfos = callApiMethod('getWalletInfos')
export const importSeed = callApiMethod('importSeed')
export const lockWallet = callApiMethod('lockWallet')
export const runRadRequest = callApiMethod('runRadRequest')
export const sendDataRequest = callApiMethod('sendDataRequest')
export const sendVTT = callApiMethod('sendVTT')
export const unlockWallet = callApiMethod('unlockWallet')
