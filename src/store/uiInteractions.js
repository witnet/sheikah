import Vue from 'vue'

export default {
  state: {
    receiveTransactionClicked: false,
    generateAddressLoading: false,
    generateRadRequestResultLoading: false,
    setupMessage: 'Updating wallet backend',
    setupProgress: 0,
    updateNotification: false,
    updateNotificationMessage: '',
  },
  mutations: {
    receiveTransactionClicked: function(state) {
      state.receiveTransactionClicked = true
    },
    toggleUpdateNotification: function(state, { msg }) {
      state.updateNotification = true
      state.updateNotificationMessage = msg
    },
    clearUpdateNotification: function(state) {
      state.updateNotification = false
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
      state.setupMessage = 'Updating wallet backend'
    },
  },
  actions: {
    notify(context, payload) {
      console.log('notify', payload)
      Vue.prototype.$notify(payload.message)
    },
  },
}
