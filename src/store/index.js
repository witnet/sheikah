import { createStore } from 'vuex'

import radModule from './rad'
import walletModule from './wallet'
import uiInteractionsModule from './uiInteractions'

export const storeInput = {
  modules: {
    uiInteractions: uiInteractionsModule,
    rad: radModule,
    wallet: walletModule,
  },
}

export default createStore(storeInput)
