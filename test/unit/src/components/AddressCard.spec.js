import AddressCard from '@/components/AddressCard.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import i18n from '@/plugins/i18n'

describe('AddressCard.vue', () => {
  describe('should render correctly', () => {
    test('should be red if used', () => {
      const wrapper = mount(AddressCard, {
        props: {
          selected: false,
          used: true,
        },
        global: {
          plugins: [i18n],
        },
      })
      expect(wrapper.find('.used').exists()).toBe(true)
    })

    test('should be green if not used', () => {
      const wrapper = mount(AddressCard, {
        props: {
          selected: false,
          used: false,
        },
        global: {
          plugins: [i18n],
        },
      })

      expect(wrapper.find('.card').classes()).toEqual(['card'])
    })

    test('should be selected prop is passed', () => {
      const wrapper = mount(AddressCard, {
        props: {
          selected: true,
          used: false,
        },
        global: {
          plugins: [i18n],
        },
      })

      expect(wrapper.find('.selected').exists()).toBe(true)
    })

    test('should not be selected if prop is nos passed', () => {
      const wrapper = mount(AddressCard, {
        props: {
          selected: false,
          used: false,
        },
      })

      expect(wrapper.find('.card').classes()).toEqual(['card'])
    })
  })

  test('should emit event on click', () => {
    const wrapper = mount(AddressCard, {
      props: {
        selected: false,
        used: false,
      },
    })

    wrapper.trigger('click')

    expect(wrapper.emitted().click).toBeTruthy()
  })
})
