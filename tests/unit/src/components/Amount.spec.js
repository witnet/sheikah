import Amount from '@/components/Amount.vue'
import '@/fontAwesome'

describe('Renders the correct elements', () => {
  const wrapper = shallowMount(Amount, {
    ...createComponentMocks({
      store: {
        wallet: {
          state: {
            unit: 'nanoWit',
          },
        },
      },
    }),
    propsData: {
      amount: '12',
      keep: true,
    },
  })

  it('shows the correct amount', () => {
    expect(
      wrapper
        .find('[data-test="amount"]')
        .text()
        .includes('12'),
    ).toBe(true)
  })

  it('shows the correct unit', () => {
    expect(wrapper.find('[data-test="unit"]').text()).toEqual('nanoWit')
  })
})
