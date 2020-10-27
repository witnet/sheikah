import Amount from '@/components/Amount.vue'
import '@/fontAwesome'

describe('Renders the correct elements', () => {
  const wrapper = shallowMount(Amount, {
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
      amount: 12,
      keep: true,
    },
  })

  it('shows the correct amount', () => {
    expect(
      wrapper
        .find('[data-test="amount"]')
        .text()
        .includes(12),
    ).toBe(true)
  })

  it('shows the correct currency', () => {
    expect(wrapper.find('[data-test="currency"]').text()).toEqual('nanoWit')
  })
})
