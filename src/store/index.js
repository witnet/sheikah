import Vue from 'vue'
import Vuex from 'vuex'

import createRadModule from './rad'
import createWalletModule from './wallet'
// import marketplaceModule from './marketplace'
import createUiInteractions from './uiInteractions'

Vue.use(Vuex)

export const storeInput = deps => ({
  modules: {
    uiInteractions: createUiInteractions(deps),
    rad: createRadModule(deps),
    wallet: createWalletModule(deps),
    // marketplace: marketplaceModule,
  },
})

export default function createStore(deps) {
  return new Vuex.Store(storeInput(deps))
}
