import Vue from 'vue'
import Vuex from 'vuex'

import { ApiClient, tryDataRequest, createMnemonics, getTransactions, getWalletInfos, lockWallet, sendVTT } from '@/api'

Vue.use(Vuex)

const apiClient = new ApiClient()

export default new Vuex.Store({
  state: {
    radRequestResult: null,
    radRequestError: null,
    radRequest: {
      retrieve: [
        {
          url: '',
          kind: 'HTTP_GET',
          script: [67, [115, 0]],
        },
      ],
      aggregate: {
        script: [0x43, 0x74, [0x61, 'weather'], 0x74, [0x61, 'temp'], 0x72],
      },
      consensus: {
        script: [0x43, 0x74, [0x61, 'weather'], 0x74, [0x61, 'temp'], 0x72],
      },
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
    setDataRequestResult (state, result) {
      state.dataRequestResult = result
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
      const requestResult = await tryDataRequest(apiClient, { rad_request: context.store.radRequest })
      if (requestResult.result) {
        context.commit('setDataRequestResult', requestResult.response)
      } else {
        context.commit('setError', 'tryDataRequest', requestResult.error)
      }
    },
  },
})
