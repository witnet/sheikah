import Transaction from '@/components/Transaction.vue'
import '@/fontAwesome'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { createMocks } from '../../utils'

describe('Renders the correct elements when click is not triggered', () => {
  const mockStore = createMocks({
    storeModules: {
      wallet: {
        state: {
          unit: 'nanoWit',
        },
      },
    },
  })
  const wrapper = mount(Transaction, {
    props: {
      amount: '123',
      confirmed: true,
      block: '511482fc9161cd17545561449c0d7aae19c9986e4119db355bb9637c7804003f',
      border: true,
      date: 'JAN 19, 1970 @ 10:00:31',
      timeAgo: '33 minutes ago',
      timelocked: false,
      epoch: '5432',
      fee: '12',
      id: '600338d94f4ef28281fbe37d5c82cf721d677f88f256be12cfae6498ed972109',
      outputs: [
        {
          value: '123',
          address: 'twit1vclrvjt7jf4jk8phyvxukctwsh0l0f8v9r8ffq',
        },
        {
          value: 499999999865,
          address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44',
        },
      ],
      inputs: [
        {
          value: 500000000000,
          address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44',
        },
      ],
      type: 'POSITIVE',
      state: 'IN PROGRESS',
      transactionType: 'value_transfer',
      reveals: [],
      unit: 'nanoWits',
    },
    data() {
      return {
        showDetails: false,
      }
    },
    ...mockStore,
  })

  test('finds negative or positive icon', () => {
    expect(wrapper.find('[data-test="negative-positive"]').exists()).toBe(true)
  })

  test('finds the origin element', () => {
    expect(wrapper.find('[data-test="origin"]').text()).toEqual('From')
  })

  test('finds the address element', () => {
    expect(wrapper.find('[data-test="address-container"]').exists()).toBe(true)
  })

  test('does not find the data request element when the transaction type is value_transfer', () => {
    expect(wrapper.find('[data-test="transaction-type"]').exists()).toBe(false)
  })

  test('finds the time-ago element', () => {
    expect(wrapper.find('[data-test="time-ago"]').text()).toEqual(
      '33 minutes ago',
    )
  })

  test('does not find the transaction details element when the click is not triggered', () => {
    expect(wrapper.find('[data-test="transaction-details"]').exists()).toBe(
      false,
    )
  })

  test('does not find the inputs and outputs element when the click is not triggered', () => {
    expect(wrapper.find('[data-test="inputs-outputs"]').exists()).toBe(false)
  })
})

describe('data request', () => {
  describe('Renders the correct elements when click is triggered', () => {
    const mockStore = createMocks({
      storeModules: {
        wallet: {
          state: {
            unit: 'nanoWit',
          },
        },
      },
    })
    const wrapper = mount(Transaction, {
      props: {
        amount: '123',
        confirmed: true,
        timelocked: false,
        epoch: '5432',
        block:
          '511482fc9161cd17545561449c0d7aae19c9986e4119db355bb9637c7804003f',
        border: true,
        date: 'JAN 19, 1970 @ 10:00:31',
        timeAgo: '33 minutes ago',
        fee: '12',
        id: '600338d94f4ef28281fbe37d5c82cf721d677f88f256be12cfae6498ed972109',
        outputs: [
          {
            value: '123',
            address: 'twit1vclrvjt7jf4jk8phyvxukctwsh0l0f8v9r8ffq',
          },
          {
            value: 499999999865,
            address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44',
          },
        ],
        inputs: [
          {
            value: 500000000000,
            address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44',
          },
        ],
        type: 'POSITIVE',
        state: 'IN PROGRESS',
        transactionType: 'data_request',
        reveals: [],
        unit: 'nanoWits',
      },
      data() {
        return {
          showDetails: true,
        }
      },
      ...mockStore,
    })

    test('finds negative or positive icon', () => {
      expect(wrapper.find('[data-test="negative-positive"]').exists()).toBe(
        true,
      )
    })

    test('does not find the data request element when the origin element when type is data_request', () => {
      expect(wrapper.find('[data-test="origin"]').exists()).toBe(false)
    })

    test('does not find the data request element when the address element when type is data_request', () => {
      expect(wrapper.find('[data-test="address"]').exists()).toBe(false)
    })

    test('finds the type element', () => {
      expect(wrapper.find('[data-test="transaction-type"]').text()).toEqual(
        'Data request',
      )
    })

    test('finds the time-ago element', () => {
      expect(wrapper.find('[data-test="time-ago"]').text()).toEqual(
        '33 minutes ago',
      )
    })
  })
})

