import axios from 'axios'
import * as FormData from 'form-data'
import router from '@/router'
import { WalletApi } from '@/api'
import {
  calculateTimeAgo,
  createNotification,
  cropString,
  encodeDataRequest,
  isSyncEvent,
  standardizeWitUnits,
  createDownloadableLink,
  createExportClaimingFileInfo,
  buildClaimingAddresses,
} from '@/utils'
import disclaimers from '@/claimingDisclaimers'
import reducedDisclaimers from '@/reducedClaimingDisclaimers'
import { UPDATE_TEMPLATE } from '@/store/mutation-types'
import {
  CLAIMING_EMAILS,
  GENERATE_ADDRESS_DELAY,
  SOURCES_WITH_REDUCED_DISCLAIMERS,
  WALLET_EVENTS,
  WIT_UNIT,
  GENESIS_EVENT_TIMESTAMP,
} from '@/constants'
import warning from '@/resources/svg/warning.png'

export default {
  state: {
    api: new WalletApi(),
    errors: {
      shutdown: null,
      signDisclaimer: null,
      seed: null,
      uploadFile: null,
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
    exportFileLink: '',
    checkTokenGenerationEventDate: new Date(GENESIS_EVENT_TIMESTAMP),
    claimingFileInfo: null,
    claimingProcessState: null,
    mainnetReady: false,
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
    currentTransactionsPage: 1,
    signedDisclaimers: {},
    disclaimers: {},
    witnetEmail: CLAIMING_EMAILS.DEFAULT,
    txLabels: {},
    walletInfos: null,
    walletLocked: false,
    validatedPassword: false,
    areMnemonicsValid: false,
    claimingAddresses: [],
    tokenGenerationEventOccurred:
      new Date(GENESIS_EVENT_TIMESTAMP) < new Date(),
  },
  getters: {
    network: state => {
      return state.status.node && state.status.node.network
    },
  },
  mutations: {
    setComputedVesting(state, computedVesting) {
      state.computedVesting = computedVesting
    },
    addAmountToClamingAddresses(state, addressesAmount) {
      const addresses = [...state.claimingAddresses]
      state.claimingAddresses = addressesAmount
        .map((amount, index) => {
          const timelock = Math.floor(
            state.computedVesting[index].date.getTime() / 1000,
          )
          return amount.map(y => {
            return {
              address: addresses.shift(),
              amount: y,
              timelock,
            }
          })
        })
        .reduce((acc, arr) => [...acc, ...arr])
    },
    setExportFileLink(state, link) {
      state.exportFileLink = link
    },
    setVesting(state, vesting) {
      state.vesting = vesting
    },
    setCurrentTransactionsPage(state, { page }) {
      state.currentTransactionsPage = page
    },
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
    setBalance(state, { balance }) {
      if (balance) {
        state.balance = {
          available: balance.unconfirmed.available.toString(),
          locked: balance.unconfirmed.locked.toString(),
          total: (
            balance.unconfirmed.available + balance.unconfirmed.locked
          ).toString(),
        }
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
    checkTokenGenerationEventDate(state) {
      const tokenGenerationEventDate = state.checkTokenGenerationEventDate
      const currentDate = new Date()
      if (tokenGenerationEventDate < currentDate) {
        state.tokenGenerationEventOccurred = true
      }
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
      const retrievePartialResults = !!result.result.retrieve[0].partial_results
      if (retrievePartialResults) {
        state.radRequestResult = { ...result, timestamp: Date.now() }
      } else {
        if (state.radRequestResult) {
          const lastUpdatedOperator =
            state.radRequestResult.result.retrieve[0].context.call_index + 1
          const radonError = result.result.retrieve[0].result
          const prevRequestPartialResult =
            state.radRequestResult.result.retrieve[0].partial_results
          if (prevRequestPartialResult) {
            state.radRequestResult.result.retrieve[0].result = radonError
            state.radRequestResult.result.retrieve[0].partial_results[
              lastUpdatedOperator
            ] = null
          } else {
            state.radRequestResult = { ...result, timestamp: Date.now() }
          }
        } else {
          const radonError = result.result.retrieve[0].result
          state.radRequestResult = { ...result, timestamp: Date.now() }
          state.radRequestResult.result.retrieve[0].result = radonError
        }
      }
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
    setClaimingInfo(state, { info }) {
      Object.assign(state, { claimingFileInfo: info })
      const source = state.claimingFileInfo.info.data.source
      const sourcesWithReducedDisclaimers = SOURCES_WITH_REDUCED_DISCLAIMERS
      if (sourcesWithReducedDisclaimers.includes(source)) {
        state.disclaimers = reducedDisclaimers
      } else {
        state.disclaimers = disclaimers
      }

      state.witnetEmail =
        CLAIMING_EMAILS[info.info.data.source.toUpperCase()] ||
        CLAIMING_EMAILS.DEFAULT
    },
    setDisclaimers(state, { result }) {
      state.signedDisclaimers = result
    },
    setClaimingState(state, { completed }) {
      Object.assign(state, { claimingProcessState: completed })
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
      if (
        error === 'Validation Error' ||
        name === 'uploadFile' ||
        name === 'seed'
      ) {
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
    clearClaimingInfo(state) {
      state.claimingFileInfo = null
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
    addClaimingAddress(state, { address }) {
      if (address) {
        state.claimingAddresses.push(address.address)
      }
    },
    validateMnemonics(state, { seed = '', mnemonics = '' }) {
      const validate = (s = '', m = '') => {
        return (
          s &&
          s.trim() ===
            m
              .trim()
              .split('')
              .slice(0, s.trim().length)
              .join('')
        )
      }

      if (validate(seed, mnemonics)) {
        state.areMnemonicsValid = true
      } else {
        state.areMnemonicsValid = false
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
      // don't handle the response in client because the wallet is being closed.
      // This is handled in background.js when 'exit' event is emitted
      context.state.api.shutdown({
        session_id: context.state.sessionId,
      })
    },
    async createAndSaveExportFileLink(context, amountByUnlockedDate) {
      const addresses = [...context.state.claimingAddresses]

      const claimingAddresses = buildClaimingAddresses(
        amountByUnlockedDate,
        context.state.vesting,
        addresses,
      )

      const fileInfo = createExportClaimingFileInfo(
        context.state.claimingFileInfo.info,
        claimingAddresses,
        context.state.signedDisclaimers,
      )

      const link = createDownloadableLink(fileInfo)

      const request = await context.state.api.saveItem({
        wallet_id: context.rootState.wallet.walletId,
        session_id: context.rootState.wallet.sessionId,
        key: `${context.rootState.wallet.walletId}_claiming_link`,
        value: { link },
      })

      if (request.result) {
        context.commit('setExportFileLink', link)
        context.dispatch('sendClaimingFile', fileInfo)
      } else {
        context.commit('setError', {
          name: 'getItem',
          error: request.error.message,
          message: 'An error occurred retrieving claiming file link',
        })
      }
    },
    async getExportFile(context) {
      const request = await context.state.api.getItem({
        wallet_id: context.rootState.wallet.walletId,
        session_id: context.rootState.wallet.sessionId,
        key: `${context.rootState.wallet.walletId}_claiming_link`,
      })
      if (request.result) {
        context.commit('setExportFileLink', request.result.value.link)
      } else {
        // TODO: improve errror handling
        context.commit('setError', {
          name: 'getItem',
          error: request.error.message,
          message: 'An error occurred retrieving the label for the transaction',
        })
      }
    },
    closeSession: async function(context) {
      const request = await context.state.api.closeSession({
        wallet_id: context.state.walletId,
        session_id: context.state.sessionId,
      })
      if (request.result) {
        context.commit('deleteSession')
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
        // TODO: improve error handling
        context.commit('setError', {
          name: 'getItem',
          error: request.error.message,
          message: 'An error occurred retrieving the label for the transaction',
        })
      }
    },
    getClaimingProcessState: function(context) {
      context.commit('setClaimingState', {
        completed: localStorage.getItem('completed'),
      })
    },
    getClaimingInfo: async function(context) {
      const request = await context.state.api.getItem({
        wallet_id: context.rootState.wallet.walletId,
        session_id: context.rootState.wallet.sessionId,
        key: `${context.rootState.wallet.walletId}_claiming_info`,
      })
      if (request.result) {
        context.commit('setClaimingInfo', { info: request.result.value || {} })
      } else {
        // TODO: improve error handling
        context.commit('setError', {
          name: 'getItem',
          error: request.error.message,
          message: 'An error occurred retrieving the claiming information',
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
    saveClaimingInfo: async function(context) {
      const claimingFileInfo = context.state.claimingFileInfo
      const request = await context.state.api.saveItem({
        wallet_id: context.rootState.wallet.walletId,
        session_id: context.rootState.wallet.sessionId,
        key: `${context.rootState.wallet.walletId}_claiming_info`,
        value: claimingFileInfo,
      })

      if (request.result) {
        console.log('claiming info saved!', request.result)
      } else {
        // TODO: improve error handling
        context.commit('setError', {
          name: 'saveItem',
          error: request.error.message,
          message: 'An error occurred saving the claiming information',
        })
      }
    },
    saveCompletedProcess: async function(context) {
      localStorage.setItem('completed', true)
      context.dispatch('getClaimingProcessState')
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
        // TODO: improve error handling
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
        fee: Number(
          standardizeWitUnits(
            parameters.fee,
            WIT_UNIT.NANO,
            context.state.currency,
          ),
        ),
        request: {
          data_request: encodeDataRequest(request),
          collateral: parameters.collateral,
          witness_reward: Number(
            standardizeWitUnits(
              parameters.rewardFee,
              WIT_UNIT.NANO,
              context.state.currency,
            ),
          ),
          witnesses: parameters.witnesses,
          commit_and_reveal_fee: Number(
            standardizeWitUnits(
              parameters.commitAndRevealFee,
              WIT_UNIT.NANO,
              context.state.currency,
            ),
          ),
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
          error: request.error.data[0][1],
          message: 'An error occurred creating a Value Transfer Transaction',
        })
      }
    },

    getAddresses: async function(context) {
      const request = await context.state.api.getAddresses({
        wallet_id: context.state.walletId,
        session_id: context.state.sessionId,
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
    // Despite the name of this method, this actually generates a single address.
    // This is only used for the claiming process.
    generateMultipleAddresses: async function(context) {
      const request = await context.state.api.generateAddress({
        label: '',
        wallet_id: context.state.walletId,
        session_id: context.state.sessionId,
        external: false,
      })

      if (request.result) {
        context.commit('addClaimingAddress', { address: request.result })
      } else {
        context.commit('setError', {
          name: 'generateAddress',
          error: request.error.message,
          message: 'An error occurred generating the address',
        })
      }
    },
    generateAddress: async function(context, { label, external = true }) {
      context.commit('generateAddressLoading', null, { root: true })

      const request = await context.state.api.generateAddress({
        label,
        wallet_id: context.state.walletId,
        session_id: context.state.sessionId,
        external,
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

    signData: async function(context) {
      const request = await context.state.api.signDisclaimers({
        wallet_id: context.state.walletId,
        session_id: context.state.sessionId,
        disclaimers: context.state.disclaimers,
      })
      if (request) {
        context.commit('setDisclaimers', { result: request })
      } else {
        context.commit('setError', {
          name: 'signDisclaimer',
          message: 'An error occurred signing the data',
        })
      }
    },

    validateImportedMnemonics: async function(context, params) {
      const request = await context.state.api.validateMnemonics({
        seed_source: 'mnemonics',
        seed_data: params.mnemonics,
      })
      if (request.result.valid) {
        console.log('Validated mnemonics', request.result.valid)
      } else {
        context.commit('setError', {
          name: 'seed',
          message: 'You must provide a valid seed to import a wallet',
        })
        router.push('/ftu/import-wallet')
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
        context.dispatch('getBalance')
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
        context.commit('setBalance', { balance: request.result })
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
        await context.dispatch('getTransactions', {
          limit: 50,
          page: context.state.currentTransactionsPage,
        })
        context.commit('setBalance', { balance: status.account.balance })
        context.dispatch('getAddresses')
        status.timestamp = Date.now()
      } else if (eventType === WALLET_EVENTS.MOVEMENT) {
        context.commit('setBalance', { balance: status.account.balance })
        context.dispatch('getTransactions', { limit: 50, page: 1 })
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
        await context.dispatch('getTransactions', {
          limit: 50,
          page: context.state.currentTransactionsPage,
        })
        await context.commit('setBalance', { balance: status.account.balance })
        await context.dispatch('getAddresses')
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
      } else if (
        eventType === WALLET_EVENTS.BLOCK_CONSOLIDATE ||
        eventType === WALLET_EVENTS.BLOCK_ORPHAN
      ) {
        context.commit('setBalance', { balance: status.account.balance })
        context.dispatch('getTransactions', {
          limit: 50,
          page: context.state.currentTransactionsPage,
        })
        context.dispatch('getAddresses')
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
    async sendClaimingFile(context, info) {
      const email = context.state.claimingFileInfo.info.data.emailAddress
      const fileName = `${email}-witnet-tokens-claim.json`
      const payload = JSON.stringify(info, null, 4)
      const blob = new Blob([payload], { type: 'application/json' })
      const file = new FormData()

      file.append('file', blob, fileName)

      const response = await axios.put(
        'https://claim.witnet.foundation/upload',
        file,
      )

      if (response && response.status === 201) {
        console.log('File successfully uploaded to the file')
      }
    },
  },
}
