import i18n from '@/plugins/i18n'
import { vi } from 'vitest'
import { createStore } from 'vuex'

export const createMocks = ({ storeModules = {}, stubs, router } = {}) => {
  const queryParams = router?.queryParams
  const pushMock = router?.pushMock ?? vi.fn()
  const mockStore = createStore({
    modules: {
      ...storeModules,
    },
  })
  return {
    global: {
      plugins: [i18n, mockStore],
      stubs: {
        ...stubs,
      },
      router: true,
      mocks: {
        $route: { query: { ...queryParams } },
        $router: { push: pushMock },
      },
    },
  }
}
