import Balance from '@/components/Balance.vue'
import BalanceData from '@/components/BalanceData.vue'
import BalanceButtons from '@/components/BalanceButtons.vue'
import SendValueTransfer from '@/components/SendTransaction/SendValueTransfer.vue'
import { WIT_UNIT, DEFAULT_VTT_VALUES } from '@/constants'

describe('Balance.vue', () => {
  it('render BalanceData component', () => {
    const wrapper = shallowMount(
      Balance,
      createComponentMocks({
        store: {
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
      }),
    )

    expect(wrapper.findComponent(BalanceData).exists()).toBe(true)
  })

  describe('should render send modal on click', () => {
    it('is not visible by default', () => {
      const wrapper = shallowMount(
        Balance,
        createComponentMocks({
          store: {
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
        }),
      )

      expect(wrapper.findComponent(SendValueTransfer).exists()).toBe(false)
    })

    it('should be visible when property isSendVisible is true', async () => {
      const wrapper = shallowMount(
        Balance,
        createComponentMocks({
          store: {
            wallet: {
              state: {
                balance: {
                  available: '1',
                  locked: '10',
                  unconfirmed: '0',
                  total: '100',
                },
                unit: 'nanoWits',
              },
            },
          },
        }),
      )

      wrapper.setData({
        isSendVisible: true,
      })
      await nextTick()

      expect(wrapper.findComponent(SendValueTransfer).exists()).toBe(true)
    })

    it('BalanceButtons event send should show the modal', async () => {
      const clearVttValuesMock = jest.fn()
      const clearTransactionOptionsMock = jest.fn()
      const clearGeneratedTransactionMock = jest.fn()
      const clearSelectedFeeMock = jest.fn()

      const wrapper = mount(
        Balance,
        createComponentMocks({
          store: {
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
        }),
      )

      wrapper.findComponent(BalanceButtons).vm.$emit('send')
      await nextTick()

      expect(wrapper.findComponent(SendValueTransfer).isVisible()).toBe(true)
    })
  })
})
