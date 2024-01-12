import TransactionList from '@/components/TransactionList.vue'
import Transaction from '@/components/Transaction.vue'
const setCurrentTransactionsPageActionMock = jest.fn()
const setCurrentTransactionsPageMutationMock = jest.fn()

function getTransactionsMock(num) {
  const TransactionMock = {
    id: '3fd836aed72e79d7ae80cde032b554f43b9a70efce22211f954f5148c21040fd',
    type: 'POSITIVE',
    inputs: null,
    timelocked: false,
    epoch: '5345',
    outputs: [
      {
        value: '250000000000',
        address: 'twit1yy2eplt7zpnvycspnc96wse485ezwmzd6kzlxg',
      },
      {
        value: '250000000000',
        address: 'twit1sraz4xlpec7kyng4g75gslwylxd3hw5fukvvj2',
      },
    ],
    fee: '0',
    date: 'JUN 04, 2020 @ 18:40:00',
    timestamp: 1591288800,
    label: '',
    amount: '0',
    block: '006c56477fe98e3190579c16c80b929224ac561839d2c6e44310a3f16bc11522',
    witnesses: null,
    rewards: null,
    rounds: null,
    currentStage: 'IN PROGRESS',
    reveals: null,
    finalResult: null,
    transactionType: 'mint',
  }
  const transactionsMock = [...new Array(num)].map((tx, index) => {
    return {
      ...TransactionMock,
      id: index.toString(),
    }
  })
  return transactionsMock
}

function getData() {
  return {
    ...createComponentMocks({
      store: {
        wallet: {
          state: {
            unit: 'nanoWit',
            currentTransactionsPage: 1,
            theme: 'light',
          },
          mutations: {
            setCurrentTransactionsPage: setCurrentTransactionsPageMutationMock,
          },
          actions: {
            setCurrentTransactionsPage: setCurrentTransactionsPageActionMock,
          },
        },
      },
    }),
    propsData: {
      transactions: getTransactionsMock(13),
      transactionsLength: '87',
      unit: 'nanoWit',
    },
    data() {
      return {
        currentPage: 1,
      }
    },
  }
}

describe('Changes the current page when clicking next button in pagination', () => {
  it('setCurrentTransactionsPage action is called when clicking next button', async () => {
    const wrapper = mount(TransactionList, getData())

    const pageButton = wrapper.find('.btn-next')
    await pageButton.trigger('click')

    expect(setCurrentTransactionsPageActionMock).toHaveBeenCalled()
  })

  it('the current page changes when clicking the next button', async () => {
    const wrapper = mount(TransactionList, getData())

    for (let i = 2; i < 7; i++) {
      const pageButton = wrapper.find('.btn-next')
      await pageButton.trigger('click')

      expect(wrapper.vm.currentPage).toBe(i)
    }
  })

  it('the current page changes when clicking the next button', async () => {
    const wrapper = mount(TransactionList, getData())

    for (let i = 2; i < 8; i++) {
      const pageButton = wrapper.find('.btn-next')
      await pageButton.trigger('click')
    }

    expect(wrapper.vm.currentPage).toBe(7)
  })
})

describe('Renders the correct elements when click is not triggered', () => {
  it('render the number of transactions', () => {
    const wrapper = mount(TransactionList, getData())

    expect(wrapper.find('[data-test="transactions-length"]').text()).toContain(
      'Transactions 87 transactions',
    )
  })

  it('render empty state without transactions as prop', () => {
    const wrapper = shallowMount(TransactionList, {
      ...i18n(),
      propsData: {
        transactions: [],
        unit: 'nanoWit',
        transactionsLength: '0',
      },
    })

    expect(wrapper.find('[data-test="empty-transactions"]').isVisible()).toBe(
      true,
    )
  })

  it('should render less than 13 address', () => {
    const wrapper = shallowMount(TransactionList, {
      ...i18n(),
      propsData: {
        transactions: getTransactionsMock(3),
        unit: 'nanoWit',
        transactionsLength: '3',
      },
    })

    expect(wrapper.findAllComponents(Transaction).length).toBe(3)
  })

  it('should not render the pagination with less than 13 address', () => {
    const wrapper = shallowMount(TransactionList, {
      ...i18n(),
      propsData: {
        transactions: getTransactionsMock(3),
        unit: 'nanoWit',
        transactionsLength: '3',
      },
    })

    expect(wrapper.find('[data-test="pagination"]').isVisible()).toBe(false)
  })

  describe('should render the pagination with more than 13 address', () => {
    it('should render pagination', () => {
      const wrapper = mount(TransactionList, getData())

      expect(wrapper.findAllComponents(Transaction).length).toBe(13)
    })

    it('should render 15 addresses', () => {
      const wrapper = mount(TransactionList, getData())

      expect(wrapper.find('[data-test="pagination"]').isVisible()).toBe(true)
    })
  })
})
