import BalanceData from '@/components/BalanceData.vue'

describe('Balance.vue', () => {
  const mockStore = createMocks({
    storeModules: {
      wallet: {
        state: {
          unit: 'nanoWits',
        },
      },
    },
  })
  test('should render the available amount', () => {
    const wrapper = shallowMount(BalanceData, {
      props: {
        available: '1',
        locked: '10',
        unconfirmed: '0',
        total: '100',
        unit: 'nanoWits',
      },
      ...mockStore,
    })

    expect(wrapper.find('[data-test="available"]').exists()).toBe(true)
  })

  test('should render the locked amount', () => {
    const wrapper = shallowMount(BalanceData, {
      props: {
        available: '1',
        locked: '10',
        unconfirmed: '0',
        total: '100',
        unit: 'nanoWits',
      },
      ...mockStore,
    })

    expect(wrapper.find('[data-test="locked"]').exists()).toBe(true)
  })

  test('should render the total amount', () => {
    const wrapper = shallowMount(BalanceData, {
      props: {
        available: '1',
        locked: '10',
        unconfirmed: '0',
        total: '100',
        unit: 'nanoWits',
      },
      ...mockStore,
    })
    expect(wrapper.find('[data-test="total"]').exists()).toBe(true)
  })

  test('should render the unconfirmed amount', () => {
    const wrapper = shallowMount(BalanceData, {
      props: {
        available: '1',
        locked: '10',
        unconfirmed: '10',
        total: '100',
        unit: 'nanoWits',
      },
      ...mockStore,
    })
    expect(wrapper.find('[data-test="unconfirmed"]').exists()).toBe(true)
  })
})
