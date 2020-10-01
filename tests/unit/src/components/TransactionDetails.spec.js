import TransactionDetails from '@/components/TransactionDetails.vue'
import '@/fontAwesome'

describe('Renders the correct elements when the transaction type is value_transfer', () => {
  const wrapper = shallowMount(TransactionDetails, {
    propsData: {
      block: '511482fc9161cd17545561449c0d7aae19c9986e4119db355bb9637c7804003f',
      date: 'JAN 19, 1970 @ 10:00:31',
      timelocked: false,
      epoch: 5342,
      id: '600338d94f4ef28281fbe37d5c82cf721d677f88f256be12cfae6498ed972109',
      transactionType: 'value_transfer',
    },
  })
  it('finds the id element', () => {
    expect(wrapper.find('[data-test="id"]').text()).toBe(
      '600338d94f4ef28281fbe37d5c82cf721d677f88f256be12cfae6498ed972109',
    )
  })
  it('finds the block element', () => {
    expect(wrapper.find('[data-test="block"]').text()).toBe(
      '511482fc9161cd17545561449c0d7aae19c9986e4119db355bb9637c7804003f',
    )
  })
  it('finds the date element', () => {
    expect(wrapper.find('[data-test="date"]').text()).toBe(
      'JAN 19, 1970 @ 10:00:31',
    )
  })
  it('finds the current-stage-title element', () => {
    expect(wrapper.contains('[data-test="current-stage-title"]')).toBe(false)
  })
  it('does not find the witnesses-title element', () => {
    expect(wrapper.contains('[data-test="witnesses-title"]')).toBe(false)
  })
  it('does not find the witnesses-title element', () => {
    expect(wrapper.contains('[data-test="witnesses-title"]')).toBe(false)
  })
  it('does not find the witnesses element', () => {
    expect(wrapper.contains('[data-test="witnesses"]')).toBe(false)
  })
  it('does not find the rewards-title element', () => {
    expect(wrapper.contains('[data-test="rewards-title"]')).toBe(false)
  })
  it('does not find the rewards element', () => {
    expect(wrapper.contains('[data-test="rewards"]')).toBe(false)
  })
  it('does not find the rewards-title element', () => {
    expect(wrapper.contains('[data-test="rewards-title"]')).toBe(false)
  })
  it('does not find the rewards element', () => {
    expect(wrapper.contains('[data-test="rewards"]')).toBe(false)
  })
  it('does not find the rounds-title element', () => {
    expect(wrapper.contains('[data-test="rounds-title"]')).toBe(false)
  })
  it('does not find the rounds element', () => {
    expect(wrapper.contains('[data-test="rounds"]')).toBe(false)
  })
  it('does not find the current-stage-title element', () => {
    expect(wrapper.contains('[data-test="current-stage-title"]')).toBe(false)
  })
  it('does not find the current-stage element', () => {
    expect(wrapper.contains('[data-test="current-stage"]')).toBe(false)
  })
  it('does not find the reveals-title element', () => {
    expect(wrapper.contains('[data-test="reveals-title"]')).toBe(false)
  })
  it('does not find the reveals element', () => {
    expect(wrapper.contains('[data-test="reveals"]')).toBe(false)
  })
  it('does not find the reveals element', () => {
    expect(wrapper.contains('[data-test="reveals"]')).toBe(false)
  })
  it('does not find the reveal-icon element', () => {
    expect(wrapper.contains('[data-test="reveal-icon"]')).toBe(false)
  })
  it('does not find the reveal-address element', () => {
    expect(wrapper.contains('[data-test="reveal-address"]')).toBe(false)
  })
  it('does not find the reveal-result element', () => {
    expect(wrapper.contains('[data-test="reveal-result"]')).toBe(false)
  })
  it('does not find the result-title element', () => {
    expect(wrapper.contains('[data-test="result-title"]')).toBe(false)
  })
  it('does not find the result element', () => {
    expect(wrapper.contains('[data-test="result"]')).toBe(false)
  })
})

