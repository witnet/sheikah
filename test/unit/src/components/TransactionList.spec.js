import TransactionList from '@/components/TransactionList.vue'
import Transaction from '@/components/Transaction.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import i18n from '@/plugins/i18n'
import { createMockStore } from '../../utils'
const setCurrentTransactionsPageActionMock = vi.fn()
const setCurrentTransactionsPageMutationMock = vi.fn()

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
  const mockStore = createMockStore({
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
  })
  return {
    global: {
      plugins: [i18n, mockStore],
    },
    props: {
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
  test('setCurrentTransactionsPage action is called when clicking next button', async () => {
    const wrapper = mount(TransactionList, getData())

    const pageButton = wrapper.find('.btn-next')
    await pageButton.trigger('click')

    expect(setCurrentTransactionsPageActionMock).toHaveBeenCalled()
  })

  test('the current page changes when clicking the next button', async () => {
    const wrapper = mount(TransactionList, getData())

    for (let i = 2; i < 7; i++) {
      const pageButton = wrapper.find('.btn-next')
      await pageButton.trigger('click')

      expect(wrapper.vm.currentPage).toBe(i)
    }
  })

  test('the current page changes when clicking the next button', async () => {
    const wrapper = mount(TransactionList, getData())

    for (let i = 2; i < 8; i++) {
      const pageButton = wrapper.find('.btn-next')
      await pageButton.trigger('click')
    }

    expect(wrapper.vm.currentPage).toBe(7)
  })
})

describe('Renders the correct elements when click is not triggered', () => {
  test('render the number of transactions', () => {
    const wrapper = mount(TransactionList, getData())

    expect(wrapper.find('[data-test="transactions-length"]').text()).toContain(
      'Transactions 87 transactions',
    )
  })

  test('render empty state without transactions as prop', () => {
    const wrapper = shallowMount(TransactionList, {
      props: {
        transactions: [],
        unit: 'nanoWit',
        transactionsLength: '0',
      },
    })

    expect(wrapper.find('[data-test="empty-transactions"]').isVisible()).toBe(
      true,
    )
  })

  test('should render less than 13 address', () => {
    const wrapper = shallowMount(TransactionList, {
      props: {
        transactions: getTransactionsMock(3),
        unit: 'nanoWit',
        transactionsLength: '3',
      },
    })

    expect(wrapper.findAllComponents(Transaction).length).toBe(3)
  })

  test('should not render the pagination with less than 13 address', () => {
    const wrapper = shallowMount(TransactionList, {
      props: {
        transactions: getTransactionsMock(3),
        unit: 'nanoWit',
        transactionsLength: '3',
      },
    })

    expect(wrapper.find('[data-test="pagination"]').isVisible()).toBe(false)
  })

  describe('should render the pagination with more than 13 address', () => {
    test('should render pagination', () => {
      const wrapper = mount(TransactionList, getData())

      expect(wrapper.findAllComponents(Transaction).length).toBe(13)
    })

    test('should render 15 addresses', () => {
      const wrapper = mount(TransactionList, getData())

      expect(wrapper.find('[data-test="pagination"]').isVisible()).toBe(true)
    })
  })
})
