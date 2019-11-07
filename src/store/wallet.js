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
      createVTT: null,
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
  },
  mutations: {
    setTransactions(state, { transactions }) {
      state.transactions = transactions
      console.log('setTransactions---->', state.transactions)
    },
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

    setError(state, { name, error, message }) {
      state.errors[name] = {
        name,
        error,
        message,
      }
    },

    clearError(state, { error }) {
      state.errors[error] = null
    },

    setGeneratedTransaction(state, { transaction }) {
      state.generatedTransaction = transaction
    },
    setAddresses(state, { addresses, address }) {
      const addressesMap = new Map([])
      const addAddress = addr => addressesMap.set(addr.address, addr)
      state.addresses.map(addAddress)

      if (addresses) {
        addresses.map(addAddress)
      }

      if (address) {
        addAddress(address)
      }
      state.addresses = Array.from(addressesMap.values())
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
      }
    },

    sendTransaction: async function(context) {
      const request = await this.$walletApi.sendTransaction({
        walletId: context.state.walletId,
        sessionId: context.state.sessionId,
        transaction: context.state.generatedTransaction,
        transactionId: context.state.generatedTransaction.transactionId,
      })

      if (request.result) {
        context.commit('setSuccess', 'sendTransaction')
      }
    },

    createVTT: async function(context, { address, amount, fee, label }) {
      const request = await this.$walletApi.createVTT({
        sessionId: this.state.wallet.sessionId,
        walletId: this.state.wallet.walletId,
        address,
        amount: parseInt(amount),
        fee,
        label,
      })
      if (request.result) {
        const generatedTransaction = {
          bytes: request.result.bytes,
          transactionId: request.result.transactionId,
          inputs: request.result.transaction.ValueTransfer.body.inputs.map(
            input => input.output_pointer
          ),
          outputs: request.result.transaction.ValueTransfer.body.outputs,
          signature: request.result.transaction.ValueTransfer.signatures.map(
            signature => signature.public_key.bytes
          ),
          type: 'Value Transfer Transaction',
          // TODO: The following fields have to come from the wallet.
          //  They will implement a way to provide them in the future.
          to: address,
          amount,
          fee,
        }
        context.commit('setGeneratedTransaction', { transaction: generatedTransaction })
      } else {
        context.commit('setError', {
          name: 'createVTT',
          error: request.error,
          message: 'An error occurred creating a Value Transfer Transaction',
        })
      }
    },

    getAddresses: async function(context) {
      const request = await this.$walletApi.getAddresses({
        walletId: context.state.walletId,
        sessionId: context.state.sessionId,
      })

      if (request.result) {
        context.commit('setAddresses', { addresses: request.result.addresses })
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

    getTransactions: async function(context, { limit, page }) {
      const request = await this.$walletApi.getTransactions({
        walletId: context.state.walletId,
        sessionId: context.state.sessionId,
        limit,
        page,
      })
      if (request.result) {
        context.commit('setTransactions', { transactions: request.result.transactions })
      } else {
        context.commit('setError', { name: 'getTransactions', error: request.error })
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
      const request = await this.$walletApi.runRadRequest({
        radRequest: encodeDataRequest(context.rootState.rad.currentRadonMarkupInterpreter.getMir()),
      })
      if (request.result) {
        context.commit('setDataRequestResult', { dataRequest: request.result })
      } else {
        context.commit('setError', { name: 'tryDataRequest', error: request.error })
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