describe('Renders the correct elements when the transaction type is data_request and some fields are missing', () => {
  const wrapper = shallowMount(TransactionDetails, {
    propsData: {
      block: '511482fc9161cd17545561449c0d7aae19c9986e4119db355bb9637c7804003f',
      date: 'JAN 19, 1970 @ 10:00:31',
      timelocked: false,
      epoch: 5342,
      id: '600338d94f4ef28281fbe37d5c82cf721d677f88f256be12cfae6498ed972109',
      transactionType: 'data_request',
      state: 'IN PROGRESS',
    },
  })
  it('finds the id element', () => {
    expect(wrapper.find('[data-test="id"]').text()).toBe(
      '600338d94f4ef28281fbe37d5c82cf721d677f88f256be12cfae6498ed972109',
    )
  })
  it('finds the block element', () => {
    expect(wrapper.find('[data-test="block"]').text()).toBe(
      '511482fc9161cd17545561449c0d7aae19c9986e4119db355bb9637c7804003f',
    )
  })
  it('finds the date element', () => {
    expect(wrapper.find('[data-test="date"]').text()).toBe(
      'JAN 19, 1970 @ 10:00:31',
    )
  })
  it('finds the current-stage-title element', () => {
    expect(wrapper.contains('[data-test="current-stage-title"]')).toBe(true)
  })
  it('does not find the witnesses-title element', () => {
    expect(wrapper.contains('[data-test="witnesses-title"]')).toBe(false)
  })
  it('does not find the witnesses-title element', () => {
    expect(wrapper.contains('[data-test="witnesses-title"]')).toBe(false)
  })
  it('does not find the witnesses element', () => {
    expect(wrapper.contains('[data-test="witnesses"]')).toBe(false)
  })
  it('does not find the rewards-title element', () => {
    expect(wrapper.contains('[data-test="rewards-title"]')).toBe(false)
  })
  it('does not find the rewards element', () => {
    expect(wrapper.contains('[data-test="rewards"]')).toBe(false)
  })
  it('does not find the rewards-title element', () => {
    expect(wrapper.contains('[data-test="rewards-title"]')).toBe(false)
  })
  it('does not find the rewards element', () => {
    expect(wrapper.contains('[data-test="rewards"]')).toBe(false)
  })
  it('does not find the rounds-title element', () => {
    expect(wrapper.contains('[data-test="rounds-title"]')).toBe(false)
  })
  it('does not find the rounds element', () => {
    expect(wrapper.contains('[data-test="rounds"]')).toBe(false)
  })
  it('finds the current-stage-title element', () => {
    expect(wrapper.contains('[data-test="current-stage-title"]')).toBe(true)
  })
  it('finds the current-stage element', () => {
    expect(wrapper.contains('[data-test="current-stage"]')).toBe(true)
  })
  it('does not find the reveals-title element', () => {
    expect(wrapper.contains('[data-test="reveals-title"]')).toBe(false)
  })
  it('does not find the reveals element', () => {
    expect(wrapper.contains('[data-test="reveals"]')).toBe(false)
  })
  it('does not find the reveals element', () => {
    expect(wrapper.contains('[data-test="reveals"]')).toBe(false)
  })
  it('does not find the reveal-icon element', () => {
    expect(wrapper.contains('[data-test="reveal-icon"]')).toBe(false)
  })
  it('does not find the reveal-address element', () => {
    expect(wrapper.contains('[data-test="reveal-address"]')).toBe(false)
  })
  it('does not find the reveal-result element', () => {
    expect(wrapper.contains('[data-test="reveal-result"]')).toBe(false)
  })
  it('does not find the result-title element', () => {
    expect(wrapper.contains('[data-test="result-title"]')).toBe(false)
  })
  it('does not find the result element', () => {
    expect(wrapper.contains('[data-test="result"]')).toBe(true)
  })
})

