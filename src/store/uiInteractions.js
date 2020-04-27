export default {
  state: {
    receiveTransactionClicked: false,
    generateAddressLoading: false,
  },
  mutations: {
    receiveTransactionClicked: function(state) {
      state.receiveTransactionClicked = true
    },
    clearTransactionClicked: function(state) {
      state.receiveTransactionClicked = false
    },
    generateAddressLoading: function(state) {
      state.generateAddressLoading = true
    },
    clearGenerateAddressLoading: function(state) {
      state.generateAddressLoading = false
    },
  },
  actions: {},
}
