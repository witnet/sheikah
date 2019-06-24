import Vue from 'vue'
import Vuex from 'vuex'
import msgpack5 from 'msgpack5'

import { ApiClient, runRadRequest, createMnemonics, getTransactions, getWalletInfos, lockWallet, sendVTT } from '@/api'
import { getOutput, isValidScript } from './radon/utils'
import { match } from './utils'
import {
  TYPES as RadonTypes,
  OPERATOR_INFOS as RadonOperatorInfos,
  TYPESYSTEM as RadonTypeSystem,
  // HashFunctionCodes,
  // ReducingFunctionCodes,
  // FilteringFunctionCodes,
} from '@/radon'

const msgpack = msgpack5()

Vue.use(Vuex)

const apiClient = new ApiClient()

export default new Vuex.Store({
  state: {
    networkStatus: 'error',
    radRequestResult: null,
    radRequestError: null,
    radRequest: {
      not_before: 0,
      retrieve: [
        {
          url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
          kind: 'HTTP-GET',
          script: [
            83,
            132,
            [ 1, 'bpi' ],
            132,
            [ 1, 'USD' ],
            132,
            [ 1, 'rate_float' ],
            130,
          ],
        },
      ],
      aggregate: {
        script: [
          [
            102,
            32,
          ],
        ],
      },
      consensus: {
        script: [
          [
            102,
            32,
          ],
        ],
      },
      deliver: [{ kind: 'HTTP-GET', url: 'https://hooks.zapier.com/hooks/catch/3860543/l2awcd' }],
    },
    wallet: null,
    walletLocked: false,
    walletInfos: [],
    transactions: [],
    mnemonics: null,
    errors: {
      createMnemonics: null,
      createWallet: null,
      lockWallet: null,
      unlockWallet: null,
      sendVTT: null,
      getTransactions: null,
      getWalletInfos: null,
      tryDataRequest: null,
    },
  },
  getters: {
    mnemonics: state => {
      return state.mnemonics
    },
  },
  mutations: {
    checkNetworkStatus (state) {
      state.networkStatus = apiClient.ws.ready ? 'synced' : 'error'
    },
    setDataRequestResult (state, result) {
      Object.assign(state, { radRequestResult: result })
    },

    setMnemonics (state, result) {
      Object.assign(state, { mnemonics: result })
    },

    setWallet (state, wallet) {
      state.wallet = wallet
    },

    lockWallet (state, id) {
      state.lockWallet = id
    },
    unlockWallet (state, wallet) {
      state.wallet = wallet
    },

    setError (state, errorName, error) {
      state.errors[errorName] = error
    },

    pushOperator (state, { path }) {
      if (path.stage === 'retrieve' && state.radRequest.retrieve[path.retrieveIndex].script.length === 0) {
        state.radRequest.retrieve[path.retrieveIndex].script.push(67)
      } else {
        const currentScript = Number.isInteger(parseInt(path.retrieveIndex))
          ? state.radRequest[path.stage][path.retrieveIndex].script
          : state.radRequest[path.stage].script
        const scriptTypes = currentScript.map(getOutput)
        if (scriptTypes[0] === 'Self') {
          console.log(`ERROR pushing a new operator in stage ${path.stage} in stageIndex ${path.retrieveIndex}`)
        } else {
        // TODO: check if first operator in aggregate phase is Self and then search the type in retrieval stage
          const cleanScriptTypes = scriptTypes.map((item, index, array) => {
            if (item === 'Self') {
              return array[index - 1]
            } else {
              return item
            }
          })

          const outputType = cleanScriptTypes[cleanScriptTypes.length - 1]
          const operatorsObject = RadonTypeSystem[RadonTypes[outputType]]
          const newOperatorCode = parseInt(Object.entries(operatorsObject)[0][0])
          const newOperatorInfo = RadonOperatorInfos[newOperatorCode]
          const numberOfOperatorArguments = newOperatorInfo.arguments.length

          if (numberOfOperatorArguments === 0) {
            Number.isInteger(parseInt(path.retrieveIndex))
              ? state.radRequest[path.stage][path.retrieveIndex].script.push(newOperatorCode)
              : state.radRequest[path.stage].script.push(newOperatorCode)
          } else {
            Number.isInteger(parseInt(path.retrieveIndex))
              ? state.radRequest[path.stage][path.retrieveIndex].script.push([newOperatorCode])
              : state.radRequest[path.stage].script.push(newOperatorCode)
          }
        }
      }
    },

    pushRetrieve (state) {
      state.radRequest.retrieve.push({
        url: '',
        kind: 'HTTP_GET',
        script: [],
      })
    },
    updateArgumentInput (state, { path, input, operator, argIndex }) {
      operator[argIndex] = input
      if (Number.isInteger(parseInt(path.retrieveIndex))) {
        state.radRequest[`${path.stage}`][path.retrieveIndex][path.scriptIndex] = operator
      } else {
        state.radRequest[`${path.stage}`][path.scriptIndex] = operator
      }
    },
    selectHashFunction: function (state, { path, hashFunctionCode, operator, argIndex }) {
      operator[argIndex] = hashFunctionCode
      if (Number.isInteger(parseInt(path.retrieveIndex))) {
        state.radRequest[`${path.stage}`][path.retrieveIndex][path.scriptIndex] = operator
        state.radRequest[`${path.stage}`] = [...state.radRequest[`${path.stage}`]]
      } else {
        state.radRequest[`${path.stage}`][path.scriptIndex] = operator
        state.radRequest[`${path.stage}`] = { ...this[`${path.stage}`] }
      }
    },
    updateOperatorReduceArgument: function (state, { path, reduceArgument, operator, argIndex }) {
      operator[argIndex] = reduceArgument
      if (Number.isInteger(parseInt(path.retrieveIndex))) {
        state.radRequest[`${path.stage}`][path.retrieveIndex].script[path.scriptIndex] = operator
        state.radRequest[`${path.stage}`] = [...state.radRequest[`${path.stage}`]]
      } else {
        state.radRequest[`${path.stage}`].script[path.scriptIndex] = operator
        state.radRequest[`${path.stage}`] = { ...state.radRequest[`${path.stage}`] }
      }
    },
    updateFilterArgument: function (state, { path, filterArgument, operator, argIndex }) {
      operator[argIndex] = [operator[argIndex][0], filterArgument]
      if (Number.isInteger(parseInt(path.retrieveIndex))) {
        state.radRequest[`${path.stage}`][path.retrieveIndex][path.scriptIndex] = operator
        state.radRequest[`${path.stage}`] = [...state.radRequest[`${path.stage}`]]
      } else {
        state.radRequest[`${path.stage}`][path.scriptIndex] = operator
        state.radRequest[`${path.stage}`] = { ...state.radRequest[`${path.stage}`] }
      }
    },
    updateOperatorFilterArgument: function (state, { path, filterFunctionCode, operator, argIndex }) {
      operator[argIndex] = [filterFunctionCode, '']
      if (Number.isInteger(parseInt(path.retrieveIndex))) {
        state.radRequest[`${path.stage}`][path.retrieveIndex][path.scriptIndex] = operator
      } else {
        state.radRequest[`${path.stage}`][path.scriptIndex] = operator
      }
    },
    updateOperatorCodeSelect: function (state, { path, operatorCode }) {
      let args = RadonOperatorInfos[operatorCode].arguments.map(argument => {
        return match(argument.kind, [
          {
            options: [
              RadonTypes.Boolean,
            ],
            result: true,
          },
          {
            options: [
              RadonTypes.Int,
            ],
            result: 0,
          },
          {
            options: [
              RadonTypes.Float,
            ],
            result: 0.0,
          },
          {
            options: [
              RadonTypes.String,
            ],
            result: '',
          },
          {
            options: [
              RadonTypes.Map,
              RadonTypes.Mixed,
              RadonTypes.Array,
              RadonTypes.Null,
              RadonTypes.Result,
              RadonTypes.Self,
              RadonTypes.MapFunction,
            ],
            result: [],
          },
          {
            options: [RadonTypes.FilterFunction],
            result: [0, 0],
          },
          {
            options: [RadonTypes.HashFunction],
            result: 0,
          },
          {
            options: [RadonTypes.ReduceFunction],
            result: 0,
          },
        ])
      })
      if (path.stage === 'retrieve') {
        state.radRequest[`${path.stage}`][path.retrieveIndex].script[path.scriptIndex] = [
          parseInt(operatorCode),
          ...args,
        ]
        if (!isValidScript('')) {
          state.radRequest[`${path.stage}`][path.retrieveIndex].script.splice(
            path.scriptIndex + 1,
            state.radRequest[`${path.stage}`][path.retrieveIndex].script.length,
          )
        }
        state.radRequest[`${path.stage}`] = { ...state.radRequest[`${path.stage}`] }
      } else {
        state.radRequest[`${path.stage}`].script[path.scriptIndex] = [
          parseInt(operatorCode),
          ...args,
        ]
        if (!isValidScript('')) {
          state.radRequest[`${path.stage}`].script.splice(
            path.scriptIndex + 1,
            state.radRequest[`${path.stage}`].script.length,
          )
        }
        state.radRequest[`${path.stage}`] = { ...state.radRequest[`${path.stage}`] }
      }
    },
  },
  actions: {
    sendVTT: async function (context, { walletId, toAddress, amount, fee, subject }) {
      const sendVTTRequest = await sendVTT(apiClient, { wallet_id: walletId, to_address: toAddress, amount, fee, subject })
      if (sendVTTRequest.result) {
        context.commit('sendVTTSuccess', sendVTTRequest.result)
      } else {
        context.commit('setError', 'sendVTT', sendVTTRequest.error)
      }
    },

    unlockWallet: async function (context, { id, password }) {
      // const unlockWalletRequest = await unlockWallet(apiClient, { id, password })
      setTimeout(function () {
        context.commit('setWallet', { wallet: { name: 'Prueba' } })
      }, 500)

      // if (unlockWalletRequest.result) {
      //   context.commit('setWallet', context.store.wallet.id)
      // } else {
      //   context.commit('setError', 'unlockWallet', unlockWalletRequest.error)
      // }
    },

    lockWallet: async function (context, { walletId, wipe }) {
      const lockWalletRequest = await lockWallet(apiClient, { wallet_id: walletId, wipe })
      if (lockWalletRequest.result) {
        context.commit('lockWallet', context.store.wallet.id)
      } else {
        context.commit('setError', 'lockWallet', lockWalletRequest.error)
      }
    },

    createMnemonics: async function (context) {
      const createMnemonicsRequest = await createMnemonics(apiClient, { length: 'Words12' })
      if (createMnemonicsRequest.mnemonics) {
        context.commit('setMnemonics', createMnemonicsRequest.mnemonics)
      } else {
        context.commit('setError', 'createMnemonics', createMnemonicsRequest.error)
      }
    },

    createWallet: async function (context, params) {
      // const createWalletRequest = await createWallet(apiClient, params)
      // TODO() make read request when the wallet implements this feature
      setTimeout(function () {
        context.commit('setWallet', { wallet: { name: 'Prueba' } })
      }, 500)
      // if (createWalletRequest.result) {
      //   context.commit('setWallet', createWalletRequest.response)
      // } else {
      //   context.commit('setError', 'createWallet', createWalletRequest.error)
      // }
    },

    getTransactions: async function (context, { walletId, limit, page }) {
      const getTransactionsRequest = await getTransactions(apiClient, { wallet_id: walletId, limit, page })

      if (getTransactionsRequest.result) {
        context.commit('setTransactions', getTransactionsRequest.response)
      } else {
        context.commit('setError', 'getTransactions', getTransactionsRequest.error)
      }
    },

    getWalletInfos: async function (context) {
      const getWalletInfosRequest = await getWalletInfos(apiClient)

      if (getWalletInfosRequest.result) {
        context.commit('setWalletInfos', getWalletInfosRequest.response)
      } else {
        context.commit('setError', 'getWalletInfos', getWalletInfosRequest.error)
      }
    },

    tryDataRequest: async function (context) {
      const encodedRadRequest = encodeDataRequest(context.state.radRequest)
      const requestResult = await runRadRequest(apiClient, { radRequest: encodedRadRequest })
      if (requestResult.result) {
        context.commit('setDataRequestResult', requestResult.result)
      } else {
        context.commit('setError', 'tryDataRequest', requestResult.error)
      }
    },
  },
})

function encodeDataRequest (radRequest) {
  return {
    not_before: radRequest.not_before,
    retrieve: radRequest.retrieve.map(retrieve => {
      return { ...retrieve, script: [...msgpack.encode(retrieve.script)] }
    }),

    aggregate: { script: [...msgpack.encode(radRequest.aggregate.script)] },
    consensus: { script: [...msgpack.encode(radRequest.consensus.script)] },
    deliver: radRequest.deliver,
  }
}
