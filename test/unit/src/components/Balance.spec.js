import Balance from '@/components/Balance.vue'
import BalanceData from '@/components/BalanceData.vue'
import BalanceButtons from '@/components/BalanceButtons.vue'
import SendValueTransfer from '@/components/SendTransaction/SendValueTransfer.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import i18n from '@/plugins/i18n'
import { WIT_UNIT, DEFAULT_VTT_VALUES } from '@/constants'
import { createMockStore } from '../../utils'

describe.skip('Balance.vue', () => {
  const mockStore = createMockStore({
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
  })
  test.only('render BalanceData component', () => {
    const wrapper = mount(Balance, {
      global: {
        plugins: [i18n, mockStore],
        stubs: {
          BalanceData: true,
        },
      },
    })

    expect(wrapper.findComponent(BalanceData).exists()).toBe(true)
  })

  describe('should render send modal on click', () => {
    test('is not visible by default', () => {
      const wrapper = mount(Balance, {
        global: {
          plugins: [i18n, mockStore],
          stubs: {
            BalanceData: true,
            SendValueTransfer: true,
          },
        },
      })

      expect(wrapper.findComponent(SendValueTransfer).exists()).toBe(false)
    })

    test('should be visible when property isSendVisible is true', async () => {
      const wrapper = mount(Balance, {
        global: {
          plugins: [i18n, mockStore],
          stubs: {
            BalanceData: true,
            SendValueTransfer: true,
          },
        },
      })

      wrapper.setData({
        isSendVisible: true,
      })
      await nextTick()

      expect(wrapper.findComponent(SendValueTransfer).exists()).toBe(true)
    })

    test('BalanceButtons event send should show the modal', async () => {
      const clearVttValuesMock = vi.fn()
      const clearTransactionOptionsMock = vi.fn()
      const clearGeneratedTransactionMock = vi.fn()
      const clearSelectedFeeMock = vi.fn()
      const mockStore2 = createMockStore({
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
      })
      const wrapper = mount(Balance, {
        global: {
          plugins: [i18n, mockStore2],
          stubs: {
            BalanceData: true,
            SendValueTransfer: true,
          },
        },
      })

      wrapper.findComponent(BalanceButtons).vm.$emit('send')
      await nextTick()

      expect(wrapper.findComponent(SendValueTransfer).isVisible()).toBe(true)
    })
  })
})
