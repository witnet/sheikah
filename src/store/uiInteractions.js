import Vue from 'vue'

export default {
  state: {
    receiveTransactionClicked: false,
    generateAddressLoading: false,
    generateRadRequestResultLoading: false,
    setupMessage: 'Downloading wallet',
    setupProgress: 0,
    isUpdateNotificationVisible: false,
    updateNotificationMessage: '',
    isUpdateAvailable: false,
  },
  mutations: {
    receiveTransactionClicked: function(state) {
      state.receiveTransactionClicked = true
    },
    showUpdateNotification: function(state, { msg }) {
      state.isUpdateNotificationVisible = true
      state.updateNotificationMessage = msg
      state.isUpdateAvailable = true
    },
    clearUpdateNotification: function(state) {
      state.isUpdateNotificationVisible = false
      state.updateNotificationMessage = null
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
      state.setupMessage = 'Downloading wallet'
    },
  },
  actions: {
    notify(context, payload) {
      console.log('notify', payload)
      Vue.prototype.$notify(payload.message)
    },
  },
}
