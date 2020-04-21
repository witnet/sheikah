import AddressCardButton from '@/components/AddressCardButton'

describe('AddressCardButton.vue', () => {
  describe('should render correctly', () => {
    it('should render the card', () => {
      const wrapper = mount(AddressCardButton)

      expect(wrapper.find('.card').exists()).toBe(true)
    })

    it('should render the icon', () => {
      const wrapper = mount(AddressCardButton)

      expect(
        wrapper
          .find('.icon')
          .classes()
          .includes('fa-plus')
      ).toBe(true)
    })
  })
})
