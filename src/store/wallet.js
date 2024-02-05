import { api, eventProcessor } from '@/main'
import router from '@/router'
import { LocalStorageWrapper, standardizeBalance } from '@/api'
import {
  calculateTimeAgo,
  createNotification,
  cropString,
  encodeDataRequest,
  standardizeWitUnits,
} from '@/utils'
import SyncingTimeEstimator from '@/services/SyncingTimeEstimator'
import formatMillisecondsDuration from '@/services/format/formatMillisecondsDuration'
import { buildImportWalletBirthdate } from '@/services/birthDate'
import {
  DEFAULT_WIT_UNIT,
  DEFAULT_THEME,
  GENESIS_EVENT_TIMESTAMP,
  GENERATE_ADDRESS_DELAY,
  WALLET_EVENTS,
  WIT_UNIT,
  TRANSACTIONS_LIMIT,
  NOTIFICATIONS,
  DEFAULT_LOCALE,
  LANGUAGES,
  THEMES,
  DR_DEFAULT_VALUES,
  NETWORK_STATUS,
  VTT_DEFAULT_VALUES,
} from '@/constants'
import { SET_TEMPLATES, UPDATE_TEMPLATE } from '@/store/mutation-types'
import warning from '@/resources/svg/warning.png'
import i18n from '@/plugins/i18n'
const { t, locale } = i18n.global

