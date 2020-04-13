import Balance from '@/components/Balance'
import BalanceData from '@/components/BalanceData'
import BalanceButtons from '@/components/BalanceButtons'
import Send from '@/components/Send'

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
                currency: 'nanoWits',
              },
            },
          },
        },
      })
    )

    expect(wrapper.contains(BalanceData)).toBe(true)
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
                  currency: 'nanoWits',
                },
              },
            },
          },
        })
      )

      expect(wrapper.contains(Send)).toBe(false)
    })

    it('should be visible when property isSendVisible is true', () => {
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
                  currency: 'nanoWits',
                },
              },
            },
          },
        })
      )
      wrapper.setData({
        isSendVisible: true,
      })

      expect(wrapper.contains(Send)).toBe(true)
    })

    it('BalanceButtons event send should show the modal', () => {
      // TODO: emit event from balanceData component
      const wrapper = mount(
        Balance,
        createComponentMocks({
          stubs: {
            Send: true,
          },
          store: {
            wallet: {
              state: {
                balance: {
                  available: '1',
                  locked: '10',
                  total: '100',
                  currency: 'nanoWits',
                  networkStatus: '',
                },
              },
            },
          },
        })
      )

      wrapper.find(BalanceButtons).vm.$emit('send')

      expect(wrapper.find(Send).isVisible()).toBe(true)
    })

    it('BalanceButtons event receive should do something TBD', () => {
      // TODO: handle event when addresses implemented
    })
  })
})
