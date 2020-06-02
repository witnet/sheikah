import { storeInput } from '@/store'
import { Radon } from 'witnet-radon-js'
import Vuex from 'vuex'

const radRequest = {
  timelock: 0,
  retrieve: [
    {
      url: '',
      kind: 'HTTP-GET',
      contentType: 'JSON API',
      script: [],
    },
  ],
  aggregate: {
    filters: [],
    reducer: 0x02,
  },
  tally: {
    filters: [],
    reducer: 0x02,
  },
}
// mock the store
storeInput.modules.rad.state.radRequest = new Radon(radRequest)
storeInput.modules.rad.state.templates = {
  1: {
    id: '1',
    name: 'Bitcoin hash',
    description: 'Get the latest bitcoint hash',
    radRequest: {
      timelock: 1669852800,
      retrieve: [
        {
          kind: 'HTTP-GET',
          url: 'https://blockchain.info/q/latesthash',
          contentType: 'JSON API',
          script: [],
        },
        {
          kind: 'HTTP-GET',
          url: 'https://api-r.bitcoinchain.com/v1/status',
          contentType: 'JSON API',
          script: [119, [103, 'hash']],
        },
        {
          kind: 'HTTP-GET',
          url: 'https://api.blockchair.com/bitcoin/stats',
          contentType: 'JSON API',
          script: [119, [102, 'data'], [103, 'best_block_hash']],
        },
      ],
      aggregate: {
        filters: [],
        reducer: 2,
      },
      tally: {
        filters: [8],
        reducer: 2,
      },
    },
  },
}
storeInput.modules.rad.state.currentTemplate = { id: '1', variables: [] }

export default previewComponent => {
  return {
    store: new Vuex.Store(storeInput),
    render(createElement) {
      return createElement(previewComponent)
    },
  }
}
