import router from '@/router'
import { WalletApi } from '@/api'
import {
  calculateTimeAgo,
  createNotification,
  cropString,
  encodeDataRequest,
  isSyncEvent,
  standardizeWitUnits,
} from '@/utils'
import { UPDATE_TEMPLATE } from '@/store/mutation-types'
import { GENERATE_ADDRESS_DELAY, WALLET_EVENTS, WIT_UNIT } from '@/constants'
import warning from '@/resources/svg/warning.png'

export default {
  state: {
    api: new WalletApi(),
    errors: {
      shutdown: null,
      seed: null,
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
    currency: WIT_UNIT.NANO,
    balance: {},
    walletIdx: null,
    sessionId: null,
    walletId: null,
    addresses: [],
    generatedTransaction: null,
    mnemonics: null,
    seed: null,
    networkStatus: 'error',
    status: {
      progress: 0,
      timestamp: 0,
      synced: false,
    },
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
        ...transaction,
        timeAgo: calculateTimeAgo(transaction.timestamp),
      }))
    },
    setWalletIndex(state, { walletIndex }) {
      const walletInfos = state.walletInfos
      state.walletIdx = walletIndex === -1 ? walletInfos.length : walletIndex
      localStorage.setItem('walletIndex', state.walletIdx)
    },
    setLabels(state, { labels }) {
      state.txLabels = labels
    },
    setBalance(state, { total }) {
      state.balance = {
        total: standardizeWitUnits(total, state.currency),
        available: 0,
        locked: 0,
      }
    },
    changeCurrency(state) {
      const unitsValues = Object.values(WIT_UNIT)
      const unitsKeys = Object.keys(WIT_UNIT)
      // Get index of the next currency
      const index = (unitsValues.indexOf(state.currency) + 1) % 3
      state.currency = WIT_UNIT[unitsKeys[index]]
    },
    deleteSession(state) {
      state.sessionId = null
      state.walletId = null
    },
    checkNetworkStatus(state) {
      if (state.api.client.ws.ready) {
        state.networkStatus = 'synced'
        this.commit('clearError', { error: 'network' })
        if (state.errors.length) {
          state.errors.map(err =>
            this.commit('clearError', { error: err.name }),
          )
        }
      } else {
        state.networkStatus = 'error'
        if (state.networkStatus === 'error') {
          this.commit('setError', {
            name: 'network',
            error: 'The wallet or the node is not running properly',
            message: 'connection error',
          })
        }
      }
    },
    setDataRequestResult(state, { result }) {
      state.radRequestResult = { ...result, timestamp: Date.now() }
    },
    clearDataRequestResult(state) {
      state.radRequestResult = null
    },
    setSeed(state, result) {
      Object.assign(state, { seed: result })
    },
    setMnemonics(state, result) {
      Object.assign(state, { mnemonics: result })
    },
    setStatus(state, { status }) {
      state.status = status
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
      if (name === 'seed' || error === 'Validation Error') {
        state.errors[name] = {
          name,
          error,
          message,
        }
      } else {
        const socketNotReady = error === 'socket not ready'
        const networkStatusError = state.networkStatus === 'error'
        if (networkStatusError || socketNotReady) {
          return ''
        } else {
          // notification options
          const notificationProps = {
            title: error,
            body: message,
            icon: warning,
          }
          // create notification
          createNotification(notificationProps)
        }
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
    clearSeed(state) {
      state.seed = null
    },
    clearMnemonics(state) {
      state.mnemonics = null
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
          error: 'Validation Error',
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
          error: 'Validation Error',
          message: 'Passwords must match',
        })
        state.validatedPassword = false
      } else {
        state.validatedPassword = true
      }
    },
    setAddresses(state, { addresses }) {
      if (addresses) {
        state.addresses = addresses.reverse()
      }
    },
  },
  actions: {
    startTransactionDateSync(context) {
      if (!this.transactionSync) {
        this.transactionSync = setInterval(() => {
          context.commit('setTransactions', {
            transactions: context.state.transactions,
          })
        }, 15000)
      }
    },
    stopTransactionDateSync(context) {
      clearInterval(this.transactionSync)
    },
    shutdown: async function(context) {
      await context.state.api.shutdown({
        session_id: context.state.sessionId,
      })
    },
    closeSession: async function(context) {
      const request = await context.state.api.closeSession({
        wallet_id: context.state.walletId,
        session_id: context.state.sessionId,
      })
      if (request.result) {
        router.push('/welcome-back/wallet-list')
      } else {
        context.commit('setError', {
          name: 'closeSession',
          error: request.error.message,
          message: 'An error occurred trying to close the session',
        })
      }
    },
    getLabels: async function(context) {
      const request = await context.state.api.getItem({
        wallet_id: context.rootState.wallet.walletId,
        session_id: context.rootState.wallet.sessionId,
        key: `${context.rootState.wallet.walletId}_labels`,
      })
      if (request.result) {
        context.commit('setLabels', { labels: request.result.value || {} })
      } else {
        // TODO1: handle error properly
        context.commit('setError', {
          name: 'getItem',
          error: request.error.message,
          message: 'An error occurred retrieving the label for the transaction',
        })
      }
    },
    sendTransaction: async function(context, { label }) {
      const transactionToSend = context.state.generatedTransaction
      const request = await context.state.api.sendTransaction({
        wallet_id: context.state.walletId,
        session_id: context.state.sessionId,
        transaction: transactionToSend.transaction,
      })
      if (request.result) {
        console.log('----- Template deployed successfully -----')
        context.dispatch('saveLabel', { label, transaction: transactionToSend })
        context.commit('clearGeneratedTransaction')
        createNotification({
          title: 'Transaction succesfully sent',
          body: `The transaction ${cropString(
            transactionToSend.transaction_id,
            12,
            'middle',
          )} has been sent succesfully into the Witnet network.\nIt should be written into a block soon.`,
        })
      } else {
        context.commit('setError', {
          name: 'sendTransaction',
          error: request.error.message,
          message: 'An error occurred sending a request',
        })
        context.commit('clearGeneratedTransaction')
      }
    },
    saveLabel: async function(context, { label, transaction }) {
      const transactionId = transaction.transactionId
      context.state.txLabels[transactionId] = { label }
      const txLabels = context.state.txLabels
      const request = await context.state.api.saveItem({
        wallet_id: context.rootState.wallet.walletId,
        session_id: context.rootState.wallet.sessionId,
        key: `${context.rootState.wallet.walletId}_labels`,
        value: txLabels,
      })
      if (request.result) {
        console.log('label saved!', request.result)
      } else {
        // TODO1: handle error propery
        context.commit('setError', {
          name: 'saveItem',
          error: request.error.message,
          message: 'An error occurred saving the label for your transaction',
        })
      }
    },
    createDataRequest: async function(context, { label, parameters, request }) {
      const data = {
        session_id: this.state.wallet.sessionId,
        wallet_id: this.state.wallet.walletId,
        label,
        fee: standardizeWitUnits(
          parameters.fee,
          WIT_UNIT.NANO,
          context.state.currency,
        ),
        request: {
          data_request: encodeDataRequest(request),
          collateral: parameters.collateral,
          witness_reward: parameters.rewardFee,
          witnesses: parameters.witnesses,
          commit_fee: parameters.commitFee,
          reveal_fee: parameters.revealFee,
          tally_fee: parameters.tallyFee,
          min_consensus_percentage: parameters.minConsensusPercentage,
        },
      }

      const req = await context.state.api.createDataRequest(data)
      if (req.result) {
        const generatedTransaction = req.result
        context.commit('setGeneratedTransaction', {
          transaction: generatedTransaction,
        })
      } else {
        context.commit('setError', {
          name: 'createDataRequest',
          error: req.error.message,
          message: 'An error occurred deploying a data request',
        })
      }
    },

    createVTT: async function(context, { address, amount, fee, label }) {
      const request = await context.state.api.createVTT({
        session_id: this.state.wallet.sessionId,
        wallet_id: this.state.wallet.walletId,
        address,
        amount: parseInt(
          standardizeWitUnits(amount, WIT_UNIT.NANO, context.state.currency),
        ),
        fee: parseInt(
          standardizeWitUnits(fee, WIT_UNIT.NANO, context.state.currency),
        ),
        label,
      })
      if (request.result) {
        const generatedTransaction = request.result
        context.commit('setGeneratedTransaction', {
          transaction: generatedTransaction,
        })
      } else {
        context.commit('setError', {
          name: 'createVTT',
          error: request.error.message,
          message: 'An error occurred creating a Value Transfer Transaction',
        })
      }
    },

    getAddresses: async function(context) {
      const request = await context.state.api.getAddresses({
        wallet_id: context.state.walletId,
        session_id: context.state.sessionId,
        limit: 300,
      })
      if (request.result) {
        context.commit('setAddresses', { addresses: request.result })
        this.commit('clearError', { error: 'getAddresses' })
      } else {
        context.commit('setError', {
          name: 'getAddresses',
          error: request.error.message,
          message: 'An error occurred retrieving the addresses list',
        })
      }
    },

    generateAddress: async function(context, { label }) {
      context.commit('generateAddressLoading', null, { root: true })

      const request = await context.state.api.generateAddress({
        label,
        wallet_id: context.state.walletId,
        session_id: context.state.sessionId,
      })
      if (request.result) {
        // Delay to get a smoother flow
        setTimeout(() => {
          context.dispatch('getAddresses')
        }, GENERATE_ADDRESS_DELAY)
      } else {
        context.commit('setError', {
          name: 'generateAddress',
          error: request.error.message,
          message: 'An error occurred generating the address',
        })
      }
    },

    unlockWallet: async function(context, { walletId, password }) {
      context.commit('deleteSession')
      const request = await context.state.api.unlockWallet({
        wallet_id: walletId,
        password,
        session_id: '1',
        prefill: [1000, 2000, 3000],
      })
      if (request.result) {
        // TODO(#706) We should receive a wallet structure instead a walletId
        context.commit('setWallet', {
          sessionId: request.result.session_id,
          walletId,
        })
        const walletInfos = context.state.walletInfos
        const index = walletInfos.findIndex(wallet => wallet.id === walletId)
        context.commit('setWalletIndex', { walletIndex: index })
        // Redirect to wallet list when the session has expired
        setTimeout(() => {
          router.push('/welcome-back/wallet-list')
        }, request.result.session_expiration_secs * 1000)
        context.dispatch('subscribeToWalletNotifications')
      } else {
        context.commit('setError', {
          name: 'unlockWallet',
          error: request.error.message,
        })
      }
    },

    lockWallet: async function(context, { walletId, wipe }) {
      const request = await context.state.api.lockWallet({
        wallet_id: walletId,
        wipe,
      })
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
          error: request.error.message,
          message: 'An error occurred creating the mnemonics',
        })
      }
    },

    createWallet: async function(context, params) {
      const request = await context.state.api.createWallet({
        name: 'first',
        caption: '1',
        seed_data: params[params.sourceType],
        seed_source: params.sourceType,
        password: params.password,
      })
      if (request.result) {
        context.dispatch('unlockWallet', {
          walletId: request.result.wallet_id,
          password: params.password,
        })
        context.commit('clearSeed')
        context.commit('clearMnemonics')
      } else {
        context.commit('setError', {
          name: 'createWallet',
          error: request.error.data[0][1],
          message: 'An error occurred creating the wallet',
        })
        router.push('/ftu/import-wallet')
      }
    },

    getTransactions: async function(context, { limit, page }) {
      const request = await context.state.api.getTransactions({
        wallet_id: context.state.walletId,
        session_id: context.state.sessionId,
        limit,
        page,
      })

      if (request.result) {
        context.commit('setTransactions', { transactions: request.result })
        this.commit('clearError', { error: 'getTransactions' })
      } else {
        context.commit('setError', {
          name: 'getTransactions',
          error: request.error.message,
          message: 'An error occurred getting the transactions',
        })
      }
    },

    getBalance: async function(context) {
      const request = await context.state.api.getBalance({
        wallet_id: context.state.walletId,
        session_id: context.state.sessionId,
      })
      if (request.result) {
        context.commit('setBalance', request.result)
        this.commit('clearError', { error: 'getBalance' })
      } else {
        if (request.error.message === 'Unauthorized') {
          context.commit('deleteSession')
          router.push('/welcome-back/wallet-list')
        } else {
          context.commit('setError', {
            name: 'getBalance',
            error: request.error.message,
            message: 'An error occurred getting the balance',
          })
        }
      }
    },
    getWalletInfos: async function(context) {
      const request = await context.state.api.getWalletInfos()
      if (request.result) {
        context.commit('setWalletInfos', { walletInfos: request.result.infos })
      } else {
        context.commit('setError', {
          name: 'getWalletInfos',
          error: request.error.message,
          message: 'An error occurred trying to get the wallet info',
        })
      }
    },
    subscribeToWalletNotifications: async function(context) {
      await context.state.api.subscribeToNotifications(
        { session_id: this.state.wallet.sessionId },
        ([notifications]) => {
          if (notifications.events.length > 0) {
            for (const event of notifications.events) {
              context.dispatch('processEvent', {
                event,
                status: notifications.status,
              })
            }
          } else {
            context.dispatch('processStatus', notifications.status)
          }
        },
      )
    },
    unsubscribeFromWalletNotifications: async function(context) {
      await context.state.api.unsubscribeFromNotifications({
        session_id: this.state.wallet.sessionId,
      })
    },
    tryDataRequest: async function(context) {
      context.commit('generateRadRequestResultLoading', { root: true })
      context.rootState.rad.currentTemplate.usedVariables.forEach(variable => {
        const id = variable.id
        const value = variable.value
        context.commit(UPDATE_TEMPLATE, { id, value })
      })
      const request = await context.state.api.runRadRequest({
        rad_request: encodeDataRequest(
          context.rootState.rad.currentRadonMarkupInterpreter.getMir(),
        ),
      })
      if (request.result) {
        context.commit('setDataRequestResult', { result: request.result })
        context.commit('clearGenerateRadRequestResultLoading', { root: true })
      } else {
        context.commit('setError', {
          name: 'tryDataRequest',
          error: request.error.message,
          message: 'An error occurred trying your data request',
        })
      }
      context.rootState.rad.currentTemplate.usedVariables.forEach(variable => {
        const id = variable.id
        const key = variable.variable
        context.commit(UPDATE_TEMPLATE, { id, value: '$' + key })
      })
    },

    processEvent: async function(context, rawEvent) {
      const eventType = Object.keys(rawEvent.event)[0]
      const event = rawEvent.event[eventType]
      const status = rawEvent.status

      if (eventType === WALLET_EVENTS.BLOCK) {
        status.timestamp = Date.now()
      } else if (eventType === WALLET_EVENTS.MOVEMENT) {
        context.commit('setBalance', { total: status.account.balance })
        context.dispatch('getTransactions', { limit: 50, page: 0 })
        context.dispatch('getAddresses')
        const amount = standardizeWitUnits(event.amount, context.state.currency)
        const balance = standardizeWitUnits(
          context.state.balance.total,
          context.state.currency,
        )
        if (event.type === 'POSITIVE') {
          createNotification({
            title: `Received a payment of ${amount} ${context.state.currency}s`,
            body: `The total balance of your wallet is now ${balance} ${context.state.currency}s.`,
          })
        }
      } else if (eventType === WALLET_EVENTS.SYNC_FINISH) {
        status.progress = 100
        const [start, finish] = event

        if (finish > start) {
          createNotification({
            title: 'Completed Wallet Synchronization',
            body: `Synchronized ${finish -
              start} blocks in total.\nYour wallet is now synchronized to the latest block in the chain (#${finish}).`,
          })
        }
      } else if (eventType === WALLET_EVENTS.SYNC_PROGRESS) {
        const [start, current, finish] = event
        status.progress =
          Math.floor(((current - start) / (finish - start)) * 100) || 0
      } else if (eventType === WALLET_EVENTS.SYNC_START) {
        const [start, finish] = event
        status.progress = 0
        if (finish - start > 100) {
          createNotification({
            title: 'Starting Wallet Synchronization',
            body: `Will synchronize ${finish -
              start} blocks in total, starting with block #${start} up to the latest block in the chain (#${finish}).`,
          })
        }
      }
      status.rawEventType = eventType

      context.dispatch('processStatus', status)
    },

    processStatus: async function(context, status) {
      if (isSyncEvent(status.rawEventType)) {
        status.synced = status.rawEventType === WALLET_EVENTS.SYNC_FINISH
      }

      if (status.synced) {
        status.timestamp = Date.now()
      }
      context.commit('setStatus', {
        status: { ...this.state.wallet.status, ...status },
      })
    },
  },
}
