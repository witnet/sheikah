import Balance from '@/components/Balance'
import BalanceData from '@/components/BalanceData'
import BalanceButtons from '@/components/BalanceButtons'
import SendValueTransfer from '@/components/SendValueTransfer'
import { WIT_UNIT } from '@/constants'

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
                  total: '100',
                },
                unit: WIT_UNIT.NANO,
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
