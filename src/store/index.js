import { createStore } from 'vuex'

import radModule from './rad'
import walletModule from './wallet'
import marketplaceModule from './marketplace'
import uiInteractionsModule from './uiInteractions'

export const storeInput = {
  modules: {
    uiInteractions: uiInteractionsModule,
    rad: radModule,
    wallet: walletModule,
    marketplace: marketplaceModule,
  },
}

export default createStore(storeInput)
