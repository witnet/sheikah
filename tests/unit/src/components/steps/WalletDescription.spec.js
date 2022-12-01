import Input from 'element-ui/lib/input'

import WalletDescription from '@/components/steps/WalletDescription.vue'

describe('WalletDescription.vue', () => {
  describe('title input', () => {
    it('should render title input', () => {
      const wrapper = mount(WalletDescription, {
        propsData: {
          selected: false,
          used: false,
        },
        ...createComponentMocks({
          store: {
            wallet: {
              state: {
                title: '',
                description: '',
              },
            },
          },
        }),
      })

      expect(wrapper.findAllComponents(Input).at(0).exists()).toBe(true)
    })

    it('should be text type', () => {
      const wrapper = mount(WalletDescription, {
        propsData: {
          selected: false,
          used: false,
        },
        ...createComponentMocks({
          store: {
            wallet: {
              state: {
                title: '',
                description: '',
              },
            },
          },
        }),
      })

      expect(wrapper.findAllComponents(Input).at(0).props().type).toBe('text')
    })

    it('should contain store value', () => {
      const wrapper = mount(WalletDescription, {
        propsData: {
          selected: false,
          used: false,
        },
        ...createComponentMocks({
          store: {
            wallet: {
              state: {
                title: 'random text',
                description: '',
              },
            },
          },
        }),
      })

      expect(wrapper.findAllComponents(Input).at(0).props().value).toBe(
        'random text',
      )
    })

    it('should call store update', async () => {
      const setWalletDescription = jest.fn()
      const wrapper = mount(WalletDescription, {
        ...createComponentMocks({
          store: {
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
        }),
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
    it('should render description input', () => {
      const wrapper = mount(WalletDescription, {
        propsData: {
          selected: false,
          used: false,
        },
        ...createComponentMocks({
          store: {
            wallet: {
              state: {
                title: '',
                description: '',
              },
            },
          },
        }),
      })

      expect(wrapper.findAllComponents(Input).at(1).exists()).toBe(true)
    })

    it('should be text type', () => {
      const wrapper = mount(WalletDescription, {
        propsData: {
          selected: false,
          used: false,
        },
        ...createComponentMocks({
          store: {
            wallet: {
              state: {
                title: '',
                description: '',
              },
            },
          },
        }),
      })

      expect(wrapper.findAllComponents(Input).at(1).props().type).toBe(
        'textarea',
      )
    })

    it('should contain store value', () => {
      const wrapper = mount(WalletDescription, {
        ...createComponentMocks({
          store: {
            wallet: {
              state: {
                title: '',
                description: 'random description',
              },
            },
          },
        }),
      })

      expect(wrapper.findAllComponents(Input).at(1).props().value).toBe(
        'random description',
      )
    })

    it('should call store update', async () => {
      const setWalletDescription = jest.fn()
      const wrapper = mount(WalletDescription, {
        ...createComponentMocks({
          store: {
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
        }),
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
    it('should go to seed validation route on click previous step', async () => {
      const router = {
        push: jest.fn(),
      }
      const wrapper = mount(WalletDescription, {
        ...createComponentMocks({
          store: {
            wallet: {
              state: {
                title: '',
                description: '',
              },
            },
          },
          router: router,
        }),
      })

      await wrapper.find('[data-test="previous-step"]').trigger('click')

      expect(router.push.mock.calls[0][0]).toBe('/ftu/seed-validation')
    })

    it('should go to encrypt password route on click next step', async () => {
      const router = {
        push: jest.fn(),
      }

      const wrapper = mount(WalletDescription, {
        ...createComponentMocks({
          store: {
            wallet: {
              state: {
                title: '',
                description: '',
              },
            },
          },
          router: router,
        }),
      })

      await wrapper.find('[data-test="next-step"]').trigger('click')

      expect(router.push.mock.calls[0][0]).toBe('/ftu/encryption-pass')
    })

    describe('import flow', () => {
      // it.only('should go to import wallet route on click previous step on import flow', async () => {

      it.only('should go to encrypt pass route on click next step', async () => {
        const pushMock = jest.fn()

        const wrapper = mount(WalletDescription, {
          ...createComponentMocks({
            store: {
              wallet: {
                state: {
                  title: '',
                  description: '',
                },
              },
            },
            router: true,
            mocks: {
              $route: { query: { import: true } },
              $router: { push: pushMock },
            },
          }),
        })

        await wrapper.find('[data-test="previous-step"]').trigger('click')

        expect(pushMock.mock.calls[0][0]).toBe('/ftu/import-wallet')
      })

      it.only('should go to encrypt pass route on click next step', async () => {
        const pushMock = jest.fn()

        const wrapper = mount(WalletDescription, {
          ...createComponentMocks({
            store: {
              wallet: {
                state: {
                  title: '',
                  description: '',
                },
              },
            },
            router: true,
            mocks: {
              $route: { query: { import: true } },
              $router: { push: pushMock },
            },
          }),
        })

        await wrapper.find('[data-test="next-step"]').trigger('click')

        expect(pushMock.mock.calls[0][0]).toBe(
          '/ftu/encryption-pass?import=true',
        )
      })
    })
  })
})