describe('Sending transaction', () => {
  describe('Renders the correct elements when the transaction is being sent to the chain', () => {
    const mockStore = createMocks({
      storeModules: {
        wallet: {
          state: {
            unit: 'nanoWit',
          },
        },
      },
    })
    const wrapper = mount(Transaction, {
      props: {
        amount: '123',
        confirmed: false,
        timelocked: false,
        epoch: '0',
        block: '0000000',
        border: true,
        date: 'JAN 19, 1970 @ 10:00:31',
        timeAgo: '33 minutes ago',
        fee: '12',
        id: '600338d94f4ef28281fbe37d5c82cf721d677f88f256be12cfae6498ed972109',
        outputs: [
          {
            value: '123',
            address: 'twit1vclrvjt7jf4jk8phyvxukctwsh0l0f8v9r8ffq',
          },
          {
            value: 499999999865,
            address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44',
          },
        ],
        inputs: null,
        type: 'POSITIVE',
        state: 'IN PROGRESS',
        transactionType: 'mint',
        reveals: [],
        unit: 'nanoWits',
      },
      data() {
        return {
          showDetails: true,
        }
      },
      ...mockStore,
    })

    test('should render Pending confirmation label instead of time ago', () => {
      expect(wrapper.find('[data-test="sending-tx"]').exists()).toBe(true)
    })

    test('should not find time ago alement', () => {
      expect(wrapper.find('[data-test="time-ago"]').exists()).toBe(false)
    })

    test('should not find pending confirmation status', () => {
      expect(wrapper.find('[data-test="pending-confirmation"]').exists()).toBe(
        false,
      )
    })

    test('should find time-ago element', () => {
      expect(wrapper.find('[data-test="sending-tx"]').text()).toEqual('Sending')
    })
  })
})

describe('Pending transaction', () => {
  describe('Renders the correct elements when the transaction is not confirmed', () => {
    const mockStore = createMocks({
      storeModules: {
        wallet: {
          state: {
            unit: 'nanoWit',
          },
        },
      },
    })
    const wrapper = mount(Transaction, {
      props: {
        amount: '123',
        confirmed: false,
        timelocked: false,
        epoch: '5432',
        block:
          '511482fc9161cd17545561449c0d7aae19c9986e4119db355bb9637c7804003f',
        border: true,
        date: 'JAN 19, 1970 @ 10:00:31',
        timeAgo: '33 minutes ago',
        fee: '12',
        id: '600338d94f4ef28281fbe37d5c82cf721d677f88f256be12cfae6498ed972109',
        outputs: [
          {
            value: '123',
            address: 'twit1vclrvjt7jf4jk8phyvxukctwsh0l0f8v9r8ffq',
          },
          {
            value: 499999999865,
            address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44',
          },
        ],
        inputs: null,
        type: 'POSITIVE',
        state: 'IN PROGRESS',
        transactionType: 'mint',
        reveals: [],
        unit: 'nanoWits',
      },
      data() {
        return {
          showDetails: true,
        }
      },
      ...mockStore,
    })

    test('should render Pending confirmation label instead of time ago', () => {
      expect(wrapper.find('[data-test="pending-confirmation"]').exists()).toBe(
        true,
      )
    })

    test('should not find time ago alement', () => {
      expect(wrapper.find('[data-test="time-ago"]').exists()).toBe(false)
    })

    test('should find time-ago element', () => {
      expect(wrapper.find('[data-test="pending-confirmation"]').text()).toEqual(
        'Pending confirmation',
      )
    })
  })
})

describe('mint', () => {
  describe('Renders the correct elements when click is triggered', () => {
    const wrapper = mount(Transaction, {
      data() {
        return {
          showDetails: true,
        }
      },
      props: {
        amount: '123',
        confirmed: true,
        timelocked: false,
        epoch: '5432',
        block:
          '511482fc9161cd17545561449c0d7aae19c9986e4119db355bb9637c7804003f',
        border: true,
        date: 'JAN 19, 1970 @ 10:00:31',
        timeAgo: '33 minutes ago',
        fee: '12',
        id: '600338d94f4ef28281fbe37d5c82cf721d677f88f256be12cfae6498ed972109',
        outputs: [
          {
            value: '123',
            address: 'twit1vclrvjt7jf4jk8phyvxukctwsh0l0f8v9r8ffq',
          },
          {
            value: 499999999865,
            address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44',
          },
        ],
        inputs: null,
        type: 'POSITIVE',
        state: 'IN PROGRESS',
        transactionType: 'mint',
        reveals: [],
        unit: 'nanoWits',
      },
      ...createMocks({
        storeModules: {
          wallet: {
            state: {
              unit: 'nanoWit',
            },
          },
        },
      }),
    })

    test('should finds negative or positive icon', () => {
      expect(wrapper.find('[data-test="negative-positive"]').exists()).toBe(
        true,
      )
    })

    test('should not find the origin element', () => {
      expect(wrapper.find('[data-test="origin"]').exists()).toBe(false)
    })

    test('should find time-ago element', () => {
      expect(wrapper.find('[data-test="time-ago"]').text()).toEqual(
        '33 minutes ago',
      )
    })
  })
})
