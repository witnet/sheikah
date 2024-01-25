import { createStore } from 'vuex'

export const createMockStore = modules => {
  createStore({
    modules: {
      ...modules,
    },
  })
}