describe('Renders the correct elements when the transaction type is data_request and all the props are provided', () => {
  const wrapper = shallowMount(TransactionDetails, {
    propsData: {
      block: '511482fc9161cd17545561449c0d7aae19c9986e4119db355bb9637c7804003f',
      date: 'JAN 19, 1970 @ 10:00:31',
      id: '600338d94f4ef28281fbe37d5c82cf721d677f88f256be12cfae6498ed972109',
      state: 'IN PROGRESS',
      transactionType: 'data_request',
      witnesses: { min: 'min', backup: 'backup' },
      rewards: { witness: 'reward', miners: 'reward' },
      rounds: { commit: 'round', reveal: 'round' },
      timelocked: false,
      epoch: 5342,
      reveals: [
        {
          in_consensus: true,
          address: 'address',
          result: 'result',
        },
        { in_consensus: false, address: 'address', result: 'result' },
      ],
      result: 'RadonInteger(52)',
    },
  })
  it('finds the id element', () => {
    expect(wrapper.find('[data-test="id"]').text()).toBe(
      '600338d94f4ef28281fbe37d5c82cf721d677f88f256be12cfae6498ed972109',
    )
  })
  it('finds the block element', () => {
    expect(wrapper.find('[data-test="block"]').text()).toBe(
      '511482fc9161cd17545561449c0d7aae19c9986e4119db355bb9637c7804003f',
    )
  })
  it('finds the date element', () => {
    expect(wrapper.find('[data-test="date"]').text()).toBe(
      'JAN 19, 1970 @ 10:00:31',
    )
  })
  it('finds the current-stage-title element', () => {
    expect(wrapper.contains('[data-test="current-stage-title"]')).toBe(true)
  })
  it('finds the witnesses-title element', () => {
    expect(wrapper.contains('[data-test="witnesses-title"]')).toBe(true)
  })
  it('finds the witnesses-title element', () => {
    expect(wrapper.contains('[data-test="witnesses-title"]')).toBe(true)
  })
  it('finds the witnesses element', () => {
    expect(wrapper.contains('[data-test="witnesses"]')).toBe(true)
  })
  it('finds the rewards-title element', () => {
    expect(wrapper.contains('[data-test="rewards-title"]')).toBe(true)
  })
  it('finds the rewards element', () => {
    expect(wrapper.contains('[data-test="rewards"]')).toBe(true)
  })
  it('finds the rewards-title element', () => {
    expect(wrapper.contains('[data-test="rewards-title"]')).toBe(true)
  })
  it('finds the rewards element', () => {
    expect(wrapper.contains('[data-test="rewards"]')).toBe(true)
  })
  it('finds the rounds-title element', () => {
    expect(wrapper.contains('[data-test="rounds-title"]')).toBe(true)
  })
  it('finds the rounds element', () => {
    expect(wrapper.contains('[data-test="rounds"]')).toBe(true)
  })
  it('finds the current-stage-title element', () => {
    expect(wrapper.contains('[data-test="current-stage-title"]')).toBe(true)
  })
  it('finds the current-stage element', () => {
    expect(wrapper.contains('[data-test="current-stage"]')).toBe(true)
  })
  it('finds the reveals-title element', () => {
    expect(wrapper.contains('[data-test="reveals-title"]')).toBe(true)
  })
  it('finds the reveals element', () => {
    expect(wrapper.contains('[data-test="reveals"]')).toBe(true)
  })
  it('finds the reveal-icon element', () => {
    expect(wrapper.contains('[data-test="reveal-icon"]')).toBe(true)
  })
  it('finds the not-consensed class', () => {
    expect(wrapper.contains('.not-consensed')).toBe(true)
  })
  it('finds the consensed class', () => {
    expect(wrapper.contains('.consensed')).toBe(true)
  })
  it('finds the reveal-icon element', () => {
    expect(wrapper.contains('[data-test="reveal-icon"]')).toBe(true)
  })
  it('finds the reveal-result element', () => {
    expect(wrapper.contains('[data-test="reveal-result"]')).toBe(true)
  })
  it('does not find the result-title element', () => {
    expect(wrapper.contains('[data-test="result-title"]')).toBe(true)
  })
  it('finds the result element', () => {
    expect(wrapper.contains('[data-test="result"]')).toBe(true)
  })
})

describe('adds the correct class to reveal icon when all the reveals are in consensus', () => {
  const wrapper = shallowMount(TransactionDetails, {
    propsData: {
      block: '511482fc9161cd17545561449c0d7aae19c9986e4119db355bb9637c7804003f',
      id: '600338d94f4ef28281fbe37d5c82cf721d677f88f256be12cfae6498ed972109',
      transactionType: 'data_request',
      epoch: 5342,
      timelocked: false,
      reveals: [
        {
          in_consensus: true,
          address: 'address',
          result: 'result',
        },
        { in_consensus: true, address: 'address', result: 'result' },
      ],
    },
  })
  it('finds the not-consensed class', () => {
    expect(wrapper.contains('.not-consensed')).toBe(false)
  })
  it('finds the consensed class', () => {
    expect(wrapper.contains('.consensed')).toBe(true)
  })
})
