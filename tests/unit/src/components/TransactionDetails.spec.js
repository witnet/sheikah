import TransactionDetails from '@/components/TransactionDetails.vue'
import '@/fontAwesome'

describe('Renders the correct elements when the transaction type is value_transfer', () => {
  const wrapper = shallowMount(TransactionDetails, {
    props: {
      block: '511482fc9161cd17545561449c0d7aae19c9986e4119db355bb9637c7804003f',
      date: 'JAN 19, 1970 @ 10:00:31',
      timelocked: false,
      epoch: 5342,
      id: '600338d94f4ef28281fbe37d5c82cf721d677f88f256be12cfae6498ed972109',
      transactionType: 'value_transfer',
    },
    ...createMocks(),
  })

  test('finds the id element', () => {
    expect(wrapper.find('[data-test="id"]').text()).toBe(
      '600338d94f4ef28281fbe37d5c82cf721d677f88f256be12cfae6498ed972109',
    )
  })

  test('finds the block element', () => {
    expect(wrapper.find('[data-test="block"]').text()).toBe(
      '511482fc9161cd17545561449c0d7aae19c9986e4119db355bb9637c7804003f',
    )
  })

  test('finds the date element', () => {
    expect(wrapper.find('[data-test="date"]').text()).toBe(
      'JAN 19, 1970 @ 10:00:31',
    )
  })

  test('finds the current-stage-title element', () => {
    expect(wrapper.find('[data-test="current-stage-title"]').exists()).toBe(
      false,
    )
  })

  test('does not find the witnesses-title element', () => {
    expect(wrapper.find('[data-test="witnesses-title"]').exists()).toBe(false)
  })

  test('does not find the witnesses-title element', () => {
    expect(wrapper.find('[data-test="witnesses-title"]').exists()).toBe(false)
  })

  test('does not find the witnesses element', () => {
    expect(wrapper.find('[data-test="witnesses"]').exists()).toBe(false)
  })

  test('does not find the rewards-title element', () => {
    expect(wrapper.find('[data-test="rewards-title"]').exists()).toBe(false)
  })

  test('does not find the rewards element', () => {
    expect(wrapper.find('[data-test="rewards"]').exists()).toBe(false)
  })

  test('does not find the rewards-title element', () => {
    expect(wrapper.find('[data-test="rewards-title"]').exists()).toBe(false)
  })

  test('does not find the rewards element', () => {
    expect(wrapper.find('[data-test="rewards"]').exists()).toBe(false)
  })

  test('does not find the rounds-title element', () => {
    expect(wrapper.find('[data-test="rounds-title"]').exists()).toBe(false)
  })

  test('does not find the rounds element', () => {
    expect(wrapper.find('[data-test="rounds"]').exists()).toBe(false)
  })

  test('does not find the current-stage-title element', () => {
    expect(wrapper.find('[data-test="current-stage-title"]').exists()).toBe(
      false,
    )
  })

  test('does not find the current-stage element', () => {
    expect(wrapper.find('[data-test="current-stage"]').exists()).toBe(false)
  })

  test('does not find the reveals-title element', () => {
    expect(wrapper.find('[data-test="reveals-title"]').exists()).toBe(false)
  })

  test('does not find the reveals element', () => {
    expect(wrapper.find('[data-test="reveals"]').exists()).toBe(false)
  })

  test('does not find the reveals element', () => {
    expect(wrapper.find('[data-test="reveals"]').exists()).toBe(false)
  })

  test('does not find the reveal-icon element', () => {
    expect(wrapper.find('[data-test="reveal-icon"]').exists()).toBe(false)
  })

  test('does not find the reveal-address element', () => {
    expect(wrapper.find('[data-test="reveal-address"]').exists()).toBe(false)
  })

  test('does not find the reveal-result element', () => {
    expect(wrapper.find('[data-test="reveal-result"]').exists()).toBe(false)
  })

  test('does not find the result-title element', () => {
    expect(wrapper.find('[data-test="result-title"]').exists()).toBe(false)
  })

  test('does not find the result element', () => {
    expect(wrapper.find('[data-test="result"]').exists()).toBe(false)
  })
})

