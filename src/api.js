import axios from 'axios'
import { changeDateFormat, getAvatarUrl } from '@/utils'
import BigNumber from '@/utils/BigNumber'
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

  request(method, params) {
    return this.ws.call(method, params)
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

  shutdown(params) {
    return this._callApiMethod('shutdown')(params)
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

  validateMnemonics(params) {
    return this._callApiMethod('validate_mnemonics')(params)
  }

  generateAddress(params) {
    return this._callApiMethod('generate_address')(params)
  }

  getAddresses(params) {
    return this._callApiMethod('get_addresses')(params, standardizeAddresses)
  }

  getBalance(params) {
    return this._callApiMethod('get_balance')(params, standardizeBalance)
  }

  getItem(params) {
    return this._callApiMethod('get')(params)
  }

  getTransactions(params) {
    return this._callApiMethod('get_transactions')(
      params,
      standardizeTransactions,
    )
  }

  getWalletInfos(params) {
    return this._callApiMethod('get_wallet_infos')(
      params,
      standardizeWalletInfos,
    )
  }

  exportMasterKey(params) {
    return this._callApiMethod('export_master_key')(params)
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

  sendTransaction(params) {
    return this._callApiMethod('send_transaction')(params)
  }

  unlockWallet(params) {
    return this._callApiMethod('unlock_wallet')(params)
  }

  resync(params) {
    return this._callApiMethod('resync_wallet')(params)
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

export class LocalStorageApi {
  _get(key) {
    return JSON.parse(localStorage.getItem(key))
  }

  _set(key, item) {
    return localStorage.setItem(key, JSON.stringify(item))
  }

  getWalletIndex() {
    return this._get('walletIndex')
  }

  setWalletIndex(index) {
    return this._set('walletIndex', index)
  }

  getNotificationsSettings() {
    return this._get('notificationsSettings')
  }

  setNotificationsSettings(notifications) {
    return this._set('notificationsSettings', notifications)
  }

  getUnitSettings() {
    return this._get('unitSettings')
  }

  setUnitSettings(unit) {
    return this._set('unitSettings', unit)
  }

  getLanguageSettings() {
    return this._get('languageSettings')
  }

  setLanguageSettings(language) {
    return this._set('languageSettings', language)
  }

  getThemeSettings() {
    return this._get('themeSettings')
  }

  setThemeSettings(theme) {
    return this._set('themeSettings', theme)
  }
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
        address: address.address,
        used: info.received_payments.length > 0,
      }
    })

    return { result: addresses }
  }
}

export function standardizeTransactions(response) {
  // TODO(#1760): When the wallet is ready, it should receive the transaction amount, fees, inputs and outputs values as a string
  if (!response.result) return response
  const transactions = response.result.transactions.map(transaction => {
    console.log('transaction', transaction)
    const transactionType = Object.keys(transaction.transaction.data)[0]
    const { inputs, outputs } = transaction.transaction.data[transactionType]
    // eslint-disable-next-line camelcase
    const { hash, miner_fee, block, timestamp, data } = transaction.transaction
    const tally = data[transactionType].tally
    const type = transaction.type
    const confirmed = transaction.transaction.confirmed
    const address = computeTransactionAddress(inputs, outputs, type)
    const filteredOutputs =
      address === 'genesis'
        ? outputs
            .map((output, index) => {
              return {
                output,
                index,
              }
            })
            .filter(({ output }) => output.output_type !== 'OTHER')
        : outputs.map((output, index) => {
            return {
              output,
              index,
            }
          })
    return {
      id: hash,
      type,
      inputs: inputs
        ? inputs.map(input => ({
            value: input.value,
            address: input.address,
          }))
        : null,
      outputs: filteredOutputs.map(({ output, index }) => ({
        value: output.value,
        address: output.address,
        timelock: output.time_lock,
        outputType: output.output_type,
        index: index,
      })),
      confirmed,
      fee: miner_fee,
      date: changeDateFormat(timestamp),
      timestamp,
      label: '',
      amount: transaction.amount,
      block: block.block_hash,
      epoch: block.epoch,
      timelocked: outputs.some(
        output =>
          output.time_lock !== 0 &&
          Date.now() <= Number(`${output.time_lock}000`),
      ),
      witnesses: null,
      address,
      rewards: null,
      rounds: null,
      currentStage: tally ? 'FINALIZED' : 'IN PROGRESS',
      reveals: tally ? tally.reveals : [],
      finalResult: tally ? tally.result : null,
      transactionType,
    }
  })
  return { result: { transactions, total: response.result.total } }
}

function computeTransactionAddress(inputs, outputs, type) {
  if (type === 'POSITIVE') {
    if (
      inputs &&
      inputs.length > 1 &&
      inputs.some(input => input.address !== inputs[0].address)
    ) {
      return 'several addresses'
    } else if (inputs && inputs.length > 0) {
      return inputs[0].address
    } else {
      // inputs.length == 0: assume this is a genesis transaction
      return 'genesis'
    }
  } else {
    // We are assumming that the first output is the address where we are
    // sending and the second is for the change. So if there are more than 2,
    // there are several addresses
    return outputs.length > 2 ? 'several addresses' : outputs[0].address
  }
}

export function standardizeBalance(response) {
  if (!response.result) return response
  const balance = response.result.unconfirmed
  return {
    result: {
      available: balance.available,
      locked: balance.locked,
      total: new BigNumber(balance.available).plus(balance.locked).toFixed(),
    },
  }
}

function standardizeWalletInfos(response) {
  if (!response.result) return response

  return {
    result: response.result.infos.map((info, index) => ({
      ...info,
      name: info.name || `My personal Witnet Wallet #${index}`,
      image: getAvatarUrl(index),
    })),
  }
}
