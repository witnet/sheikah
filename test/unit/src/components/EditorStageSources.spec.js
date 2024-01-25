import EditorStageSources from '@/components/EditorStageSources.vue'
import EditorSource from '@/components/EditorSource.vue'
import Fieldset from '@/components/Fieldset.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { createMockStore } from '../../utils'

describe('EditorStageSources.vue', () => {
  describe('should render correctly', () => {
    test('should render as much sources as there are in the store', () => {
      const mockStore = createMockStore({
        wallet: {
          state: {
            theme: 'light',
          },
        },
        rad: {
          state: {
            radRequest: {
              getMarkup: () => ({
                retrieve: [
                  {
                    url: 'url1',
                    kind: 'HTTP-GET',
                    contentType: 'JSON API',
                    kindOptions: ['HTTP-GET', 'RNG'],
                    contentTypeOptions: { http: 'JSON API', rng: 'Bytes' },
                  },
                  {
                    url: 'url2',
                    kind: 'HTTP-GET',
                    contentType: 'JSON API',
                    kindOptions: ['HTTP-GET', 'RNG'],
                    contentTypeOptions: { http: 'JSON API', rng: 'Bytes' },
                  },
                ],
              }),
            },
          },
        },
      })
      const wrapper = mount(EditorStageSources, {
        global: {
          plugins: [i18n, mockStore],
        },
      })

      expect(wrapper.findAllComponents(EditorSource).length).toBe(2)
    })

    test('should contains an add source button', () => {
      const addSourceMock = vi.fn()
      const mockStore = createMockStore({
        wallet: {
          state: {
            theme: 'light',
          },
        },
        rad: {
          state: {
            radRequest: {
              getMarkup: () => ({
                retrieve: [
                  {
                    url: 'url1',
                    kind: 'HTTP-GET',
                    contentType: 'JSON API',
                    kindOptions: ['HTTP-GET', 'RNG'],
                    contentTypeOptions: { http: 'JSON API', rng: 'Bytes' },
                  },
                  {
                    url: 'url2',
                    kind: 'HTTP-GET',
                    contentType: 'JSON API',
                    kindOptions: ['HTTP-GET', 'RNG'],
                    contentTypeOptions: { http: 'JSON API', rng: 'Bytes' },
                  },
                ],
              }),
            },
          },
          actions: {
            ADD_SOURCE: addSourceMock,
          },
        },
      })
      const wrapper = mount(EditorStageSources, {
        global: {
          plugins: [i18n, mockStore],
        },
      })

      expect(wrapper.find('[data-test="add-source"]').isVisible()).toBe(true)
    })

    test('should contains two fieldsets', () => {
      const addSourceMock = vi.fn()
      const mockStore = createMockStore({
        wallet: {
          state: {
            theme: 'light',
          },
        },
        rad: {
          state: {
            radRequest: {
              getMarkup: () => ({
                retrieve: [],
              }),
            },
          },
          actions: {
            ADD_SOURCE: addSourceMock,
          },
        },
      })
      const wrapper = mount(EditorStageSources, {
        global: {
          plugins: [i18n, mockStore],
        },
      })

      expect(wrapper.findAllComponents(Fieldset).length).toBe(2)
    })
  })

  test('should create a new source on click "add source"', () => {
    const addSourceMock = vi.fn()
    const mockStore = createMockStore({
      wallet: {
        state: {
          theme: 'light',
        },
      },
      rad: {
        state: {
          radRequest: {
            getMarkup: () => ({
              retrieve: [],
            }),
          },
        },
        mutations: {
          ADD_SOURCE: addSourceMock,
        },
      },
    })
    const wrapper = mount(EditorStageSources, {
      global: {
        plugins: [i18n, mockStore],
      },
    })
    wrapper.find('[data-test="add-source"]').trigger('click')
    expect(addSourceMock).toBeCalled()
  })
})