describe('Renders the correct elements when the transaction type is data_request and some fields are missing', () => {
  const wrapper = shallowMount(TransactionDetails, {
    props: {
      block: '511482fc9161cd17545561449c0d7aae19c9986e4119db355bb9637c7804003f',
      date: 'JAN 19, 1970 @ 10:00:31',
      timelocked: false,
      epoch: 5342,
      id: '600338d94f4ef28281fbe37d5c82cf721d677f88f256be12cfae6498ed972109',
      transactionType: 'data_request',
      state: 'IN PROGRESS',
    },
    ...createMocks(),
  })

  test('finds the id element', () => {
    expect(wrapper.find('[data-test="id"]').text()).toBe(
      '600338d94f4ef28281fbe37d5c82cf721d677f88f256be12cfae6498ed972109',
    )
  })

  test('finds the block element', () => {
    expect(wrapper.find('[data-test="block"]').text()).toBe(
      '511482fc9161cd17545561449c0d7aae19c9986e4119db355bb9637c7804003f',
    )
  })

  test('finds the date element', () => {
    expect(wrapper.find('[data-test="date"]').text()).toBe(
      'JAN 19, 1970 @ 10:00:31',
    )
  })

  test('finds the current-stage-title element', () => {
    expect(wrapper.find('[data-test="current-stage-title"]').exists()).toBe(
      true,
    )
  })

  test('does not find the witnesses-title element', () => {
    expect(wrapper.find('[data-test="witnesses-title"]').exists()).toBe(false)
  })

  test('does not find the witnesses-title element', () => {
    expect(wrapper.find('[data-test="witnesses-title"]').exists()).toBe(false)
  })

  test('does not find the witnesses element', () => {
    expect(wrapper.find('[data-test="witnesses"]').exists()).toBe(false)
  })

  test('does not find the rewards-title element', () => {
    expect(wrapper.find('[data-test="rewards-title"]').exists()).toBe(false)
  })

  test('does not find the rewards element', () => {
    expect(wrapper.find('[data-test="rewards"]').exists()).toBe(false)
  })

  test('does not find the rewards-title element', () => {
    expect(wrapper.find('[data-test="rewards-title"]').exists()).toBe(false)
  })

  test('does not find the rewards element', () => {
    expect(wrapper.find('[data-test="rewards"]').exists()).toBe(false)
  })

  test('does not find the rounds-title element', () => {
    expect(wrapper.find('[data-test="rounds-title"]').exists()).toBe(false)
  })

  test('does not find the rounds element', () => {
    expect(wrapper.find('[data-test="rounds"]').exists()).toBe(false)
  })

  test('finds the current-stage-title element', () => {
    expect(wrapper.find('[data-test="current-stage-title"]').exists()).toBe(
      true,
    )
  })

  test('finds the current-stage element', () => {
    expect(wrapper.find('[data-test="current-stage"]').exists()).toBe(true)
  })

  test('does not find the reveals-title element', () => {
    expect(wrapper.find('[data-test="reveals-title"]').exists()).toBe(false)
  })

  test('does not find the reveals element', () => {
    expect(wrapper.find('[data-test="reveals"]').exists()).toBe(false)
  })

  test('does not find the reveals element', () => {
    expect(wrapper.find('[data-test="reveals"]').exists()).toBe(false)
  })

  test('does not find the reveal-icon element', () => {
    expect(wrapper.find('[data-test="reveal-icon"]').exists()).toBe(false)
  })

  test('does not find the reveal-address element', () => {
    expect(wrapper.find('[data-test="reveal-address"]').exists()).toBe(false)
  })

  test('does not find the reveal-result element', () => {
    expect(wrapper.find('[data-test="reveal-result"]').exists()).toBe(false)
  })

  test('does not find the result-title element', () => {
    expect(wrapper.find('[data-test="result-title"]').exists()).toBe(false)
  })

  test('does not find the result element', () => {
    expect(wrapper.find('[data-test="result"]').exists()).toBe(true)
  })
})

