import Input from 'element-ui/lib/input'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'

import WalletDescription from '@/components/steps/WalletDescription.vue'
import { createMockStore } from '../../../utils'

describe('WalletDescription.vue', () => {
  describe('title input', () => {
    test('should render title input', () => {
      const mockStore = createMockStore({
        wallet: {
          state: {
            title: '',
            description: '',
          },
        },
      })
      const wrapper = mount(WalletDescription, {
        props: {
          selected: false,
          used: false,
        },
        global: {
          plugins: [mockStore],
        },
      })

      expect(wrapper.findAllComponents(Input).at(0).exists()).toBe(true)
    })

    test('should be text type', () => {
      const mockStore = createMockStore({
        wallet: {
          state: {
            title: '',
            description: '',
          },
        },
      })
      const wrapper = mount(WalletDescription, {
        props: {
          selected: false,
          used: false,
        },
        global: {
          plugins: [mockStore],
        },
      })

      expect(wrapper.findAllComponents(Input).at(0).props().type).toBe('text')
    })

    test('should contain store value', () => {
      const mockStore = createMockStore({
        wallet: {
          state: {
            title: 'random text',
            description: '',
          },
        },
      })
      const wrapper = mount(WalletDescription, {
        props: {
          selected: false,
          used: false,
        },
        global: {
          plugins: [mockStore],
        },
      })

      expect(wrapper.findAllComponents(Input).at(0).props().value).toBe(
        'random text',
      )
    })

    test('should call store update', async () => {
      const setWalletDescription = vi.fn()
      const mockStore = createMockStore({
        wallet: {
          state: {
            title: '',
            description: '',
          },
          mutations: {
            setWalletDescription,
          },
        },
      })
      const wrapper = mount(WalletDescription, {
        global: {
          plugins: [mockStore],
        },
      })

      const inputWrapper = wrapper.find('input')

      inputWrapper.element.value = 'asdf'
      inputWrapper.trigger('input')
      await nextTick()

      expect(setWalletDescription.mock.calls[0][1].title).toBe('asdf')
      expect(setWalletDescription.mock.calls).toHaveLength(1)
    })
  })

  describe('description input', () => {
    test('should render description input', () => {
      const mockStore = createMockStore({
        wallet: {
          state: {
            title: '',
            description: '',
          },
        },
      })
      const wrapper = mount(WalletDescription, {
        props: {
          selected: false,
          used: false,
        },
        global: {
          plugins: [mockStore],
        },
      })

      expect(wrapper.findAllComponents(Input).at(1).exists()).toBe(true)
    })

    test('should be text type', () => {
      const mockStore = createMockStore({
        wallet: {
          state: {
            title: '',
            description: '',
          },
        },
      })
      const wrapper = mount(WalletDescription, {
        props: {
          selected: false,
          used: false,
        },
        global: {
          plugins: [mockStore],
        },
      })

      expect(wrapper.findAllComponents(Input).at(1).props().type).toBe(
        'textarea',
      )
    })

    test('should contain store value', () => {
      const mockStore = createMockStore({
        wallet: {
          state: {
            title: '',
            description: 'random description',
          },
        },
      })
      const wrapper = mount(WalletDescription, {
        global: {
          plugins: [mockStore],
        },
      })

      expect(wrapper.findAllComponents(Input).at(1).props().value).toBe(
        'random description',
      )
    })

    test('should call store update', async () => {
      const setWalletDescription = vi.fn()
      const mockStore = createMockStore({
        wallet: {
          wallet: {
            state: {
              title: '',
              description: '',
            },
            mutations: {
              setWalletDescription,
            },
          },
        },
      })
      const wrapper = mount(WalletDescription, {
        global: {
          plugins: [mockStore],
        },
      })

      const textareaWrapper = wrapper.find('textarea')

      textareaWrapper.element.value = 'new description'
      textareaWrapper.trigger('input')
      await nextTick()

      expect(setWalletDescription.mock.calls[0][1].description).toBe(
        'new description',
      )
      expect(setWalletDescription.mock.calls).toHaveLength(1)
    })
  })

  describe.only('redirect correctly', () => {
    test('should go to seed validation route on click previous step', async () => {
      const router = {
        push: vi.fn(),
      }
      const mockStore = createMockStore({
        wallet: {
          state: {
            title: '',
            description: '',
          },
        },
      })
      const wrapper = mount(WalletDescription, {
        global: {
          plugins: [mockStore],
          router: router,
        },
      })

      await wrapper.find('[data-test="previous-step"]').trigger('click')

      expect(router.push.mock.calls[0][0]).toBe('/ftu/seed-validation')
    })

    test('should go to encrypt password route on click next step', async () => {
      const router = {
        push: vi.fn(),
      }
      const mockStore = createMockStore({
        wallet: {
          state: {
            title: '',
            description: '',
          },
        },
      })

      const wrapper = mount(WalletDescription, {
        global: {
          plugins: [mockStore],
          router: router,
        },
      })

      await wrapper.find('[data-test="next-step"]').trigger('click')

      expect(router.push.mock.calls[0][0]).toBe('/ftu/encryption-pass')
    })

    describe('import flow', () => {
      // it.only('should go to import wallet route on click previous step on import flow', async () => {

      it.only('should go to encrypt pass route on click next step', async () => {
        const pushMock = vi.fn()
        const mockStore = createMockStore({
          wallet: {
            state: {
              title: '',
              description: '',
            },
          },
        })

        const wrapper = mount(WalletDescription, {
          global: {
            plugins: [mockStore],
            router: true,
            mocks: {
              $route: { query: { import: true } },
              $router: { push: pushMock },
            },
          },
        })

        await wrapper.find('[data-test="previous-step"]').trigger('click')

        expect(pushMock.mock.calls[0][0]).toBe('/ftu/import-wallet')
      })

      it.only('should go to encrypt pass route on click next step', async () => {
        const pushMock = vi.fn()
        const mockStore = createMockStore({
          wallet: {
            state: {
              title: '',
              description: '',
            },
          },
        })

        const wrapper = mount(WalletDescription, {
          global: {
            plugins: [mockStore],
            router: true,
            mocks: {
              $route: { query: { import: true } },
              $router: { push: pushMock },
            },
          },
        })

        await wrapper.find('[data-test="next-step"]').trigger('click')

        expect(pushMock.mock.calls[0][0]).toBe(
          '/ftu/encryption-pass?import=true',
        )
      })
    })
  })
})
