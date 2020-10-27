import TransactionList from '@/components/TransactionList.vue'
import Transaction from '@/components/Transaction.vue'
// eslint-disable-next-line import/no-relative-parent-imports
import transactionsMock from '../../mocks/transactions'

describe('Renders the correct elements when click is not triggered', () => {
  it('render the number of transactions', () => {
    const wrapper = shallowMount(TransactionList, {
      propsData: {
        transactions: transactionsMock,
        currency: 'nanoWit',
      },
    })

    expect(wrapper.find('[data-test="transactions-length"]').text()).toBe(
      '36 transactions',
    )
  })

  it('render empty state without transactions as prop', () => {
    const wrapper = shallowMount(TransactionList, {
      propsData: {
        transactions: [],
        currency: 'nanoWit',
      },
    })

    expect(wrapper.find('[data-test="empty-transactions"]').isVisible()).toBe(
      true,
    )
  })

  it('should render less than 13 address', () => {
    const wrapper = shallowMount(TransactionList, {
      propsData: {
        transactions: [
          transactionsMock[0],
          transactionsMock[1],
          transactionsMock[2],
        ],
        currency: 'nanoWit',
      },
    })

    expect(wrapper.findAllComponents(Transaction).length).toBe(3)
  })

  it('should not render the pagination with less than 13 address', () => {
    const wrapper = shallowMount(TransactionList, {
      propsData: {
        transactions: [
          transactionsMock[0],
          transactionsMock[1],
          transactionsMock[2],
        ],
        currency: 'nanoWit',
      },
    })

    expect(wrapper.find('[data-test="pagination"]').isVisible()).toBe(false)
  })

  describe('should render the pagination with more than 13 address', () => {
    it('should render pagination', () => {
      const wrapper = shallowMount(TransactionList, {
        propsData: {
          transactions: transactionsMock,
          currency: 'nanoWit',
        },
      })

      expect(wrapper.findAllComponents(Transaction).length).toBe(13)
    })

    it('should render 15 addresses', () => {
      const wrapper = shallowMount(TransactionList, {
        propsData: {
          transactions: transactionsMock,
          currency: 'nanoWit',
        },
      })

      expect(wrapper.find('[data-test="pagination"]').isVisible()).toBe(true)
    })
  })
})
