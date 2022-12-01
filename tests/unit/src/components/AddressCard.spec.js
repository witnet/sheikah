import AddressCard from '@/components/AddressCard.vue'

describe('AddressCard.vue', () => {
  describe('should render correctly', () => {
    it('should be red if used', () => {
      const wrapper = mount(AddressCard, {
        ...i18n(),
        propsData: {
          selected: false,
          used: true,
        },
      })
      expect(wrapper.find('.used').exists()).toBe(true)
    })

    it('should be green if not used', () => {
      const wrapper = mount(AddressCard, {
        ...i18n(),
        propsData: {
          selected: false,
          used: false,
        },
      })

      expect(wrapper.find('.card').classes()).toEqual(['card'])
    })

    it('should be selected prop is passed', () => {
      const wrapper = mount(AddressCard, {
        ...i18n(),
        propsData: {
          selected: true,
          used: false,
        },
      })

      expect(wrapper.find('.selected').exists()).toBe(true)
    })

    it('should not be selected if prop is nos passed', () => {
      const wrapper = mount(AddressCard, {
        ...i18n(),
        propsData: {
          selected: false,
          used: false,
        },
      })

      expect(wrapper.find('.card').classes()).toEqual(['card'])
    })
  })

  it('should emit event on click', () => {
    const wrapper = mount(AddressCard, {
      ...i18n(),
      propsData: {
        selected: false,
        used: false,
      },
    })

    wrapper.trigger('click')

    expect(wrapper.emitted().click).toBeTruthy()
  })
})
