import BalanceButtons from '@/components/BalanceButtons'

describe('BalanceButtons.vue', () => {
  describe('should render receive and send buttons', () => {
    it('send', () => {
      const wrapper = shallowMount(
        BalanceButtons,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                status: {
                  synced: true,
                },
                sendClicked: true,
              },
            },
            uiInteractions: {
              state: {
                receiveTransactionClicked: true,
              },
            },
          },
        }),
      )

      expect(wrapper.find('[data-test="btn-send"]').isVisible()).toBe(true)
    })

    it('receive', () => {
      const wrapper = shallowMount(
        BalanceButtons,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                status: {
                  synced: true,
                },
                sendClicked: true,
              },
            },
            uiInteractions: {
              state: {
                receiveTransactionClicked: true,
              },
            },
          },
        }),
      )

      expect(wrapper.find('[data-test="btn-receive"]').isVisible()).toBe(true)
    })
  })

  describe('should emit receive and send events on click when node is synced', () => {
    it('send', async () => {
      const setError = jest.fn()
      const sendTransactionClickedMock = jest.fn()
      const wrapper = mount(
        BalanceButtons,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                status: {
                  synced: true,
                },
              },
              mutations: {
                setError: setError,
              },
            },
            uiInteractions: {
              state: {
                sendTransactionClicked: true,
              },
              mutations: {
                sendTransactionClicked: sendTransactionClickedMock,
              },
            },
          },
        }),
      )
      const tryButton = wrapper.find('[data-test="btn-send"]')
      await tryButton.trigger('click')
      await nextTick()

      expect(wrapper.emitted().send).toBeTruthy()
    })

    it('receive', done => {
      const wrapper = shallowMount(
        BalanceButtons,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                status: {
                  synced: true,
                },
                sendClicked: true,
              },
            },
            uiInteractions: {
              state: {
                receiveTransactionClicked: true,
              },
            },
          },
        }),
      )

      wrapper.find('[data-test="btn-receive"]').trigger('click')

      nextTick(() => {
        expect(wrapper.emitted()).toBeTruthy()
        done()
      })
    })
  })

  describe('should emit only receive events on click when node is not synced', () => {
    it('send', async () => {
      const setError = jest.fn()
      const sendTransactionClickedMock = jest.fn()
      const wrapper = mount(
        BalanceButtons,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                status: {
                  synced: false,
                },
              },
              mutations: {
                setError: setError,
              },
            },
            uiInteractions: {
              state: {
                sendTransactionClicked: true,
              },
              mutations: {
                sendTransactionClicked: sendTransactionClickedMock,
              },
            },
          },
        }),
      )

      const tryButton = wrapper.find('[data-test="btn-send"]')
      await tryButton.trigger('click')
      await nextTick()

      expect(wrapper.emitted().send).toBeFalsy()
    })

    it('receive', done => {
      const wrapper = shallowMount(
        BalanceButtons,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                status: {
                  synced: true,
                },
              },
            },
            uiInteractions: {
              state: {
                receiveTransactionClicked: true,
              },
            },
          },
        }),
      )

      wrapper.find('[data-test="btn-receive"]').trigger('click')

      nextTick(() => {
        expect(wrapper.emitted()).toBeTruthy()
        done()
      })
    })
  })
})
