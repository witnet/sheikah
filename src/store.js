import Vue from 'vue'
import Vuex from 'vuex'

import { ApiClient } from '@/api'
import { tryDataRequest } from './api'

Vue.use(Vuex)

const apiClient = new ApiClient()

export default new Vuex.Store({
  state: {
    radReuqestResult: null,
    radRequestError: null,
    radRequest: {
      retrieve: [
        {
          url: '',
          kind: 'HTTP_GET',
          script: [[0x56, 0]],
        },
      ],
      aggregate: {
        script: [0x43, 0x74, [0x61, 'weather'], 0x74, [0x61, 'temp'], 0x72],
      },
      consensus: {
        script: [0x43, 0x74, [0x61, 'weather'], 0x74, [0x61, 'temp'], 0x72],
      },
    },
  },
  mutations: {
    setDataRequestResult (state, result) {
      state.dataRequestResult = result
    },
    setDataRequestError (state, error) {
      state.dataRequestError = error
    },
  },
  actions: {
    tryDataRequest: async function (context) {
      const requestResult = await tryDataRequest(apiClient)
      if (requestResult.result) {
        context.commit('setDataRequestResult', requestResult.response)
      } else {
        context.commit('setDataRequestError', requestResult.error)
      }
    },
  },
})
