import router from '@/router'
import { WalletApi } from '@/api'
import { addToList, encodeDataRequest } from '@/utils'

export default {
  state: {
    api: new WalletApi(),
    errors: {
      createMnemonics: null,
      createWallet: null,
      generateAddress: null,
      createValidPassword: null,
      mnemonics: null,
      getTransactions: null,
      getBalance: null,
      getWalletInfos: null,
      lockWallet: null,
      sendTransaction: null,
      tryDataRequest: null,
      unlockWallet: null,
      createVTT: null,
      createDataRequest: null,
      closeSession: null,
      getAddresses: null,
      network: null,
      saveItem: null,
      getItem: null,
    },
    balances: {},
    sessionId: null,
    walletId: null,
    addresses: [],
    generatedTransaction: null,
    mnemonics: null,
    networkStatus: 'error',
    radRequestResult: null,
    transactions: [],
    txLabels: {},
    walletInfos: null,
    walletLocked: false,
    validatedPassword: false,
    validatedMnemonics: false,
  },
  mutations: {
    setTransactions(state, { transactions }) {
      state.transactions = transactions.map(transaction => ({
        id: transaction.hex_hash,
        address: '',
        amount: transaction.value,
        block: transaction.block ? transaction.block.epoch : 'PENDING',
        date: new Date(transaction.timestamp).toISOString(),
        label: addToList(transaction.hex_hash, state.txLabels, 'label'),
      }))
    },
    setLabels(state, { labels }) {
      state.txLabels = labels
    },
    setBalances(state, { balances }) {
      state.balances = balances
    },
    deleteSession(state) {
      state.sessionId = null
      state.walletId = null
    },
    checkNetworkStatus(state) {
      if (state.api.client.ws.ready) {
        state.networkStatus = 'synced'
      } else {
        state.networkStatus = 'error'
        this.commit('setError', {
          name: 'network',
          error: 'The wallet or the node is not running properly',
          message: 'connection error',
        })
      }
    },
    setDataRequestResult(state, { result }) {
      state.radRequestResult = { ...result, timestamp: Date.now() }
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
    clearGeneratedTransaction(state) {
      state.generatedTransaction = null
    },
    addAddress(state, { address }) {
      if (address) {
        state.addresses.add(address)
      }
    },
    validateMnemonics(state, { seed, mnemonics }) {
      if (seed && seed.trim() === mnemonics.trim()) {
        state.validatedMnemonics = true
      } else {
        this.commit('setError', {
          name: 'mnemonics',
          message: 'Mnemonics must match',
        })
        state.validatedMnemonics = false
      }
    },
    validatePassword(state, { password, repeatPassword }) {
      if (password.length < 8) {
        this.commit('setError', {
          name: 'createValidPassword',
          message: 'Password must be at least 8 characters',
        })
        state.validatedPassword = false
      } else if (password !== repeatPassword) {
        this.commit('setError', {
          name: 'createValidPassword',
          message: 'Passwords must match',
        })
        state.validatedPassword = false
      } else {
        state.validatedPassword = true
      }
    },
    setAddresses(state, { addresses }) {
      if (addresses) {
        state.addresses = addresses
        state.addresses = new Set(addresses)
      }
    },
  },
  actions: {
    closeSession: async function(context) {
      const request = await context.state.api.closeSession({
        walletId: context.state.walletId,
        sessionId: context.state.sessionId,
      })
      if (request.result) {
        context.commit('deleteSession')
        router.push('/welcome-back/wallet-list')
      } else {
        context.commit('setError', {
          name: 'closeSession',
          error: request.error,
          message: 'An error occurred trying to close the session',
        })
      }
    },
    getLabels: async function(context) {
      const request = await context.state.api.getItem({
        walletId: context.rootState.wallet.walletId,
        sessionId: context.rootState.wallet.sessionId,
        key: `${context.rootState.wallet.walletId}_labels`,
      })
      if (request.result) {
        context.commit('setLabels', { labels: request.result.value || {} })
      } else {
        // TODO1: handle error properly
        context.commit('setError', {
          name: 'getItem',
          error: request.error,
          message: 'An error occurred retrieving the label for the transaction',
        })
      }
    },
    sendTransaction: async function(context, { label }) {
      const transactionToSend = context.state.generatedTransaction
      const request = await context.state.api.sendTransaction({
        walletId: context.state.walletId,
        sessionId: context.state.sessionId,
        transaction: context.state.generatedTransaction.transaction,
      })
      if (request.result) {
        context.dispatch('saveLabel', { label, transaction: transactionToSend })
        // context.commit('setSuccess', 'sendTransaction')
      } else {
        context.commit('setError', {
          name: 'sendTransaction',
          error: request.error,
          message: 'An error occurred sending a request',
        })
      }
    },
    saveLabel: async function(context, { label, transaction }) {
      const transactionId = transaction.transactionId
      context.state.txLabels[transactionId] = { label }
      const txLabels = context.state.txLabels
      const request = await context.state.api.saveItem({
        walletId: context.rootState.wallet.walletId,
        sessionId: context.rootState.wallet.sessionId,
        key: `${context.rootState.wallet.walletId}_labels`,
        value: txLabels,
      })
      if (request.result) {
        console.log('label saved!', request.result)
      } else {
        // TODO1: handle error propery
        context.commit('setError', {
          name: 'saveItem',
          error: request.error,
          message: 'An error occurred saving the label for your transaction',
        })
      }
    },
    createDataRequest: async function(context, { label, fee, dataRequest }) {
      const request = await context.state.api.createDataRequest({
        sessionId: this.state.wallet.sessionId,
        walletId: this.state.wallet.walletId,
        label,
        fee,
        dataRequest,
      })
      if (request.result) {
        const generatedTransaction = request.result
        context.commit('setGeneratedTransaction', { transaction: generatedTransaction })
      } else {
        context.commit('setError', {
          name: 'createDataRequest',
          error: request.error,
          message: 'An error occurred deploying a data request',
        })
      }
    },

    createVTT: async function(context, { address, amount, fee, label }) {
      const request = await context.state.api.createVTT({
        sessionId: this.state.wallet.sessionId,
        walletId: this.state.wallet.walletId,
        address,
        amount: parseInt(amount),
        fee,
        label,
      })
      if (request.result) {
        const generatedTransaction = request.result
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
      const request = await context.state.api.getAddresses({
        walletId: context.state.walletId,
        sessionId: context.state.sessionId,
        limit: 300,
      })
      if (request.result) {
        context.commit('setAddresses', { addresses: request.result.addresses })
      } else {
        context.commit('setError', {
          name: 'getAddresses',
          error: request.error,
          message: 'An error occurred retrieving the addresses list',
        })
      }
    },

    generateAddress: async function(context, { label }) {
      const request = await context.state.api.generateAddress({
        label,
        walletId: context.state.walletId,
        sessionId: context.state.sessionId,
      })
      if (request.result) {
        context.commit('addAddress', { address: request.result })
      } else {
        context.commit('setError', {
          name: 'generateAddress',
          error: request.error,
          message: 'An error occurred generating the address',
        })
      }
    },

    unlockWallet: async function(context, { walletId, password }) {
      const request = await context.state.api.unlockWallet({ walletId, password, sessionId: '1' })
      if (request.result) {
        // TODO(#706) We should receive a wallet structure instead a walletId
        context.commit('setWallet', { sessionId: request.result.sessionId, walletId })
      } else {
        context.commit('setError', { name: 'unlockWallet', error: request.error })
      }
    },

    lockWallet: async function(context, { walletId, wipe }) {
      const request = await context.state.api.lockWallet({ wallet_id: walletId, wipe })
      if (request.result) {
        context.commit('lockWallet', context.store.wallet.id)
      } else {
        context.commit('setError', 'lockWallet', request.error)
      }
    },

    createMnemonics: async function(context) {
      const request = await context.state.api.createMnemonics({ length: 12 })
      if (request.result) {
        context.commit('setMnemonics', request.result.mnemonics)
      } else {
        context.commit('setError', {
          name: 'createMnemonics',
          error: request.error,
          message: 'An error occurred creating the mnemonics',
        })
      }
    },

    createWallet: async function(context, params) {
      const request = await context.state.api.createWallet({
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
        context.commit('setError', {
          name: 'createWallet',
          error: request.error.data[0][1],
          message: 'An error occurred creating the wallet',
        })
      }
    },

    getTransactions: async function(context, { limit, page }) {
      const request = await context.state.api.getTransactions({
        walletId: context.state.walletId,
        sessionId: context.state.sessionId,
        limit,
        page,
      })
      if (request.result) {
        context.commit('setTransactions', { transactions: request.result.transactions })
      } else {
        context.commit('setError', {
          name: 'getTransactions',
          error: request.error,
          message: 'An error occurred getting the transactions',
        })
      }
    },

    getBalance: async function(context) {
      const request = await context.state.api.getBalance({
        walletId: context.state.walletId,
        sessionId: context.state.sessionId,
      })
      if (request.result) {
        context.commit('setBalances', { balances: request.result })
      } else {
        context.commit('setError', {
          name: 'getBalance',
          error: request.error,
          message: 'An error occurred getting the balance',
        })
      }
    },

    getWalletInfos: async function(context) {
      const request = await context.state.api.getWalletInfos()
      if (request.result) {
        context.commit('setWalletInfos', { walletInfos: request.result.infos })
      } else {
        context.commit('setError', {
          name: 'getWalletInfos',
          error: request.error,
          message: 'An error occurred trying to get the wallet info',
        })
      }
    },
    subscribeToWalletNotifications: async function(context) {
      context.state.api.subscribeToNotifications(
        { sessionId: this.state.wallet.sessionId },
        notification =>
          context.commit('setBalances', {
            balances: { total: notification[0].accountBalance.amount },
          })
      )
    },
    tryDataRequest: async function(context) {
      context.rootState.rad.currentTemplate.usedVariables.forEach(variable => {
        const id = variable.id
        const value = variable.value
        context.commit('updateTemplate', { id, value })
      })

      const request = await context.state.api.runRadRequest({
        radRequest: encodeDataRequest(context.rootState.rad.currentRadonMarkupInterpreter.getMir()),
      })
      if (request.result) {
        context.commit('setDataRequestResult', { result: request.result })
      } else {
        context.commit('setError', {
          name: 'tryDataRequest',
          error: request.error,
          message: 'An error occurred trying your data request',
        })
      }
      context.rootState.rad.currentTemplate.usedVariables.forEach(variable => {
        const id = variable.id
        const key = variable.variable
        context.commit('updateTemplate', { id, value: '$' + key })
      })
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
