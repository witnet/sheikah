import BalanceButtons from '@/components/BalanceButtons.vue'
import { NETWORK_STATUS } from '@/constants'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { createMockStore } from '../../utils'

describe('BalanceButtons.vue', () => {
  describe('should render receive and send buttons', () => {
    test('send', () => {
      const mockStore = createMockStore({
        wallet: {
          state: {
            status: {
              isWalletsynced: true,
            },
            sendClicked: true,
          },
        },
        uiInteractions: {
          state: {
            receiveTransactionClicked: true,
          },
        },
      })
      const wrapper = shallowMount(
        BalanceButtons,
        {
          global: {
            plugins: [mockStore]
          }
        }
      )

      expect(wrapper.find('[data-test="btn-send"]').isVisible()).toBe(true)
    })

    test('receive', () => {
      const mockStore = createMockStore({
        wallet: {
          state: {
            walletStatus: {
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
      })
      const wrapper = shallowMount(
        BalanceButtons,
        {
          global: {
            plugins: [mockStore]
          }
        }
      )

      expect(wrapper.find('[data-test="btn-receive"]').isVisible()).toBe(true)
    })
  })

  describe('should emit receive and send events on click when node is synced', () => {
    test('send', async () => {
      const setError = vi.fn()
      const sendTransactionClickedMock = vi.fn()
      const mockStore = createMockStore({
        wallet: {
          state: {
            status: {
              currentState: NETWORK_STATUS.SYNCED,
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
      })
      const wrapper = mount(
        BalanceButtons,
        {
          global: {
            plugins: [i18n, mockStore],
          },
        },
      )
      const tryButton = wrapper.find('[data-test="btn-send"]')
      await tryButton.trigger('click')
      await nextTick()

      expect(wrapper.emitted().send).toBeTruthy()
    })

    test('receive', done => {
      const mockStore = createMockStore({
        wallet: {
          state: {
            status: {
              currentState: NETWORK_STATUS.SYNCED,
            },
            sendClicked: true,
          },
        },
        uiInteractions: {
          state: {
            receiveTransactionClicked: true,
          },
        },
      })
      const wrapper = shallowMount(
        BalanceButtons,
        {
          global: {
            pluggins: [mockStore]
          }
        }
      )

      wrapper.find('[data-test="btn-receive"]').trigger('click')

      nextTick(() => {
        expect(wrapper.emitted()).toBeTruthy()
        done()
      })
    })
  })

  describe('should emit only receive events on click when node is not synced', () => {
    test('send', async () => {
      const setError = vi.fn()
      const sendTransactionClickedMock = vi.fn()
      const mockStore = createComponentMocks({
        wallet: {
          state: {
            status: {
              currentState: NETWORK_STATUS.SYNCING,
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
      })
      const wrapper = mount(
        BalanceButtons,
        {
          global: {
            plugins: [mockStore]
          }
        }
      )

      const tryButton = wrapper.find('[data-test="btn-send"]')
      await tryButton.trigger('click')
      await nextTick()

      expect(wrapper.emitted().send).toBeFalsy()
    })

    test('receive', done => {
      const mockStore = createMockStore({
        wallet: {
          state: {
            status: {
              currentState: NETWORK_STATUS.SYNCED,
            },
          },
        },
        uiInteractions: {
          state: {
            receiveTransactionClicked: true,
          },
        },
      })
      const wrapper = shallowMount(
        BalanceButtons,
        {
          global: {
            pluggins: [mockStore]
          }
        }
      )

      wrapper.find('[data-test="btn-receive"]').trigger('click')

      nextTick(() => {
        expect(wrapper.emitted()).toBeTruthy()
        done()
      })
    })
  })
})
