import AddressCardButton from '@/components/AddressCardButton.vue'

describe('AddressCardButton.vue', () => {
  describe('should render correctly', () => {
    it('should render the card', () => {
      const wrapper = mount(AddressCardButton, { ...i18n() })

      expect(wrapper.find('.card').exists()).toBe(true)
    })

    it('should render the icon', () => {
      const wrapper = mount(AddressCardButton, { ...i18n() })

      expect(wrapper.find('.icon').classes().includes('fa-plus')).toBe(true)
    })
  })
})
