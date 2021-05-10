import Vue from 'vue'
import { LocalStorageApi } from '@/api'

export default {
  state: {
    receiveTransactionClicked: false,
    generateAddressLoading: false,
    generateRadRequestResultLoading: false,
    setupMessage: 'Updating wallet backend',
    setupProgress: 0,
    isResyncConfirmationVisible: false,
    sessionExpired: false,
    localStorage: new LocalStorageApi(),
    isWalletDescriptionVisible: false,
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
    closeResyncConfirmation(state) {
      state.isResyncConfirmationVisible = false
    },
    closeLogoutModal(state) {
      state.sessionExpired = false
    },
    closeDescriptionModal(state) {
      state.isWalletDescriptionVisible = false
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
  },
  actions: {
    notify(context, payload) {
      Vue.prototype.$notify(payload.message)
    },
    saveShowModalAgain(context, val) {
      context.state.localStorage.setSkipSessionExpirationInfo(val)
    },
  },
}
