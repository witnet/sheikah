import i18n from '@/plugins/i18n'
import { vi } from 'vitest'
import ElementPlus from 'element-plus'
import { createStore } from 'vuex'

export const createMocks = ({
  storeModules = {},
  stubs,
  router,
  slots,
} = {}) => {
  const queryParams = router?.queryParams
  const pushMock = router?.pushMock ?? vi.fn()
  const mockStore = createStore({
    modules: {
      ...storeModules,
    },
  })
  return {
    global: {
      plugins: [i18n, ElementPlus, mockStore],
      stubs: {
        ...stubs,
      },
      router: true,
      mocks: {
        $route: { query: { ...queryParams } },
        $router: { push: pushMock },
      },
    },
    slots: { ...slots },
  }
}

export const sleep = (timeout = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}
