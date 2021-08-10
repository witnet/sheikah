import Vue from 'vue'
import { LocalStorageApi } from '@/api'

export default {
  state: {
    receiveTransactionClicked: false,
    generateAddressLoading: false,
    generateRadRequestResultLoading: false,
    setupMessage: 'Updating wallet backend',
    setupProgress: 0,
    sessionExpired: false,
    localStorage: new LocalStorageApi(),
    isResyncConfirmationVisible: false,
    isWalletDescriptionVisible: false,
    isWalletRenameVisible: false,
  },
  mutations: {
    showResyncConfirmation(state) {
      state.isResyncConfirmationVisible = true
    },
    showLogoutModal(state) {
      state.sessionExpired = true
    },
    showDescriptionModal(state) {
      state.isWalletDescriptionVisible = true
    },
    showRenameConfirmationModal(state) {
      state.isWalletRenameVisible = true
    },
    closeResyncConfirmation(state) {
      state.isResyncConfirmationVisible = false
    },
    closeLogoutModal(state) {
      state.sessionExpired = false
    },
    closeDescriptionModal(state) {
      state.isWalletDescriptionVisible = false
    },
    closeRenameConfirmationModal(state) {
      state.isWalletRenameVisible = false
    },
    receiveTransactionClicked: function(state) {
      state.receiveTransactionClicked = true
    },
    clearTransactionClicked: function(state) {
      state.receiveTransactionClicked = false
    },
    generateAddressLoading: function(state) {
      state.generateAddressLoading = true
    },
    generateRadRequestResultLoading: function(state) {
      state.generateRadRequestResultLoading = true
    },
    clearGenerateAddressLoading: function(state) {
      state.generateAddressLoading = false
    },
    clearGenerateRadRequestResultLoading: function(state) {
      state.generateRadRequestResultLoading = false
    },
    setMessage: function(state, { message }) {
      state.setupMessage = message
    },
    setProgress: function(state, { progress }) {
      state.setupProgress = progress
    },
    cleanMessage: function(state) {
      state.setupMessage = 'Updating wallet backend'
    },
    closeAllModals(state) {
      state.isResyncConfirmationVisible = false
      state.isWalletDescriptionVisible = false
      state.isWalletRenameVisible = false
    },
  },
  actions: {
    notify(context, payload) {
      Vue.prototype.$notify(payload)
    },
    saveShowModalAgain(context, val) {
      context.state.localStorage.setSkipSessionExpirationInfo(val)
    },
  },
}
