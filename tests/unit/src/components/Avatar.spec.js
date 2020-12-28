import { mount } from '@vue/test-utils'

import Avatar from '@/components/Avatar.vue'

describe('NetworkStatus', () => {
  it('should include the same image src as the given by props', () => {
    const wrapper = mount(Avatar, {
      ...i18n(),
      propsData: {
        src: 'avatar_src',
        borderColor: 'green',
      },
    })

    const src = wrapper.find('img').attributes().src

    expect(src).toBe('avatar_src')
  })

  it('should include color class according to the borderColor prop', () => {
    const wrapper = mount(Avatar, {
      ...i18n(),
      propsData: {
        src: 'avatar_src',
        borderColor: 'red',
      },
    })

    const redBorderedImage = wrapper.find('.red')

    expect(redBorderedImage.exists()).toBe(true)
  })

  it('should contains only status class if no borderClass is passed', () => {
    const wrapper = mount(Avatar, {
      ...i18n(),
      propsData: {
        src: 'avatar_src',
      },
    })

    const image = wrapper.find('img')

    expect(image.attributes().class).toBe('status')
  })

  describe('validates the borderColor prop', () => {
    const getValidTypes = () => ['green', 'red', 'yellow']

    it('should allow green, red and yellow strings', () => {
      const validTypes = getValidTypes()
      const validator = Avatar.props.borderColor.validator

      validTypes.forEach(valid => expect(validator(valid)).toBe(true))
    })

    it('should not allow any other string than green, red and yellow', () => {
      const validator = Avatar.props.borderColor.validator
      const invalidBorderColor = 'black'

      expect(validator(invalidBorderColor)).toBe(false)
    })
  })
})
