import BalanceData from '@/components/BalanceData.vue'

describe('Balance.vue', () => {
  it('should render the available amount', () => {
    const wrapper = shallowMount(BalanceData, {
      ...createComponentMocks({
        store: {
          wallet: {
            state: {
              unit: 'nanoWits',
            },
          },
        },
      }),
      propsData: {
        available: '1',
        locked: '10',
        unconfirmed: '0',
        total: '100',
        unit: 'nanoWits',
      },
    })

    expect(wrapper.find('[data-test="available"]').exists()).toBe(true)
  })

  it('should render the locked amount', () => {
    const wrapper = shallowMount(BalanceData, {
      ...createComponentMocks({
        store: {
          wallet: {
            state: {
              unit: 'nanoWits',
            },
          },
        },
      }),
      propsData: {
        available: '1',
        locked: '10',
        unconfirmed: '0',
        total: '100',
        unit: 'nanoWits',
      },
    })

    expect(wrapper.find('[data-test="locked"]').exists()).toBe(true)
  })

  it('should render the total amount', () => {
    const wrapper = shallowMount(BalanceData, {
      ...createComponentMocks({
        store: {
          wallet: {
            state: {
              unit: 'nanoWits',
            },
          },
        },
      }),
      propsData: {
        available: '1',
        locked: '10',
        unconfirmed: '0',
        total: '100',
        unit: 'nanoWits',
      },
    })
    expect(wrapper.find('[data-test="total"]').exists()).toBe(true)
  })

  it('should render the unconfirmed amount', () => {
    const wrapper = shallowMount(BalanceData, {
      ...createComponentMocks({
        store: {
          wallet: {
            state: {
              unit: 'nanoWits',
            },
          },
        },
      }),
      propsData: {
        available: '1',
        locked: '10',
        unconfirmed: '10',
        total: '100',
        unit: 'nanoWits',
      },
    })
    expect(wrapper.find('[data-test="unconfirmed"]').exists()).toBe(true)
  })
})