export default {
  state: {
    localStorage: new LocalStorageWrapper(),
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
      xprv: null,
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
      nodeSync: false,
      updateWallet: null,
      getFeeEstimationReport: null,
    },
    repeatedWallet: null,
    exportFileLink: '',
    checkTokenGenerationEventDate: new Date(GENESIS_EVENT_TIMESTAMP),
    mainnetReady: false,
    theme: null,
    unit: DEFAULT_WIT_UNIT,
    locale: DEFAULT_LOCALE,
    prevUnit: DEFAULT_WIT_UNIT,
    balance: {},
    walletIdx: null,
    sessionId: null,
    sessionExtended: false,
    feeEstimationReport: null,
    selectedFee: {},
    walletId: null,
    addresses: [],
    generatedTransaction: null,
    transactionOptions: null,
    vttValues: { ...VTT_DEFAULT_VALUES },
    drValues: { ...DR_DEFAULT_VALUES },
    mnemonics: null,
    xprv: null,
    xprvBackupPassword: null,
    seed: null,
    networkStatus: 'error',
    notifications: {
      [NOTIFICATIONS.BLOCK]: false,
      [NOTIFICATIONS.TRANSACTIONS]: true,
      [NOTIFICATIONS.PAYMENTS]: true,
      [NOTIFICATIONS.SYNCRONIZATION]: true,
    },
    status: {
      currentState: NETWORK_STATUS.WAITING_FOR_NODE_TO_SYNC,
      progress: null,
      lastBlock: null,
      lastSync: null,
      lastBlockTimestamp: null,
      address: null,
      isNodeSynced: false,
      balance: null,
      network: 'mainnet',
    },
    syncingTimeEstimator: new SyncingTimeEstimator(),
    description: '',
    title: '',
    updatedDescription: '',
    updatedTitle: '',
    radRequestResult: null,
    transactions: [],
    transactionsLength: '0',
    currentTransactionsPage: 1,
    txLabels: {},
    walletInfos: null,
    walletLocked: false,
    validatedPassword: false,
    fileInfo: null,
    areMnemonicsValid: false,
    isXprvValid: false,
    tokenGenerationEventOccurred:
      new Date(GENESIS_EVENT_TIMESTAMP) < new Date(),
    isDefaultWallet: false,
    sessionTimeout: null,
    sessionExpirationSecs: null,
    sessionWillExpireSoon: false,
    willExpireSoonTimeout: null,
    birthDate: 'current',
  },
  getters: {
    network: state => state.status.network,
    unlockedWallet: state => {
      return Number.isInteger(state.walletIdx)
        ? state.walletInfos[state.walletIdx]
        : null
    },
    estimatedTimeOfSync: state => {
      return formatMillisecondsDuration(state.syncingTimeEstimator.calculate())
    },
  },
  mutations: {
    clearUpdatedWallet(state) {
      state.updatedName = ''
      state.updatedDescription = ''
    },
    setUpdatedWallet(state) {
      state.description = state.updatedDescription
    },
    setExpirationSecs(state, { secs }) {
      state.sessionExpirationSecs = secs
    },
    setWalletOwner(status, { isDefaultWallet }) {
      status.isDefaultWallet = isDefaultWallet
    },
    setStatus(state, status) {
      state.status = status
    },
    stopSyncEstimator(state) {
      state.syncingTimeEstimator.reset()
    },
    startSyncEstimator(state) {
      state.syncingTimeEstimator.start(Date.now())
    },
    toggleNotification(state, name) {
      state.notifications[name] = !state.notifications[name]
      state.localStorage.setNotificationsSettings(state.notifications)
    },
    toggleTheme(state) {
      if (state.theme === THEMES.DARK) {
        state.theme = THEMES.LIGHT
      } else {
        state.theme = THEMES.DARK
      }
      state.localStorage.setThemeSettings(state.theme)
    },
    setUnit(state, unit) {
      state.unit = unit
    },
    setLanguage(state, { locale }) {
      if (locale) {
        state.locale = locale
        locale.value = LANGUAGES[state.locale].locale
      } else {
        state.locale = LANGUAGES[locale].locale
      }
    },
    setTheme(state, theme) {
      if (theme === THEMES.LIGHT) {
        state.theme = THEMES.LIGHT
      } else {
        state.theme = THEMES.DARK
      }
      document.documentElement.setAttribute('theme', state.theme)
    },
    setNotifications(state, notifications) {
      state.notifications = notifications
    },
    addSyncEstimatorSample(state, { current, finish }) {
      state.syncingTimeEstimator.addSample({
        currentBlock: current,
        lastBlock: finish,
      })
    },
    setRepeatedWallet(state, payload) {
      state.repeatedWallet = payload.exist
    },
    setWalletDescription(state, payload) {
      // set title and description when received
      Object.entries(payload).forEach(entry => {
        state[entry[0]] = entry[1]
      })
    },
    clearXprvInfo(state) {
      state.xprv = null
      state.fileInfo = null
    },
    clearXprvBackupPassword(state) {
      state.xprvBackupPassword = null
    },
    setComputedVesting(state, computedVesting) {
      state.computedVesting = computedVesting
    },
    setFeeEstimationReport(state, report) {
      state.feeEstimationReport = report
    },
    clearEstimationReport(state) {
      state.feeEstimationReport = null
    },
    setSelectedFee(state, { fee }) {
      state.selectedFee = fee
    },
    clearSelectedFee(state) {
      state.selectedFee = {}
    },
    setXprvInfo(state, info) {
      if (info.data.name) {
        state.title = info.data.name
      }
      if (info.data.description) {
        state.description = info.data.description
      }

      state.fileInfo = info
    },
    setExportFileLink(state, link) {
      state.exportFileLink = link
    },
    setVesting(state, vesting) {
      state.vesting = vesting
    },
    setTransactions(state, { transactions, total }) {
      state.transactionsLength = total
      state.transactions = transactions.map(transaction => ({
        ...transaction,
        timeAgo: calculateTimeAgo(transaction.timestamp, locale.value),
      }))
    },
    setWalletIndex(state, { walletIndex }) {
      const walletInfos = state.walletInfos
      if (walletInfos.length > 0) {
        state.walletIdx =
          walletIndex === -1 ? walletInfos.length - 1 : walletIndex
      } else {
        state.walletIdx = 0
      }
      state.localStorage.setWalletIndex(state.walletIdx)
    },
    setLabels(state, { labels }) {
      state.txLabels = labels
    },
    setBalance(state, { balance }) {
      if (balance) {
        state.balance = balance
      }
    },
    setInitialLocale(state) {
      const localeFromStorage = state.localStorage.getLanguageSettings()
      if (localeFromStorage) {
        locale.value = localeFromStorage
      } else {
        const isLocalLanguage = Object.values(LANGUAGES).find(
          language => language.locale === locale.value,
        )
        locale.value = isLocalLanguage ? locale.value : 'en'
      }
    },
    changeDefaultUnit(state, unit) {
      if (Object.values(WIT_UNIT).includes(unit)) {
        state.unit = unit
        state.localStorage.setUnitSettings(state.unit)
      } else {
        console.warn('[mutation setUnit]: invalid unit')
      }
    },
    changeUnit(state) {
      const unitsValues = Object.values(WIT_UNIT)
      const unitsKeys = Object.keys(WIT_UNIT)
      // Get index of the next unit
      state.prevUnit = state.unit
      const index = (unitsValues.indexOf(state.unit) + 1) % unitsValues.length
      state.unit = WIT_UNIT[unitsKeys[index]]
    },
    deleteSession(state) {
      state.sessionId = null
      state.walletId = null
      state.title = ''
      state.description = ''
    },
    checkTokenGenerationEventDate(state) {
      const tokenGenerationEventDate = state.checkTokenGenerationEventDate
      const currentDate = new Date()
      if (tokenGenerationEventDate < currentDate) {
        state.tokenGenerationEventOccurred = true
      }
    },
    checkNetworkStatus(state) {
      if (api.client.ws.ready) {
        state.networkStatus = 'synced'
        this.commit('clearError', { error: 'network' })
        if (state.errors.length) {
          state.errors.map(err =>
            this.commit('clearError', { error: err.name }),
          )
        }
      } else {
        this.commit('setWalletOwner', { isDefaultWallet: false })
        state.networkStatus = 'error'
        if (state.networkStatus === 'error') {
          this.commit('setError', {
            name: 'network',
            error: t('connection_error'),
            message: t('connection_error_message'),
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
    setWalletUpdate(state, { name, description }) {
      state.updatedName = name
      state.updatedDescription = description
    },
    setSeed(state, { result }) {
      Object.assign(state, { seed: result })
    },
    setMnemonics(state, result) {
      Object.assign(state, { mnemonics: result })
    },
    setXprv(state, { result }) {
      Object.assign(state, { xprv: result })
    },
    setBackupPassword(state, { result }) {
      Object.assign(state, { xprvBackupPassword: result })
    },
    setWallet(state, { walletId, sessionId, description, name, birthDate }) {
      state.walletId = walletId
      state.sessionId = sessionId
      state.description = description
      state.birthDate = birthDate
      state.title = name
    },
    setBirthDate(state, { result }) {
      Object.assign(state, { birthDate: result })
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
      if (
        ['uploadFile', 'mnemonics', 'xprv', 'seed', 'nodeSync'].includes(
          name,
        ) ||
        error === 'Validation Error'
      ) {
        return
      }
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
    },
    clearError(state, { error }) {
      state.errors[error] = null
    },
    setGeneratedTransaction(state, { transaction }) {
      state.generatedTransaction = transaction
    },
    setVttValues(state, { values }) {
      state.vttValues = values
    },
    setTransactionOptions(state, { values }) {
      state.transactionOptions = values
    },
    setDrValues(state, { values }) {
      state.drValues = values
    },
    clearTransactionOptions(state) {
      state.transactionOptions = null
    },
    clearVttValues(state) {
      state.vttValues = { ...VTT_DEFAULT_VALUES }
    },
    clearDrValues(state) {
      state.drValues = { ...DR_DEFAULT_VALUES }
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
    validateMnemonics(state, { seed = '', mnemonics = '' }) {
      const validate = (s = '', m = '') => {
        return (
          s &&
          s.trim() === m.trim().split('').slice(0, s.trim().length).join('')
        )
      }

      if (validate(seed, mnemonics)) {
        state.areMnemonicsValid = true
      } else {
        state.areMnemonicsValid = false
      }
    },
    validatePassword(state, { password, repeatedPassword }) {
      const passwordLength = password ? password.split('').length : 0
      const repeatedPasswordLength = repeatedPassword
        ? repeatedPassword.split('').length
        : 0
      if (passwordLength < 8 || repeatedPasswordLength < 8) {
        this.commit('setError', {
          name: 'createValidPassword',
          error: 'Validation Error',
          message: t('validate_password_length_message'),
        })
        state.validatedPassword = false
      } else if (password !== repeatedPassword) {
        this.commit('setError', {
          name: 'createValidPassword',
          error: 'Validation Error',
          message: t('validate_password_match_message'),
        })
        state.validatedPassword = false
      } else {
        state.validatedPassword = true
      }
    },
    setCurrentTransactionPage(state, { page }) {
      state.currentTransactionsPage = page
    },
    setAddresses(state, { addresses }) {
      if (addresses) {
        state.addresses = addresses.reverse()
      }
    },
    startSessionTimeout(state, ms) {
      if (state.sessionExtended) {
        state.sessionWillExpireSoon = false
        state.sessionExtended = false
        this.commit('stopSessionTimer')
      }

      if (!state.willExpireSoonTimeout && !state.sessionTimeout) {
        state.willExpireSoonTimeout = setTimeout(() => {
          state.sessionWillExpireSoon = true
        }, ms - 5000)
        state.sessionTimeout = setTimeout(() => {
          state.sessionWillExpireSoon = false
          router.push('/welcome-back/wallet-list')
          this.commit('stopSessionTimer')
          this.commit('deleteSession')
          if (!state.localStorage.getSkipSessionExpirationInfo()) {
            this.commit('showLogoutModal')
          }
        }, ms)
      }
    },
    stopSessionTimer(state) {
      clearTimeout(state.sessionTimeout)
      clearTimeout(state.willExpireSoonTimeout)
      state.sessionTimeout = null
      state.willExpireSoonTimeout = null
    },
  },
  actions: {
    async updateWallet(context) {
      const request = await api.updateWallet({
        wallet_id: context.state.walletId,
        session_id: context.state.sessionId,
        name: context.state.updatedName,
        description: context.state.updatedDescription,
      })
      if (request.result) {
        context.commit('setUpdatedWallet')
        context.commit('clearUpdatedWallet')
        createNotification({
          title: t('wallet_updated_message'),
        })
      } else {
        context.commit('setError', {
          name: 'updateWallet',
          error: request.error.message,
          message: t('update_wallet_error'),
        })
      }
    },
    async deleteWallet(context) {
      const request = await api.deleteWallet({
        wallet_id: context.state.walletId,
        session_id: context.state.sessionId,
      })
      if (request.result) {
        await context.dispatch('getWalletInfos')
        context.commit('setWalletIndex', { walletIndex: 0 })
        context.dispatch('closeSession')
      } else {
        context.commit('setError', {
          name: 'closeSession',
          error: request.error.message,
          message: t('close_session_error_message'),
        })
      }
    },
    async refreshSession(context) {
      const request = await api.refreshSession({
        session_id: context.state.sessionId,
      })
      if (request.result && request.result.success) {
        context.state.sessionExtended = true
        context.commit(
          'startSessionTimeout',
          context.state.sessionExpirationSecs * 1000,
        )
      } else {
        console.error('error while refreshing session', request.result)
      }
    },
    async setCurrentTransactionsPage(context, { page }) {
      await context.dispatch('getTransactions', { page })
      if (!context.state.errors.getTransactions) {
        context.commit('setCurrentTransactionPage', { page })
      }
    },
    startTransactionDateSync(context) {
      if (!this.transactionSync) {
        this.transactionSync = setInterval(() => {
          context.commit('setTransactions', {
            transactions: context.state.transactions,
            total: context.state.transactionsLength,
          })
        }, 15000)
      }
    },
    stopTransactionDateSync() {
      clearInterval(this.transactionSync)
    },
    shutdown: async function (context) {
      if (context.state.isDefaultWallet) {
        // don't handle the response in client because the wallet is being closed.
        // This is handled in background.js when 'exit' event is emitted
        api.shutdown({
          session_id: context.state.sessionId,
        })
      }
    },
    closeSession: async function (context) {
      const request = await api.closeSession({
        wallet_id: context.state.walletId,
        session_id: context.state.sessionId,
      })
      if (request.result) {
        context.commit('stopSessionTimer')
        context.commit('deleteSession')
        context.commit(SET_TEMPLATES, { templates: {} })
        context.commit('setBirthDate', { result: 'current' })
        if (context.state.walletInfos.length > 0) {
          router.push('/welcome-back/wallet-list')
        } else {
          router.push('/ftu/welcome')
        }
      } else {
        context.commit('setError', {
          name: 'closeSession',
          error: request.error.message,
          message: t('close_session_error_message'),
        })
      }
    },
    exportMasterKey: async function (context, { password }) {
      const request = await api.exportMasterKey({
        wallet_id: context.rootState.wallet.walletId,
        session_id: context.rootState.wallet.sessionId,
        password,
      })
      if (request.result) {
        context.commit('setXprv', { result: request.result })
      } else {
        // TODO: improve error handling
        context.commit('setError', {
          name: 'exportXprv',
          error: request.error.message,
          message: t('export_xprv_error_message'),
        })
      }
    },
    getLabels: async function (context) {
      const request = await api.getItem({
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
          message: t('get_labels_error_message'),
        })
      }
    },
    sendTransaction: async function (context, { label }) {
      const transactionToSend = context.state.generatedTransaction
      const request = await api.sendTransaction({
        wallet_id: context.state.walletId,
        session_id: context.state.sessionId,
        transaction: transactionToSend.transaction,
      })
      if (request.result) {
        context.dispatch('saveLabel', { label, transaction: transactionToSend })
        context.commit('clearGeneratedTransaction')
        if (context.state.notifications[NOTIFICATIONS.PAYMENTS]) {
          createNotification({
            title: t('send_tx_notification_title'),
            body: t('send_tx_notification_body', {
              variable: cropString(
                transactionToSend.transaction_id,
                12,
                'middle',
              ),
            }),
          })
        }
      } else {
        context.commit('setError', {
          name: 'sendTransaction',
          error: request.error.message,
          message: t('send_transaction_error_message'),
        })
        context.commit('clearGeneratedTransaction')
      }
    },
    saveLabel: async function (context, { label, transaction }) {
      const transactionId = transaction.transactionId
      context.state.txLabels[transactionId] = { label }
      const txLabels = context.state.txLabels
      const request = await api.saveItem({
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
          message: t('save_label_error_message'),
        })
      }
    },
    createDataRequest: async function (
      context,
      { label, parameters, request },
    ) {
      // TODO(#1760): When the wallet is ready, the generated transaction values should be strings
      const data = {
        session_id: this.state.wallet.sessionId,
        wallet_id: this.state.wallet.walletId,
        label,
        fee: {
          [parameters.feeType.key]: standardizeWitUnits(
            parameters.fee,
            WIT_UNIT.NANO,
          ),
        },
        request: {
          data_request: encodeDataRequest(request),
          collateral: standardizeWitUnits(
            parameters.collateral,
            WIT_UNIT.NANO,
            context.state.unit,
          ),
          witness_reward: standardizeWitUnits(
            parameters.rewardFee,
            WIT_UNIT.NANO,
            context.state.unit,
          ),
          witnesses: parameters.witnesses,
          commit_and_reveal_fee: standardizeWitUnits(
            parameters.commitAndRevealFee,
            WIT_UNIT.NANO,
            context.state.unit,
          ),
          min_consensus_percentage: parameters.minConsensusPercentage,
        },
      }
      const req = await api.createDataRequest(data)
      if (req.result) {
        return req.result
      } else {
        let error = t('dr_error')
        if (req.error.data && req.error.data[0]) {
          let usableBalance = null
          // FIXME: error has the following structure:["{\"available_balance\":0,\"total_balance\":0,\"transaction_value\":2397}","Wallet account has not enough balance"]
          try {
            usableBalance = JSON.parse(req.error.data[0][0])
          } catch (e) {
            usableBalance = null
          }
          const availableBalance = context.state.balance.available
          const unit = context.state.unit
          if (
            usableBalance &&
            usableBalance.available_balance < availableBalance
          ) {
            error = t('vtt_balance_error', {
              pending_balance: `${standardizeWitUnits(
                availableBalance - usableBalance.available_balance,
                unit,
              )} ${unit}`,
            })
          } else {
            if (
              req.error.data[0][1] === 'Wallet account has not enough balance'
            ) {
              error = t('not_enough_balance')
            } else {
              error = req.error.data[0][1]
            }
          }
        } else if (req.error.data.cause) {
          error = req.error.data.cause
        }
        context.commit('setError', {
          name: 'createDataRequest',
          error: req.error.message,
          message: error,
        })
        return { error }
      }
    },
    createVTT: async function (
      context,
      { address, amount, fee, feeType, label, timelock = 0 },
    ) {
      // TODO(#1760): When the wallet is ready, the generated transaction values should be strings
      const request = await api.createVTT({
        session_id: this.state.wallet.sessionId,
        wallet_id: this.state.wallet.walletId,
        outputs: [
          {
            address: address,
            amount: parseInt(
              standardizeWitUnits(amount, WIT_UNIT.NANO, context.state.unit),
            ),
            time_lock: Math.floor(timelock / 1000),
          },
        ],
        fee: {
          [feeType.key]: standardizeWitUnits(fee, WIT_UNIT.NANO),
        },
        label,
      })
      if (request.result) {
        return request.result
      } else {
        let error = t('vtt_error')
        if (request.error.data[0]) {
          let usableBalance = null
          // FIXME: error has the following structure:["{\"available_balance\":0,\"total_balance\":0,\"transaction_value\":2397}","Wallet account has not enough balance"]
          try {
            usableBalance = JSON.parse(request.error.data[0][0])
          } catch (e) {
            usableBalance = null
          }
          const availableBalance = context.state.balance.available
          const unit = context.state.unit
          if (
            usableBalance &&
            usableBalance.available_balance < availableBalance
          ) {
            error = t('vtt_balance_error', {
              pending_balance: `${standardizeWitUnits(
                availableBalance - usableBalance.available_balance,
                unit,
              )} ${unit}`,
            })
          } else {
            error = t('not_enough_balance')
          }
        } else if (request.error.data.cause) {
          error = request.error.data.cause
        }
        await context.commit('setError', {
          name: 'createVTT',
          error: request.error.message,
          message: error,
        })
        return { error: error }
      }
    },
    getFeeEstimationReport: async function (context) {
      const request = await api.getFeeEstimationReport({
        wallet_id: context.state.walletId,
        session_id: context.state.sessionId,
      })
      if (request.result) {
        context.commit('setFeeEstimationReport', { report: request.result })
        this.commit('clearError', { error: 'getFeeEstimationReport' })
      } else {
        context.commit('clearEstimationReport')
        context.commit('setError', {
          name: 'getFeeEstimationReport',
          error: request.error.message,
          message: t('get_estimation_error_message'),
        })
      }
    },
    getAddresses: async function (context) {
      const request = await api.getAddresses({
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
          message: t('get_addresses_error_message'),
        })
      }
    },
    generateAddress: async function (context, { label, external = true }) {
      context.commit('generateAddressLoading', null, { root: true })

      const request = await api.generateAddress({
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
          message: t('generate_address_error_message'),
        })
      }
    },

    unlockWallet: async function (context, { walletId, password }) {
      context.commit('deleteSession')
      const request = await api.unlockWallet({
        wallet_id: walletId,
        password,
        session_id: '1',
        prefill: [1000, 2000, 3000],
      })
      if (request.result) {
        context.commit('setWallet', {
          sessionId: request.result.session_id,
          walletId,
          description: request.result.description,
          birthDate: request.result.birth_date,
          name: request.result.name,
        })
        let walletInfos = context.state.walletInfos
        let index = walletInfos.findIndex(wallet => wallet.id === walletId)
        if (index === -1) {
          await context.dispatch('getWalletInfos')
          walletInfos = context.state.walletInfos
          index = walletInfos.findIndex(wallet => wallet.id === walletId)
        }
        context.commit('setWalletIndex', { walletIndex: index })
        context.commit('setExpirationSecs', {
          secs: request.result.session_expiration_secs,
        })
        context.commit(
          'startSessionTimeout',
          request.result.session_expiration_secs * 1000,
        )

        context.dispatch('subscribeToWalletNotifications')
      } else {
        context.commit('setError', {
          name: 'unlockWallet',
          error: request.error.message,
        })
      }
    },

    lockWallet: async function (context, { walletId, wipe }) {
      const request = await api.lockWallet({
        wallet_id: walletId,
        wipe,
      })
      if (request.result) {
        context.commit('lockWallet', context.store.wallet.id)
        context.commit('setBirthDate', { result: 'current' })
      } else {
        context.commit('setError', 'lockWallet', request.error)
      }
    },

    createMnemonics: async function (context) {
      const request = await api.createMnemonics({ length: 12 })

      if (request.result) {
        context.commit('setMnemonics', request.result.mnemonics)
      } else {
        context.commit('setError', {
          name: 'createMnemonics',
          error: request.error.message,
          message: t('create_mnemonics_error_message'),
        })
      }
    },

    validateImportedWallet: async function (context, params) {
      const importType = params.mnemonics ? 'mnemonics' : 'xprv'
      const request = await api.validateMnemonics({
        seed_source: importType,
        seed_data: params[importType],
        backup_password: params.backupPassword ? params.backupPassword : null,
        password: params.password ? params.password : null,
      })
      if (request.error) {
        context.commit('setError', {
          name: importType,
          error: t('validate_imported_wallet_error', {
            variable: importType,
          }),
          message: request.error.data[0][1],
        })
      } else if (request.result.exist) {
        this.commit('setRepeatedWallet', { exist: request.result.exist })
      }
    },

    createWallet: async function (context, params) {
      let birthDate

      const sourceType = params.sourceType
      if (sourceType === 'xprv') {
        // User is importing a wallet from xprv file
        birthDate = context.state.birthDate
          ? { imported: context.state.birthDate }
          : null
      } else if (context.state.birthDate === 'current') {
        // User is creating a new wallet and birthDate has its default value
        birthDate = 'current'
      } else {
        // User is importing the wallet form mnemonics and has selected a birthDate or has null value
        const calculatedWalletBirthdate = buildImportWalletBirthdate(
          context.state.birthDate ? new Date(context.state.birthDate) : null,
        )
        birthDate = calculatedWalletBirthdate
          ? { imported: calculatedWalletBirthdate }
          : null
      }
      const request = await api.createWallet({
        overwrite: context.state.repeatedWallet,
        name: context.state.title,
        description: context.state.description,
        seed_data: params[params.sourceType],
        seed_source: params.sourceType,
        password: params.password,
        backup_password: params.backupPassword,
        birth_date: birthDate,
      })
      context.commit('setWalletDescription', { title: '', description: '' })
      context.commit('setBirthDate', { result: 'current' })
      context.commit('setRepeatedWallet', { exist: null })

      if (request.result) {
        context.dispatch('unlockWallet', {
          walletId: request.result.wallet_id,
          password: params.password,
        })
        context.commit('clearSeed')
        context.commit('clearMnemonics')
        context.commit('clearXprvInfo')
        context.commit('clearXprvBackupPassword')
      } else {
        context.commit('setError', {
          name: 'createWallet',
          error: request.error.data.cause || request.error.data[0][1],
          message: t('create_wallet_error_message'),
        })
        context.commit('clearSeed')
        context.commit('clearMnemonics')
        context.commit('clearXprvInfo')
        context.commit('clearXprvBackupPassword')
        params.sourceType === 'mnemonics'
          ? router.push('/ftu/import-wallet')
          : router.push('/ftu/import-xprv')
      }
    },

    getTransactions: async function (context, payload = { page: null }) {
      const currentPage = Number.isInteger(payload.page)
        ? payload.page
        : context.state.currentTransactionsPage
      const offset = (currentPage - 1) * TRANSACTIONS_LIMIT
      const request = await api.getTransactions({
        wallet_id: context.state.walletId,
        session_id: context.state.sessionId,
        limit: TRANSACTIONS_LIMIT,
        offset,
      })
      if (request.result) {
        context.commit('setTransactions', request.result)
        context.dispatch('getBalance')
        this.commit('clearError', { error: 'getTransactions' })
      } else {
        context.commit('setError', {
          name: 'getTransactions',
          error: request.error.message,
          message: t('get_tx_error_message'),
        })
      }
    },

    getBalance: async function (context) {
      const request = await api.getBalance({
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
            message: t('get_balance_error_message'),
          })
        }
      }
    },
    getUnit: async function (context) {
      const unit = context.state.localStorage.getUnitSettings()
      const defaultUnit = context.state.unit
      unit
        ? context.commit('setUnit', unit)
        : context.commit('setUnit', defaultUnit)
    },
    getTheme: async function (context) {
      const theme = context.state.localStorage.getThemeSettings()
      const defaultTheme = DEFAULT_THEME
      if (theme) {
        context.commit('setTheme', theme)
      } else {
        context.commit('setTheme', defaultTheme)
      }
    },
    getNotifications: async function (context) {
      const notifications =
        context.state.localStorage.getNotificationsSettings()
      const defaultNotifications = context.state.notifications
      if (notifications) {
        context.commit('setNotifications', notifications)
      } else {
        context.commit('setNotifications', defaultNotifications)
      }
    },
    getWalletInfos: async function (context) {
      await new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
      const request = await api.getWalletInfos()
      if (request.result) {
        context.commit('setWalletInfos', { walletInfos: request.result })
      } else {
        context.commit('setError', {
          name: 'getWalletInfos',
          error: request.error.message,
          message: t('get_wallet_infos_error_message'),
        })
      }
    },
    subscribeToWalletNotifications: async function (context) {
      await api.subscribeToNotifications(
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
            const eventProcessed = eventProcessor.processNotification(
              notifications.status,
            )
            context.commit('setStatus', eventProcessed)
          }
        },
      )
    },
    unsubscribeFromWalletNotifications: async function () {
      await api.unsubscribeFromNotifications({
        session_id: this.state.wallet.sessionId,
      })
    },
    tryDataRequest: async function (context) {
      context.commit('generateRadRequestResultLoading', { root: true })
      context.rootState.rad.currentTemplate.usedVariables.forEach(variable => {
        const id = variable.id
        const value = variable.value
        context.commit(UPDATE_TEMPLATE, { id, value, keepRecord: false })
      })
      const request = await api.runRadRequest({
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
          message: t('try_dr_error_message'),
        })
      }
      context.rootState.rad.currentTemplate.usedVariables.forEach(variable => {
        const id = variable.id
        const key = variable.variable
        context.commit(UPDATE_TEMPLATE, {
          id,
          value: '$' + key,
          keepRecord: false,
        })
      })
    },
    nodeMovement: async function (context, event) {
      await context.dispatch('getTransactions')
      const balance = standardizeBalance({
        result: context.state.status.balance,
      })
      context.commit('setBalance', {
        balance,
      })
      context.dispatch('getAddresses')
      const amount = standardizeWitUnits(event.amount, context.state.unit)
      const total = standardizeWitUnits(
        balance.result.total,
        context.state.unit,
      )
      if (
        event.type === 'POSITIVE' &&
        context.state.notifications[NOTIFICATIONS.TRANSACTIONS]
      ) {
        createNotification({
          title: t('received_tx_notification_title', {
            variable: `${amount} ${context.state.unit}s`,
          }),
          body: t('received_tx_notification_body', {
            variable: `${total} ${context.state.unit}s`,
          }),
        })
      }
    },
    syncFinished: async function (context, event) {
      context.dispatch('retrieveWalletMovements')
      context.commit('stopSyncEstimator')
      const [start, finish] = event
      if (finish > start) {
        if (context.state.notifications[NOTIFICATIONS.SYNCRONIZATION]) {
          createNotification({
            title: t('synced_notification_title'),
            body: t('synced_notification_body', {
              range: `${finish - start}`,
              finish: `(#${finish}).`,
            }),
          })
        }
      }
    },
    syncProgress: async function (context, event) {
      if (!context.state.syncingTimeEstimator.hasStarted()) {
        context.commit('startSyncEstimator')
      }
      // eslint-disable-next-line
      const [_start, current, finish] = event
      context.commit('addSyncEstimatorSample', { current, finish })
      // Re-render transactions, balances and wallets every 2000 blocks
      if (Math.floor((current - 50) / 2000) < Math.floor(current / 2000)) {
        context.dispatch('retrieveWalletMovements')
      }
    },
    syncStart: async function (context, event) {
      const [start, finish] = event
      context.dispatch('retrieveWalletMovements')
      context.commit('stopSyncEstimator')
      context.commit('startSyncEstimator')
      if (finish - start > 100) {
        if (context.state.notifications[NOTIFICATIONS.SYNCRONIZATION]) {
          createNotification({
            title: t('sync_start_notification_title'),
            body: t('sync_start_notification_body', {
              range: `${finish - start}`,
              start: `#${start}`,
              finish: `(#${finish}).`,
            }),
          })
        }
      }
    },
    retrieveWalletMovements: async function (context, event) {
      await context.dispatch('getTransactions')
      const balance = standardizeBalance({
        result: context.state.status.balance,
      })
      context.commit('setBalance', {
        balance,
      })
      context.dispatch('getAddresses')
      if (event && context.state.notifications[NOTIFICATIONS.BLOCK]) {
        if (Array.isArray(event)) {
          createNotification({
            title: t('blocks_confirmed_notification_title', {
              variable: event.length,
            }),
            body: `${event[0]} ... ${event[event.length - 1]}`,
          })
        } else {
          createNotification({
            title: t('block_notification_title', {
              variable: event.epoch,
            }),
            body: event.block_hash,
          })
        }
      }
    },
    processEvent: async function (context, rawEvent) {
      const eventProcessed = eventProcessor.processEvent(rawEvent)
      const { eventType, event } = eventProcessed
      context.commit('setStatus', eventProcessed)

      if (
        eventType === WALLET_EVENTS.BLOCK ||
        eventType === WALLET_EVENTS.BLOCK_CONSOLIDATE ||
        eventType === WALLET_EVENTS.BLOCK_ORPHAN
      ) {
        context.dispatch('retrieveWalletMovements', event)
      } else if (eventType === WALLET_EVENTS.MOVEMENT) {
        context.dispatch('nodeMovement', event)
      } else if (eventType === WALLET_EVENTS.SYNC_FINISH) {
        context.dispatch('syncFinished', event)
      } else if (eventType === WALLET_EVENTS.SYNC_PROGRESS) {
        context.dispatch('syncProgress', event)
      } else if (eventType === WALLET_EVENTS.SYNC_START) {
        context.dispatch('syncStart', event)
      }
    },
    resync(context) {
      api.resync({
        wallet_id: context.state.walletId,
        session_id: context.state.sessionId,
      })
    },
  },
}
