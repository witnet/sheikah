import BalanceData from '@/components/BalanceData'

describe.skip('Balance.vue', () => {
  it('should render the available amount', () => {
    const wrapper = shallowMount(BalanceData, {
      propsData: {
        available: '1',
        locked: '10',
        total: '100',
        unit: 'nanoWits',
      },
    })

    expect(
      wrapper
        .findAll('p')
        .at(0)
        .text(),
    ).toBe('Available')
    expect(
      wrapper
        .findAll('p')
        .at(1)
        .text(),
    ).toBe('1 nanoWits')
  })

  it('should render the locked amount', () => {
    const wrapper = shallowMount(BalanceData, {
      propsData: {
        available: '1',
        locked: '10',
        total: '100',
        unit: 'nanoWits',
      },
    })

    expect(
      wrapper
        .findAll('p')
        .at(2)
        .text(),
    ).toBe('Locked')
    expect(
      wrapper
        .findAll('p')
        .at(3)
        .text(),
    ).toBe('10 nanoWits')
  })

  it('should render the total amount', () => {
    const wrapper = shallowMount(BalanceData, {
      propsData: {
        available: '1',
        locked: '10',
        total: '100',
        unit: 'nanoWits',
      },
    })

    expect(
      wrapper
        .findAll('p')
        .at(4)
        .text(),
    ).toBe('Total')
    expect(
      wrapper
        .findAll('p')
        .at(5)
        .text(),
    ).toBe('100 nanoWits')
  })
})
