import InputsOutputs from '@/components/InputsOutputs.vue'
import '@/fontAwesome'

describe('Renders the correct elements when the transaction type is value_transfer', () => {
  const wrapper = shallowMount(InputsOutputs, {
    propsData: {
      fee: 12,
      outputs: [
        {
          index: 1,
          value: 123,
          address: 'twit1vclrvjt7jf4jk8phyvxukctwsh0l0f8v9r8ffq',
        },
        {
          index: 5,
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
      currency: 'nanoWits',
    },
  })

  it('finds the inputs title element', () => {
    expect(wrapper.find('[data-test="inputs-title"]').exists()).toBe(true)
  })

  it('finds the inputs title element', () => {
    expect(wrapper.find('[data-test="inputs-index"]').exists()).toBe(true)
  })

  it('finds the inputs title element', () => {
    expect(wrapper.find('[data-test="inputs-address"]').text()).toEqual(
      'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44',
    )
  })

  it('finds the output title element', () => {
    expect(wrapper.find('[data-test="output-title"]').exists()).toBe(true)
  })

  it('finds the output title element', () => {
    expect(wrapper.find('[data-test="output-index-1"]').text()).toEqual('# 1')
  })

  it('finds the outputs title element', () => {
    expect(wrapper.find('[data-test="output-address-1"]').text()).toEqual(
      'twit1vclrvjt7jf4jk8phyvxukctwsh0l0f8v9r8ffq',
    )
  })

  it('finds the output title element', () => {
    expect(wrapper.find('[data-test="output-index-5"]').text()).toEqual('# 5')
  })

  it('finds the outputs title element', () => {
    expect(wrapper.find('[data-test="output-address-5"]').text()).toEqual(
      'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44',
    )
  })

  it('finds the fee title element', () => {
    expect(wrapper.find('[data-test="fee-title"]').exists()).toBe(true)
  })
})
