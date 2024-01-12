import { MarketplaceApi } from '@/api'

const marketplaceApi = new MarketplaceApi()

export default {
  state: {
    templates: [],
  },
  mutations: {
    setTemplates: async function (state, { templates }) {
      state.templates = templates
    },
  },
  actions: {
    retrieveTemplates: async function () {
      const request = await marketplaceApi.getTemplates()
      if (request) {
        this.commit('setTemplates', { templates: request })
      } else {
        console.error('Error retrieving templates from the marketplace')
      }
    },
  },
}
