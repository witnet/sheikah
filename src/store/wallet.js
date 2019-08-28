import { encodeDataRequest } from '@/utils'
import router from '@/router'

export default {
  state: {
    errors: {
      createMnemonics: null,
      createWallet: null,
      getTransactions: null,
      getWalletInfos: null,
      lockWallet: null,
      sendTransaction: null,
      tryDataRequest: null,
      unlockWallet: null,
    },
    balances: {
      available: null,
      timelocked: null,
      unconfirmed: null,
      total: null,
    },
    sessionId: null,
    walletId: null,
    addresses: [],
    generatedTransaction: null,
    mnemonics: null,
    networkStatus: 'error',
    radRequestResult: null,
    transactions: [],
    walletInfos: [],
    walletLocked: false,
    // windowWidth: window.innerWidth,
  },
  mutations: {
    // setWindowWidth(state) {
    //   state.windowWidth = window.innerWidth
    //   console.log('comes from the state--->', state.windowWidth)
    // },
    deleteSession(state) {
      state.sessionId = null
      state.walletId = null
    },
    checkNetworkStatus(state) {
      state.networkStatus = this.$walletApi.client.ws.ready ? 'synced' : 'error'
    },
    setDataRequestResult(state, result) {
      Object.assign(state, { radRequestResult: result })
    },
    setMnemonics(state, result) {
      Object.assign(state, { mnemonics: result })
    },

    setWallet(state, { walletId, sessionId }) {
      state.walletId = walletId
      state.sessionId = sessionId
    },

    setWalletInfos(state, { walletInfos }) {
      state.walletInfos = walletInfos
    },

    lockWallet(state, id) {
      state.lockWallet = id
    },

    setError(state, { name, error }) {
      state.errors[name] = error
    },

    setGeneratedTransaction(state, { transaction }) {
      state.generatedTransaction = transaction
    },
    setAddresses(state, { addresses, address }) {
      if (addresses) {
        state.addresses = [...addresses, ...state.addresses]
      }

      if (address) {
        state.addresses.push(address)
      }
    },
  },
  actions: {
    closeSession: async function(context) {
      const request = await this.$walletApi.closeSession({
        walletId: context.state.walletId,
        sessionId: context.state.sessionId,
      })
      if (request.result) {
        context.commit('deleteSession')
        router.push('/welcome-back/wallet-list')
      } else {
        // TODO: handle error properly
        console.log('error closing session')
      }
    },

    sendTransaction: async function(context) {
      const request = await this.$walletApi.sendTransaction({
        walletId: context.state.walletId,
        sessionId: context.state.sessionId,
        transaction: context.state.generatedTransaction,
      })
      // context.commit('setSuccess', 'sendTransaction')
    },

    createVTT: async function(context, { address, amount, fee, label }) {
      const request = await this.$walletApi.createVTT({
        wallet_id: this.state.wallet.id,
        address,
        amount,
        fee,
        label,
      })
      const generatedTransaction = {
        to: address,
        amount,
        fee,
        type: 'Value Transfer Transaction',
        from: [
          '0xfabadafabadafabadafabadafabada',
          '0xacabadaacabadaacabadaacabada',
          '0xbeefbeefbeefbeefbeefbeefbeef',
        ],
      }
      context.commit('setGeneratedTransaction', { transaction: generatedTransaction })
    },

    getAddresses: async function(context) {
      const request = await this.$walletApi.getAddresses({
        walletId: context.state.walletId,
        sessionId: context.state.sessionId,
      })
      if (request.result) {
        context.commit('setAddresses', { addresses: request.result.addresses.map(x => x.address) })
      }
    },

    generateAddress: async function(context, { label }) {
      const request = await this.$walletApi.generateAddress({
        label,
        walletId: context.state.walletId,
        sessionId: context.state.sessionId,
      })

      if (request.result) {
        context.commit('setAddresses', { address: request.result.address })
      }
    },

    unlockWallet: async function(context, { walletId, password }) {
      const request = await this.$walletApi.unlockWallet({ walletId, password, sessionId: '1' })
      if (request.result) {
        // TODO(#706) We should receive a wallet structure instead a walletId
        context.commit('setWallet', { sessionId: request.result.sessionId, walletId })
      } else {
        context.commit('setError', { name: 'unlockWallet', error: request.error })
      }
    },

    lockWallet: async function(context, { walletId, wipe }) {
      const request = await this.$walletApi.lockWallet({ wallet_id: walletId, wipe })
      if (request.result) {
        context.commit('lockWallet', context.store.wallet.id)
      } else {
        context.commit('setError', 'lockWallet', request.error)
      }
    },

    createMnemonics: async function(context) {
      const request = await this.$walletApi.createMnemonics({ length: 12 })
      if (request.result) {
        context.commit('setMnemonics', request.result.mnemonics)
      } else {
        context.commit('setError', 'createMnemonics', request.error)
      }
    },

    createWallet: async function(context, params) {
      const request = await this.$walletApi.createWallet({
        name: 'first',
        caption: '1',
        seedData: params[params.sourceType],
        seedSource: params.sourceType,
        password: params.password,
      })
      if (request.result) {
        context.dispatch('unlockWallet', {
          walletId: request.result.walletId,
          password: params.password,
        })
      } else {
        context.commit('setError', { name: 'createWallet', error: request.error.data[0][1] })
      }
    },

    getTransactions: async function(context, { walletId, limit, page }) {
      const request = await this.$walletApi.getTransactions({ wallet_id: walletId, limit, page })

      if (request.result) {
        context.commit('setTransactions', request.result)
      } else {
        context.commit('setError', 'getTransactions', request.error)
      }
    },

    getWalletInfos: async function(context) {
      const request = await this.$walletApi.getWalletInfos()
      if (request.result) {
        context.commit('setWalletInfos', { walletInfos: request.result.infos })
      } else {
        context.commit('setError', 'getWalletInfos', request.error)
      }
    },

    tryDataRequest: async function(context) {
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

// function generateRandomHex (length) {
//   let hex = '0x'

//   for (let i = 0; i < length; i++) {
//     hex = hex + Math.floor(Math.random() * Math.floor(16)).toString(16)
//   }

//   return hex
// }
