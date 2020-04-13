import LayoutTransactions from '@/components/LayoutTransactions'

describe('LayoutSidebar.vue', () => {
  it('render the addresses slot', () => {
    const addressesSlot = '<div>Addresses</div>'
    const balanceSlot = '<div>Balances</div>'
    const transactionsSlot = '<div>Transactions</div>'
    const { element } = shallowMount(LayoutTransactions, {
      slots: {
        addresses: addressesSlot,
        transactions: transactionsSlot,
        balance: balanceSlot,
      },
    })
    expect(element.innerHTML).toContain(addressesSlot)
  })

  it('render the transactions slot', () => {
    const addressesSlot = '<div>Addresses</div>'
    const balanceSlot = '<div>Balances</div>'
    const transactionsSlot = '<div>Transactions</div>'
    const { element } = shallowMount(LayoutTransactions, {
      slots: {
        addresses: addressesSlot,
        transactions: transactionsSlot,
        balance: balanceSlot,
      },
    })
    expect(element.innerHTML).toContain(balanceSlot)
  })

  it('render the transactions slot', () => {
    const addressesSlot = '<div>Addresses</div>'
    const balanceSlot = '<div>Balances</div>'
    const transactionsSlot = '<div>Transactions</div>'
    const { element } = shallowMount(LayoutTransactions, {
      slots: {
        addresses: addressesSlot,
        transactions: transactionsSlot,
        balance: balanceSlot,
      },
    })
    expect(element.innerHTML).toContain(transactionsSlot)
  })
})
