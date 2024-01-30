import { mount, flushPromises } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'

import WalletDescription from '@/components/steps/WalletDescription.vue'
import { createMocks } from '../../../utils'
import { ElButton, ElInput, ElTooltip } from 'element-plus'

describe('WalletDescription.vue', () => {
  describe('title input', () => {
    test('should render title input', () => {
      const mockStore = createMocks({
        storeModules: {
          wallet: {
            state: {
              title: '',
              description: '',
            },
          },
        },
        stubs: {
          'el-input': ElInput,
        },
      })
      const wrapper = mount(WalletDescription, {
        props: {
          selected: false,
          used: false,
        },
        ...mockStore,
      })

      expect(wrapper.findAllComponents(ElInput).at(0).exists()).toBe(true)
    })

    test('should be text type', () => {
      const mockStore = createMocks({
        storeModules: {
          wallet: {
            state: {
              title: '',
              description: '',
            },
          },
        },
        stubs: {
          'el-input': ElInput,
        },
      })
      const wrapper = mount(WalletDescription, {
        props: {
          selected: false,
          used: false,
        },
        ...mockStore,
      })

      expect(wrapper.findAllComponents(ElInput).at(0).props().type).toBe('text')
    })

    test('should contain store value', () => {
      const mockStore = createMocks({
        storeModules: {
          wallet: {
            state: {
              title: 'random text',
              description: '',
            },
          },
        },
        stubs: {
          'el-input': ElInput,
        },
      })
      const wrapper = mount(WalletDescription, {
        props: {
          selected: false,
          used: false,
        },
        ...mockStore,
      })

      expect(wrapper.findAllComponents(ElInput).at(0).props().modelValue).toBe(
        'random text',
      )
    })

    test('should call store update', async () => {
      const setWalletDescription = vi.fn()
      const mockStore = createMocks({
        storeModules: {
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
        stubs: {
          'el-input': ElInput,
        },
      })
      const wrapper = mount(WalletDescription, {
        ...mockStore,
      })

      const inputWrapper = wrapper.find('input')

      inputWrapper.element.value = 'asdf'
      inputWrapper.trigger('input')
      await flushPromises()

      expect(setWalletDescription.mock.calls[0][1].title).toBe('asdf')
      expect(setWalletDescription.mock.calls).toHaveLength(1)
    })
  })

  describe('description input', () => {
    test('should render description input', () => {
      const mockStore = createMocks({
        storeModules: {
          wallet: {
            state: {
              title: '',
              description: '',
            },
          },
        },
        stubs: {
          'el-input': ElInput,
        },
      })
      const wrapper = mount(WalletDescription, {
        props: {
          selected: false,
          used: false,
        },
        ...mockStore,
      })

      expect(wrapper.findAllComponents(ElInput).at(1).exists()).toBe(true)
    })

    test('should be text type', () => {
      const mockStore = createMocks({
        storeModules: {
          wallet: {
            state: {
              title: '',
              description: '',
            },
          },
        },
        stubs: {
          'el-input': ElInput,
        },
      })
      const wrapper = mount(WalletDescription, {
        props: {
          selected: false,
          used: false,
        },
        ...mockStore,
      })

      expect(wrapper.findAllComponents(ElInput).at(1).props().type).toBe(
        'textarea',
      )
    })

    test('should contain store value', () => {
      const mockStore = createMocks({
        storeModules: {
          wallet: {
            state: {
              title: '',
              description: 'random description',
            },
          },
        },
        stubs: {
          'el-input': ElInput,
        },
      })
      const wrapper = mount(WalletDescription, {
        ...mockStore,
      })

      expect(wrapper.findAllComponents(ElInput).at(1).props().modelValue).toBe(
        'random description',
      )
    })

    test('should call store update', async () => {
      const setWalletDescription = vi.fn()
      const mockStore = createMocks({
        storeModules: {
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
        stubs: {
          'el-input': ElInput,
          'el-tooltip': ElTooltip,
          'el-button': ElButton,
          'font-awesome-icon': true,
        },
      })
      const wrapper = mount(WalletDescription, {
        ...mockStore,
      })

      const descriptionInput = wrapper.find('[data-test="description-input"]')

      descriptionInput.setValue('new description')
      await flushPromises()
      console.log(setWalletDescription.mock.calls)
      expect(setWalletDescription.mock.calls[0][1].description).toBe(
        'new description',
      )
      expect(setWalletDescription.mock.calls).toHaveLength(1)
    })
  })

  describe('redirect correctly', () => {
    test('should go to seed validation route on click previous step', async () => {
      const pushMock = vi.fn()
      const mockStore = createMocks({
        storeModules: {
          wallet: {
            state: {
              title: '',
              description: '',
            },
          },
        },
        stubs: {
          'el-input': ElInput,
          'el-tooltip': true,
        },
        router: {
          pushMock,
        },
      })
      const wrapper = mount(WalletDescription, {
        ...mockStore,
      })

      wrapper.find('[data-test="previous-step"]').trigger('click')
      await flushPromises()
      expect(pushMock.mock.calls[0][0]).toBe('/ftu/seed-validation')
    })

    test('should go to encrypt password route on click next step', async () => {
      const pushMock = vi.fn()
      const mockStore = createMocks({
        storeModules: {
          wallet: {
            state: {
              title: '',
              description: '',
            },
          },
        },
        stubs: {
          'el-input': ElInput,
          'el-tooltip': true,
        },
        router: {
          pushMock,
        },
      })

      const wrapper = mount(WalletDescription, {
        ...mockStore,
      })

      await wrapper.find('[data-test="next-step"]').trigger('click')

      expect(pushMock.mock.calls[0][0]).toBe('/ftu/encryption-pass')
    })

    describe('import flow', () => {
      it('should go to encrypt pass route on click next step', async () => {
        const pushMock = vi.fn()
        const mockStore = createMocks({
          storeModules: {
            wallet: {
              state: {
                title: '',
                description: '',
              },
            },
          },
          stubs: {
            'el-input': ElInput,
            'el-tooltip': true,
          },
          router: {
            pushMock,
            queryParams: { import: true },
          },
        })

        const wrapper = mount(WalletDescription, {
          ...mockStore,
        })

        await wrapper.find('[data-test="previous-step"]').trigger('click')
        expect(pushMock.mock.calls[0][0]).toBe('/ftu/import-wallet')
      })

      it('should go to encrypt pass route on click next step', async () => {
        const pushMock = vi.fn()
        const mockStore = createMocks({
          storeModules: {
            wallet: {
              state: {
                title: '',
                description: '',
              },
            },
          },
          stubs: {
            'el-input': ElInput,
          },
          router: {
            pushMock,
            queryParams: {
              import: true,
            },
          },
        })

        const wrapper = mount(WalletDescription, {
          ...mockStore,
        })

        await wrapper.find('[data-test="next-step"]').trigger('click')

        expect(pushMock.mock.calls[0][0]).toBe(
          '/ftu/encryption-pass?import=true',
        )
      })
    })
  })
})
