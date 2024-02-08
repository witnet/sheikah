import i18n from '@/plugins/i18n'
import { vi } from 'vitest'
import ElementPlus from 'element-plus'
import { createStore } from 'vuex'
import { mount, shallowMount, flushPromises } from '@vue/test-utils'

global.mount = mount
global.shallowMount = shallowMount
global.flushPromises = flushPromises

global.createMocks = ({ storeModules = {}, stubs, router, slots } = {}) => {
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

// FIXME: https://github.com/witnet/sheikah/issues/1500
global.getNormalizedFormRules = function (wrapper) {
  const overwriteTriggerOnSubmitRule = rule =>
    rule.trigger === 'submit' ? { ...rule, trigger: 'change' } : rule

  return Object.entries(wrapper.vm.rules).reduce(
    (acc, entry) => ({
      ...acc,
      [entry[0]]: entry[1].map(overwriteTriggerOnSubmitRule),
    }),
    {},
  )
}

global.sleep = (timeout = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}
