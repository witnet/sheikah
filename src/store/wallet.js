import { encodeDataRequest } from '@/utils'

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
      state.networkStatus = this.$walletApi.client.ws.ready ? 'synced' : 'error'
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

    setWalletInfos (state, { walletInfos }) {
      state.walletInfos = walletInfos
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
      const request = await this.$walletApi.sendVTT({ wallet_id: walletId, to_address: toAddress, amount, fee, subject })
      if (request.result) {
        context.commit('sendVTTSuccess', request.result)
      } else {
        context.commit('setError', 'sendVTT', request.error)
      }
    },

    unlockWallet: async function (context, { walletId, password }) {
      const request = await this.$walletApi.unlockWallet({ walletId, password, sessionId: '1' })
      if (request.result) {
        // TODO(#706) We should receive a wallet structure instead a walletId
        context.commit('setWallet', { wallet: request.result.sessionId })
      } else {
        context.commit('setError', { name: 'unlockWallet', error: request.error })
      }
    },

    lockWallet: async function (context, { walletId, wipe }) {
      const request = await this.$walletApi.lockWallet({ wallet_id: walletId, wipe })
      if (request.result) {
        context.commit('lockWallet', context.store.wallet.id)
      } else {
        context.commit('setError', 'lockWallet', request.error)
      }
    },

    createMnemonics: async function (context) {
      const request = await this.$walletApi.createMnemonics({ length: 12 })
      if (request.result) {
        context.commit('setMnemonics', request.result.mnemonics)
      } else {
        context.commit('setError', 'createMnemonics', request.error)
      }
    },

    createWallet: async function (context, params) {
      const request = await this.$walletApi.createWallet({
        name: 'first',
        caption: '1',
        seedData: params[params.sourceType],
        seedSource: params.sourceType,
        password: params.password,
      })
      if (request.result) {
        context.dispatch('unlockWallet', { walletId: request.result.walletId, password: params.password })
      } else {
        context.commit('setError', { name: 'createWallet', error: request.error.data[0][1] })
      }
    },

    getTransactions: async function (context, { walletId, limit, page }) {
      const request = await this.$walletApi.getTransactions({ wallet_id: walletId, limit, page })

      if (request.result) {
        context.commit('setTransactions', request.result)
      } else {
        context.commit('setError', 'getTransactions', request.error)
      }
    },

    getWalletInfos: async function (context) {
      const request = await this.$walletApi.getWalletInfos()
      if (request.result) {
        context.commit('setWalletInfos', { walletInfos: request.result.infos })
      } else {
        context.commit('setError', 'getWalletInfos', request.error)
      }
    },

    tryDataRequest: async function (context) {
      const encodedRadRequest = encodeDataRequest(context.rootState.rad.radRequest)
      const request = await this.$walletApi.runRadRequest({ radRequest: encodedRadRequest })
      if (request.result) {
        context.commit('setDataRequestResult', request.result)
      } else {
        context.commit('setError', 'tryDataRequest', request.error)
      }
    },
  },
}
