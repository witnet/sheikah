import axios from 'axios'
import { changeDateFormat, calculateTimeAgo } from '@/utils'
const RPCWebsockets = require('rpc-websockets').Client

const defaultOptions = {
  url: 'ws://localhost:11212',
  autoconnect: true,
  reconnect: true,
  reconnect_interval: 1000,
  max_reconnects: 0,
}

class ApiClient {
  listeners
  options
  ws

  constructor(options) {
    this.listeners = {}
    this.options = options || defaultOptions
    this.ws = new RPCWebsockets(this.options.url, { ...this.options })
  }

  withOptions(opts) {
    return new ApiClient({ ...this.options, ...opts })
  }

  notify(method, params) {
    return this.ws.notify(method, params)
  }

  request(method, params) {
    return this.ws.call(method, params)
  }

  subscribe(method) {
    return this.ws.subscribe(method)
  }

  unsubscribe(method) {
    return this.ws.unsubscribe(method)
  }

  open(handler) {
    return this.ws.on('open', handler)
  }

  on(event, handler) {
    // Prevents from subscribing to the same event more than once
    if (event in this.listeners) {
      return this.listeners[event]
    } else {
      const listener = this.ws.on([event], (...args) => {
        handler(...args)
      })
      this.listeners[event] = listener

      return listener
    }
  }
}

export class WalletApi {
  client

  constructor() {
    this.client = new ApiClient()
  }

  // TODO(#594): Handle errors in a proper way
  _handleResponse(response) {
    return response && response.error ? response : { result: response || true }
  }

  _handleError(error) {
    return { error }
  }

  _callApiMethod(methodName) {
    return (params, normalizer = x => x) =>
      this.client
        .request(methodName, params)
        .then(this._handleResponse)
        .then(normalizer)
        .catch(this._handleError)
  }

  closeSession(params) {
    return this._callApiMethod('close_session')(params)
  }

  // This is overriding the native `client.subscribe` because it lacks support for `params`
  subscribeToNotifications(params, cb) {
    return this._callApiMethod('rpc.on')([params.session_id])
      .then(_ => {
        this.client.on('notifications', cb)
      })
      .catch(this._handleError)
  }

  unsubscribeFromNotifications(params) {
    return this._callApiMethod('rpc.off')([params.session_id])
  }

  createDataRequest(params) {
    return this._callApiMethod('create_data_request')(params)
  }

  createMnemonics(params) {
    return this._callApiMethod('create_mnemonics')(params)
  }

  createVTT(params) {
    const defaultParams = { time_lock: 0 }
    return this._callApiMethod('create_vtt')({ ...defaultParams, ...params })
  }

  createWallet(params) {
    return this._callApiMethod('create_wallet')(params)
  }

  generateAddress(params) {
    return this._callApiMethod('generate_address')(params)
  }

  getAddresses(params) {
    return this._callApiMethod('get_addresses')(params, standardizeAddresses)
  }

  getBalance(params) {
    return this._callApiMethod('get_balance')(params)
  }

  getItem(params) {
    return this._callApiMethod('get')(params)
  }

  getTransactions(params) {
    return this._callApiMethod('get_transactions')(
      params,
      standardizeTransactions
    )
  }

  getWalletInfos(params) {
    return this._callApiMethod('get_wallet_infos')(params)
  }

  importSeed(params) {
    return this._callApiMethod('import_seed')(params)
  }

  lockWallet(params) {
    return this._callApiMethod('lock_wallet')(params)
  }

  runRadRequest(params) {
    return this._callApiMethod('run_rad_request')(params)
  }

  saveItem(params) {
    return this._callApiMethod('set')(params)
  }

  sendDataRequest(params) {
    return this._callApiMethod('send_data_request')(params)
  }

  sendTransaction(params) {
    return this._callApiMethod('send_transaction')(params)
  }

  unlockWallet(params) {
    return this._callApiMethod('unlock_wallet')(params)
  }
}

export class MarketplaceApi {
  baseUrl =
    process.env.marketplaceUrl ||
    'https://witnet-marketplace-api-test.herokuapp.com'

  _handleResponse(response) {
    if (response && response.data) {
      return response.data
    }
  }

  _handleError(error) {
    return { error }
  }

  _get(url) {
    return axios
      .get(url)
      .then(this._handleResponse)
      .catch(this._handleError)
  }

  getTemplates() {
    return this._get(`${this.baseUrl}/templates`)
  }

  getTemplate(id) {
    return axios
      .get(`${this.baseUrl}/templates/${id}`)
      .then(this._handleResponse)
      .catch(this._handleError)
  }

  postTemplate() {}
}

export function standardizeAddresses(response) {
  if (response && response.error) {
    return response
  } else {
    const addresses = response.result.addresses.map(address => {
      const info = address.info

      return {
        receivedPayments: info.received_payments.length,
        receivedAmount: info.received_amount,
        lastPaymentDate: new Date(Number(info.last_payment_date + '000')),
        firstPaymentDate: new Date(Number(info.first_payment_date + '000')),
        index: address.index,
        pkh: address.pkh,
        used: info.received_payments.length > 0,
      }
    })

    return { result: addresses }
  }
}

export function standardizeTransactions(response) {
  if (!response.result) return response
  const transactions = response.result.transactions.map(transaction => {
    const transactionType = Object.keys(transaction.transaction.data)[0]

    const { inputs, outputs } = transaction.transaction.data[transactionType]
    // eslint-disable-next-line camelcase
    const { hash, miner_fee, block, tally, timestamp } = transaction.transaction

    return {
      id: hash,
      type: transaction.type,
      inputs: inputs
        ? inputs.map(input => ({ value: input.value, address: input.address }))
        : null,
      outputs: outputs.map(output => ({
        value: output.value,
        address: output.address,
      })),
      fee: miner_fee,
      date: changeDateFormat(timestamp),
      timeAgo: calculateTimeAgo(timestamp),
      label: '',
      amount: transaction.amount,
      block: block.block_hash,
      witnesses: null,
      rewards: null,
      rounds: null,
      currentStage: tally ? 'FINALIZED' : 'IN PROGRESS',
      reveals: tally ? tally.reveals : null,
      finalResult: tally ? tally.result : null,
      transactionType,
    }
  })

  return { result: transactions }
}
