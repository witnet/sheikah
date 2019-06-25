import { ApiClient, createWallet, unlockWallet, runRadRequest, createMnemonics, getTransactions, getWalletInfos, lockWallet, sendVTT } from '@/api'
import { encodeDataRequest } from '@/utils'

const apiClient = new ApiClient()

export default {
  state: {
    errors: {
      createMnemonics: null,
      createWallet: null,
      getTransactions: null,
      getWalletInfos: null,
      lockWallet: null,
      sendVTT: null,
      tryDataRequest: null,
      unlockWallet: null,
    },
    mnemonics: null,
    networkStatus: 'error',
    radRequestResult: null,
    transactions: [],
    wallet: null,
    walletInfos: [],
    walletLocked: false,
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

    setWallet (state, { wallet }) {
      state.wallet = wallet
    },

    lockWallet (state, id) {
      state.lockWallet = id
    },

    setError (state, { name, error }) {
      state.errors[name] = error
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

    unlockWallet: async function (context, { walletId, password }) {
      const request = await unlockWallet(apiClient, { walletId, password, sessionId: '1' })
      if (request.unlockedWalletId) {
        // TODO(#706) We should receive a wallet structure instead a walletId
        context.commit('setWallet', { wallet: request.unlockedWalletId })
      } else {
        context.commit('setError', { name: 'unlockWallet', error: request.error })
      }
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
      const request = await createWallet(apiClient, {
        name: 'first',
        caption: '1',
        seedSource: {
          data: params.mnemonics,
          source: params.sourceType,
        },
        password: params.password,
      })
      if (request.walletId) {
        context.dispatch('unlockWallet', { walletId: request.walletId, password: params.password })
      } else {
        context.commit('setError', 'createWallet', request.error)
      }
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
}
