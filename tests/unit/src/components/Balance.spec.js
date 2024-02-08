import Balance from '@/components/Balance.vue'
import BalanceData from '@/components/BalanceData.vue'
import BalanceButtons from '@/components/BalanceButtons.vue'
import SendValueTransfer from '@/components/SendTransaction/SendValueTransfer.vue'

import { describe, expect, test, vi } from 'vitest'
import { WIT_UNIT, DEFAULT_VTT_VALUES } from '@/constants'

describe('Balance.vue', () => {
  const mockStore = createMocks({
    storeModules: {
      wallet: {
        state: {
          balance: {
            available: '1',
            locked: '10',
            unconfirmed: '0',
            total: '100',
          },
          unit: WIT_UNIT.NANO,
        },
      },
    },
    stubs: {
      BalanceData: true,
      SendValueTransfer: true,
    },
  })
  test('render BalanceData component', () => {
    const wrapper = mount(Balance, {
      ...mockStore,
    })

    expect(wrapper.findComponent(BalanceData).exists()).toBe(true)
  })

  describe('should render send modal on click', () => {
    test('is not visible by default', () => {
      const wrapper = mount(Balance, {
        ...mockStore,
      })

      expect(wrapper.findComponent(SendValueTransfer).exists()).toBe(false)
    })

    test('should be visible when property isSendVisible is true', async () => {
      const wrapper = mount(Balance, {
        ...mockStore,
      })

      wrapper.setData({
        isSendVisible: true,
      })
      await flushPromises()

      expect(wrapper.findComponent(SendValueTransfer).exists()).toBe(true)
    })

    test('BalanceButtons event send should show the modal', async () => {
      const clearVttValuesMock = vi.fn()
      const clearTransactionOptionsMock = vi.fn()
      const clearGeneratedTransactionMock = vi.fn()
      const clearSelectedFeeMock = vi.fn()
      const mockStore2 = createMocks({
        storeModules: {
          wallet: {
            state: {
              errors: {
                createDataRequest: false,
              },
              balance: {
                available: '1',
                locked: '10',
                unconfirmed: '0',
                total: '100',
              },
              vttValues: { ...DEFAULT_VTT_VALUES },
              unit: WIT_UNIT.NANO,
            },
            mutations: {
              clearSelectedFee: clearSelectedFeeMock,
              clearVttValues: clearVttValuesMock,
              clearTransactionOptions: clearTransactionOptionsMock,
              clearGeneratedTransaction: clearGeneratedTransactionMock,
            },
            getters: {
              network: () => 'mainnet',
            },
          },
        },
        stubs: {
          BalanceData: true,
          SendValueTransfer: true,
        },
      })
      const wrapper = mount(Balance, {
        ...mockStore2,
      })

      wrapper.findComponent(BalanceButtons).vm.$emit('send')
      await flushPromises()

      expect(wrapper.findComponent(SendValueTransfer).isVisible()).toBe(true)
    })
  })
})
