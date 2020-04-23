import { shallowMount } from '@vue/test-utils'
import Transaction from '@/components/Transaction.vue'
import '../../../../src/fontAwesome'

describe('Renders the correct elements when click is not triggered', () => {
  const wrapper = shallowMount(Transaction, {
    propsData: {
      currency: 'nanoWits',
      amount: '123',
      block: '511482fc9161cd17545561449c0d7aae19c9986e4119db355bb9637c7804003f',
      border: true,
      date: 'JAN 19, 1970 @ 10:00:31',
      timeAgo: '33 minutes ago',
      fee: 12,
      id: '600338d94f4ef28281fbe37d5c82cf721d677f88f256be12cfae6498ed972109',
      outputs: [
        { value: '123', address: 'twit1vclrvjt7jf4jk8phyvxukctwsh0l0f8v9r8ffq' },
        { value: '499999999865', address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44' },
      ],
      inputs: [{ value: '500000000000', address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44' }],
      type: 'POSITIVE',
      state: 'IN PROGRESS',
      transactionType: 'value_transfer',
    },
  })
  wrapper.setData({
    showDetails: false,
  })
  it('finds negative or positive icon', () => {
    expect(wrapper.contains('[data-test="negative-positive"]')).toBe(true)
  })
  it('finds the amount element', () => {
    expect(wrapper.contains('[data-test="amount"]')).toBe(true)
  })
  it('finds the currency element', () => {
    expect(wrapper.find('[data-test="currency"]').text()).toEqual('nanoWits')
  })
  it('finds the origin element', () => {
    expect(wrapper.contains('[data-test="origin"]')).toBe(true)
  })
  it('finds the address element', () => {
    expect(wrapper.contains('[data-test="address"]')).toBe(true)
  })
  it('does not find the data request element when the transaction type is value_transfer', () => {
    expect(wrapper.contains('[data-test="data-request-type"]')).toBe(false)
  })
  it('finds the time-ago element', () => {
    expect(wrapper.contains('[data-test="time-ago"]')).toBe(true)
  })
  it('does not find the transaction details element when the click is not triggered', () => {
    expect(wrapper.contains('[data-test="transaction-details"]')).toBe(false)
  })
  it('does not find the inputs and outputs element when the click is not triggered', () => {
    expect(wrapper.contains('[data-test="inputs-outputs"]')).toBe(false)
  })
})

describe('Renders the correct elements when click is triggered and the transaction type is data_request', () => {
  const wrapper = shallowMount(Transaction, {
    propsData: {
      currency: 'nanoWits',
      amount: '123',
      block: '511482fc9161cd17545561449c0d7aae19c9986e4119db355bb9637c7804003f',
      border: true,
      date: 'JAN 19, 1970 @ 10:00:31',
      timeAgo: '33 minutes ago',
      fee: 12,
      id: '600338d94f4ef28281fbe37d5c82cf721d677f88f256be12cfae6498ed972109',
      outputs: [
        { value: '123', address: 'twit1vclrvjt7jf4jk8phyvxukctwsh0l0f8v9r8ffq' },
        { value: '499999999865', address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44' },
      ],
      inputs: [{ value: '500000000000', address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44' }],
      type: 'POSITIVE',
      state: 'IN PROGRESS',
      transactionType: 'data_request',
    },
  })
  wrapper.setData({
    showDetails: true,
  })
  it('finds negative or positive icon', () => {
    expect(wrapper.contains('[data-test="negative-positive"]')).toBe(true)
  })
  it('finds the amount element', () => {
    expect(wrapper.contains('[data-test="amount"]')).toBe(true)
  })
  it('finds the currency element', () => {
    expect(wrapper.find('[data-test="currency"]').text()).toEqual('nanoWits')
  })
  it('does not find the data request element when the origin element when type is data_request', () => {
    expect(wrapper.contains('[data-test="origin"]')).toBe(false)
  })
  it('does not find the data request element when the address element when type is data_request', () => {
    expect(wrapper.contains('[data-test="address"]')).toBe(false)
  })
  it('finds the data-request-type element', () => {
    expect(wrapper.contains('[data-test="data-request-type"]')).toBe(true)
  })
  it('finds the time-ago element', () => {
    expect(wrapper.contains('[data-test="time-ago"]')).toBe(true)
  })
  it('does not find the transaction details element when the click is not triggered', () => {
    expect(wrapper.contains('[data-test="transaction-details"]')).toBe(true)
  })
  it('does not find the inputs and outputs element when the click is not triggered', () => {
    expect(wrapper.contains('[data-test="inputs-outputs"]')).toBe(true)
  })
})
