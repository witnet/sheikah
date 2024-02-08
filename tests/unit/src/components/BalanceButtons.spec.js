import BalanceButtons from '@/components/BalanceButtons.vue'
import { NETWORK_STATUS } from '@/constants'
import { describe, expect, test, vi } from 'vitest'
import { createMocks } from '../../utils'
import { mount, flushPromises } from '@vue/test-utils'

describe('BalanceButtons.vue', () => {
  describe('should render receive and send buttons', () => {
    test('send', () => {
      const mockState = {
        status: {
          synced: true,
          currentState: NETWORK_STATUS.SYNCED,
        },
      }
      const storeModules = {
        wallet: {
          state: mockState,
        },
      }
      const wrapper = mount(BalanceButtons, createMocks({ storeModules }))

      expect(wrapper.find('[data-test="btn-send"]').isVisible()).toBe(true)
    })

    test('receive', () => {
      const mockState = {
        walletStatus: {
          synced: true,
          currentState: NETWORK_STATUS.SYNCED,
        },
        sendClicked: true,
      }
      const storeModules = {
        wallet: {
          state: mockState,
        },
      }
      const wrapper = mount(BalanceButtons, createMocks({ storeModules }))

      expect(wrapper.find('[data-test="btn-receive"]').isVisible()).toBe(true)
    })
  })

  describe('should emit receive and send events on click when node is synced', () => {
    test('send', async () => {
      const setError = vi.fn()
      const sendTransactionClickedMock = vi.fn()
      const mockState = {
        status: {
          synced: true,
          currentState: NETWORK_STATUS.SYNCED,
        },
      }
      const storeModules = {
        wallet: {
          state: mockState,
          mutations: {
            setError: setError,
            sendTransactionClickedMock: sendTransactionClickedMock,
          },
        },
      }
      const wrapper = mount(
        BalanceButtons,
        createMocks({
          storeModules,
        }),
      )
      const tryButton = wrapper.find('[data-test="btn-send"]')
      await tryButton.trigger('click')
      await flushPromises()

      console.log(wrapper.emitted())

      expect(wrapper.emitted()['send']).toBeTruthy()
    })

    test('receive', async () => {
      const mockState = {
        status: {
          synced: true,
          currentState: NETWORK_STATUS.SYNCED,
        },
      }
      const storeModules = {
        wallet: {
          state: mockState,
        },
      }
      const wrapper = mount(
        BalanceButtons,
        createMocks({ storeModules, stubs: { 'el-button': true } }),
      )
      const tryButton = wrapper.find('[data-test="btn-receive"]')
      await tryButton.trigger('click')
      await flushPromises()

      expect(wrapper.emitted()['receive']).toBeTruthy()
    })
  })

  describe('should emit only receive events on click when node is not synced', () => {
    test('send', async () => {
      const setError = vi.fn()
      const sendTransactionClickedMock = vi.fn()
      const mockState = {
        status: {
          synced: false,
          currentState: NETWORK_STATUS.SYNCING,
        },
      }
      const storeModules = {
        wallet: {
          state: mockState,
          mutations: {
            setError: setError,
            sendTransactionClickedMock: sendTransactionClickedMock,
          },
        },
      }
      const wrapper = mount(
        BalanceButtons,
        createMocks({
          storeModules,
        }),
      )

      const tryButton = wrapper.find('[data-test="btn-send"]')
      await tryButton.trigger('click')
      await flushPromises()

      expect(wrapper.emitted()['send']).toBeFalsy()
    })

    test('receive', async () => {
      const mockState = {
        status: {
          synced: false,
          currentState: NETWORK_STATUS.SYNCED,
        },
      }
      const storeModules = {
        wallet: {
          state: mockState,
        },
      }
      const wrapper = mount(BalanceButtons, createMocks({ storeModules }))

      const tryButton = wrapper.find('[data-test="btn-receive"]')
      await tryButton.trigger('click')
      await flushPromises()
      expect(wrapper.emitted()['receive']).toBeTruthy()
    })
  })
})
