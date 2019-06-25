import Vue from 'vue'
import Vuex from 'vuex'

import radModule from './rad'
import walletModule from './wallet'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    rad: radModule,
    wallet: walletModule,
  },
})
