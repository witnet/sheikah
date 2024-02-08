import Amount from '@/components/Amount.vue'
import '@/fontAwesome'

describe('Renders the correct elements', () => {
  const mockStore = createMocks({
    storeModules: {
      wallet: {
        state: {
          unit: 'nanoWit',
        },
      },
    },
  })
  const wrapper = shallowMount(Amount, {
    ...mockStore,
    props: {
      amount: '12',
      keep: true,
    },
  })

  test('shows the correct amount', () => {
    expect(wrapper.find('[data-test="amount"]').text().includes('12')).toBe(
      true,
    )
  })

  test('shows the correct unit', () => {
    expect(wrapper.find('[data-test="unit"]').text()).toEqual('nanoWit')
  })
})
