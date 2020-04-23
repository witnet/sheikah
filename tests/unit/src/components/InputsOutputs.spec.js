import { shallowMount } from '@vue/test-utils'
import InputsOutputs from '@/components/InputsOutputs.vue'
import '../../../../src/fontAwesome'

describe('Renders the correct elements when the transaction type is value_transfer', () => {
  const wrapper = shallowMount(InputsOutputs, {
    propsData: {
      currency: 'nanoWits',
      fee: 12,
      outputs: [
        { value: '123', address: 'twit1vclrvjt7jf4jk8phyvxukctwsh0l0f8v9r8ffq' },
        { value: '499999999865', address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44' },
      ],
      inputs: [{ value: '500000000000', address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44' }],
    },
  })
  it('finds the inputs title element', () => {
    expect(wrapper.contains('[data-test="inputs-title"]')).toBe(true)
  })
  it('finds the inputs title element', () => {
    expect(wrapper.contains('[data-test="inputs-value"]')).toBe(true)
  })
  it('finds the inputs title element', () => {
    expect(wrapper.contains('[data-test="inputs-index"]')).toBe(true)
  })
  it('finds the inputs title element', () => {
    expect(wrapper.contains('[data-test="inputs-address"]')).toBe(true)
  })
  it('finds the inputs title element', () => {
    expect(wrapper.contains('[data-test="output-title"]')).toBe(true)
  })
  it('finds the inputs title element', () => {
    expect(wrapper.contains('[data-test="output-value"]')).toBe(true)
  })
  it('finds the inputs title element', () => {
    expect(wrapper.contains('[data-test="output-index"]')).toBe(true)
  })
  it('finds the outputs title element', () => {
    expect(wrapper.contains('[data-test="output-address"]')).toBe(true)
  })
  it('finds the currency element', () => {
    expect(wrapper.contains('[data-test="currency"]')).toBe(true)
  })
  it('finds the fee title element', () => {
    expect(wrapper.contains('[data-test="fee-title"]')).toBe(true)
  })
  it('finds the fee amount element', () => {
    expect(wrapper.contains('[data-test="fee-amount"]')).toBe(true)
  })
})
