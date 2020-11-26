import TransactionList from '@/components/TransactionList.vue'
import Transaction from '@/components/Transaction.vue'
// eslint-disable-next-line import/no-relative-parent-imports

const TransactionMock = {
  id: '3fd836aed72e79d7ae80cde032b554f43b9a70efce22211f954f5148c21040fd',
  type: 'POSITIVE',
  inputs: null,
  timelocked: false,
  epoch: 5345,
  outputs: [
    {
      value: 250000000000,
      address: 'twit1yy2eplt7zpnvycspnc96wse485ezwmzd6kzlxg',
    },
    {
      value: 250000000000,
      address: 'twit1sraz4xlpec7kyng4g75gslwylxd3hw5fukvvj2',
    },
  ],
  fee: 0,
  date: 'JUN 04, 2020 @ 18:40:00',
  timestamp: 1591288800,
  label: '',
  amount: 0,
  block: '006c56477fe98e3190579c16c80b929224ac561839d2c6e44310a3f16bc11522',
  witnesses: null,
  rewards: null,
  rounds: null,
  currentStage: 'IN PROGRESS',
  reveals: null,
  finalResult: null,
  transactionType: 'mint',
}
const transactionsMock = [...new Array(87)].map((tx, index)=> {
  return {
    ...TransactionMock,
    amount: index,
    id: index.toString()
  }
})

describe('Renders the correct elements when click is not triggered', () => {

  it('renders the correct transactions when clicking page', async () => {
    const wrapper = mount(TransactionList, {
      ...createComponentMocks({
        store: {
          wallet: {
            state: {
              currency: 'nanoWit',
            },
          },
        },
      }),
      propsData: {
        transactions: transactionsMock,
        currency: 'nanoWit',
        totalTransactions: 87,
      },
    })
    const pageButton = wrapper.find('.number')[2]
    // console.log(wrapper.find('.number'))
    await pageButton.trigger('click')
    expect(wrapper.find('[data-test="amount"]').text()).toBe(
      '14',
    )
  })

  it('render the number of transactions', () => {
    const wrapper = shallowMount(TransactionList, {
      propsData: {
        transactions: transactionsMock,
        currency: 'nanoWit',
        totalTransactions: 87,
      },
    })
    expect(wrapper.find('[data-test="transactions-length"]').text()).toBe(
      '87 transactions',
    )
  })

  it('render empty state without transactions as prop', () => {
    const wrapper = shallowMount(TransactionList, {
      propsData: {
        transactions: [],
        currency: 'nanoWit',
        totalTransactions: 0,
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
        totalTransactions: 3,
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
        totalTransactions: 3,
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
          totalTransactions: 87,
        },
      })

      expect(wrapper.findAllComponents(Transaction).length).toBe(87)
    })

    it('should render 15 addresses', () => {
      const wrapper = shallowMount(TransactionList, {
        propsData: {
          transactions: transactionsMock,
          currency: 'nanoWit',
          totalTransactions: 36,
        },
      })

      expect(wrapper.find('[data-test="pagination"]').isVisible()).toBe(true)
    })
  })
})