describe('Renders the correct elements when the transaction type is data_request and all the props are provided', () => {
  const wrapper = shallowMount(TransactionDetails, {
    props: {
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
    ...createMocks(),
  })

  test('finds the id element', () => {
    expect(wrapper.find('[data-test="id"]').text()).toBe(
      '600338d94f4ef28281fbe37d5c82cf721d677f88f256be12cfae6498ed972109',
    )
  })

  test('finds the block element', () => {
    expect(wrapper.find('[data-test="block"]').text()).toBe(
      '511482fc9161cd17545561449c0d7aae19c9986e4119db355bb9637c7804003f',
    )
  })

  test('finds the date element', () => {
    expect(wrapper.find('[data-test="date"]').text()).toBe(
      'JAN 19, 1970 @ 10:00:31',
    )
  })

  test('finds the current-stage-title element', () => {
    expect(wrapper.find('[data-test="current-stage-title"]').exists()).toBe(
      true,
    )
  })

  test('finds the witnesses-title element', () => {
    expect(wrapper.find('[data-test="witnesses-title"]').exists()).toBe(true)
  })

  test('finds the witnesses-title element', () => {
    expect(wrapper.find('[data-test="witnesses-title"]').exists()).toBe(true)
  })

  test('finds the witnesses element', () => {
    expect(wrapper.find('[data-test="witnesses"]').exists()).toBe(true)
  })

  test('finds the rewards-title element', () => {
    expect(wrapper.find('[data-test="rewards-title"]').exists()).toBe(true)
  })

  test('finds the rewards element', () => {
    expect(wrapper.find('[data-test="rewards"]').exists()).toBe(true)
  })

  test('finds the rewards-title element', () => {
    expect(wrapper.find('[data-test="rewards-title"]').exists()).toBe(true)
  })

  test('finds the rewards element', () => {
    expect(wrapper.find('[data-test="rewards"]').exists()).toBe(true)
  })

  test('finds the rounds-title element', () => {
    expect(wrapper.find('[data-test="rounds-title"]').exists()).toBe(true)
  })

  test('finds the rounds element', () => {
    expect(wrapper.find('[data-test="rounds"]').exists()).toBe(true)
  })

  test('finds the current-stage-title element', () => {
    expect(wrapper.find('[data-test="current-stage-title"]').exists()).toBe(
      true,
    )
  })

  test('finds the current-stage element', () => {
    expect(wrapper.find('[data-test="current-stage"]').exists()).toBe(true)
  })

  test('finds the reveals-title element', () => {
    expect(wrapper.find('[data-test="reveals-title"]').exists()).toBe(true)
  })

  test('finds the reveals element', () => {
    expect(wrapper.find('[data-test="reveals"]').exists()).toBe(true)
  })

  test('finds the reveal-icon element', () => {
    expect(wrapper.find('[data-test="reveal-icon"]').exists()).toBe(true)
  })

  test('finds the not-consensed class', () => {
    expect(wrapper.find('.not-consensed').exists()).toBe(true)
  })

  test('finds the consensed class', () => {
    expect(wrapper.find('.consensed').exists()).toBe(true)
  })

  test('finds the reveal-icon element', () => {
    expect(wrapper.find('[data-test="reveal-icon"]').exists()).toBe(true)
  })

  test('finds the reveal-result element', () => {
    expect(wrapper.find('[data-test="reveal-result"]').exists()).toBe(true)
  })

  test('does not find the result-title element', () => {
    expect(wrapper.find('[data-test="result-title"]').exists()).toBe(true)
  })

  test('finds the result element', () => {
    expect(wrapper.find('[data-test="result"]').exists()).toBe(true)
  })
})

describe('adds the correct class to reveal icon when all the reveals are in consensus', () => {
  const wrapper = shallowMount(TransactionDetails, {
    props: {
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
    ...createMocks(),
  })

  test('finds the not-consensed class', () => {
    expect(wrapper.find('.not-consensed').exists()).toBe(false)
  })

  test('finds the consensed class', () => {
    expect(wrapper.find('.consensed').exists()).toBe(true)
  })
})
