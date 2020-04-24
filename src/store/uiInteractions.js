export default {
  state: {
    receiveTransactionClicked: false,
  },
  mutations: {
    receiveTransactionClicked: function(state) {
      state.receiveTransactionClicked = true
    },
    clearTransactionClicked: function(state) {
      state.receiveTransactionClicked = false
    },
  },
  actions: {},
}
