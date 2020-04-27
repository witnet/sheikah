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
    expect(wrapper.find('[data-test="inputs-value"]').text()).toEqual('500000000000 nanoWits')
  })
  it('finds the inputs title element', () => {
    expect(wrapper.contains('[data-test="inputs-index"]')).toBe(true)
  })
  it('finds the inputs title element', () => {
    expect(wrapper.find('[data-test="inputs-address"]').text()).toEqual(
      'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44'
    )
  })
  it('finds the output title element', () => {
    expect(wrapper.contains('[data-test="output-title"]')).toBe(true)
  })
  it('finds the output title element', () => {
    expect(wrapper.find('[data-test="output-value-0"]').text()).toEqual('123 nanoWits')
  })
  it('finds the output title element', () => {
    expect(wrapper.find('[data-test="output-index-0"]').text()).toEqual('# 0')
  })
  it('finds the outputs title element', () => {
    expect(wrapper.find('[data-test="output-address-0"]').text()).toEqual(
      'twit1vclrvjt7jf4jk8phyvxukctwsh0l0f8v9r8ffq'
    )
  })
  it('finds the output title element', () => {
    expect(wrapper.find('[data-test="output-value-1"]').text()).toEqual('499999999865 nanoWits')
  })
  it('finds the output title element', () => {
    expect(wrapper.find('[data-test="output-index-1"]').text()).toEqual('# 1')
  })
  it('finds the outputs title element', () => {
    expect(wrapper.find('[data-test="output-address-1"]').text()).toEqual(
      'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44'
    )
  })
  it('finds the currency element', () => {
    expect(wrapper.find('[data-test="currency"]').text()).toEqual('nanoWits')
  })
  it('finds the fee title element', () => {
    expect(wrapper.contains('[data-test="fee-title"]')).toBe(true)
  })
  it('finds the fee amount element', () => {
    expect(wrapper.find('[data-test="fee-amount"]').text()).toEqual('12 nanoWits')
  })
})
