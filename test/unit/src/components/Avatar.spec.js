import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

import Avatar from '@/components/Avatar.vue'
import i18n from '@/plugins/i18n'

describe('NetworkStatus', () => {
  test('should include the same image src as the given by props', () => {
    const wrapper = mount(Avatar, {
      props: {
        src: 'avatar_src',
        borderColor: 'green',
      },
      global: {
        plugins: [i18n],
      },
    })

    const src = wrapper.find('img').attributes().src

    expect(src).toBe('avatar_src')
  })

  test('should include color class according to the borderColor prop', () => {
    const wrapper = mount(Avatar, {
      props: {
        src: 'avatar_src',
        borderColor: 'red',
      },
      global: {
        plugins: [i18n],
      },
    })

    const redBorderedImage = wrapper.find('.red')

    expect(redBorderedImage.exists()).toBe(true)
  })

  test('should contains only status class if no borderClass is passed', () => {
    const wrapper = mount(Avatar, {
      props: {
        src: 'avatar_src',
      },
      global: {
        plugins: [i18n],
      },
    })

    const image = wrapper.find('img')

    expect(image.attributes().class).toBe('status')
  })

  describe('validates the borderColor prop', () => {
    const getValidTypes = () => ['green', 'red', 'yellow']

    test('should allow green, red and yellow strings', () => {
      const validTypes = getValidTypes()
      const validator = Avatar.props.borderColor.validator

      validTypes.forEach(valid => expect(validator(valid)).toBe(true))
    })

    test('should not allow any other string than green, red and yellow', () => {
      const validator = Avatar.props.borderColor.validator
      const invalidBorderColor = 'black'

      expect(validator(invalidBorderColor)).toBe(false)
    })
  })
})
