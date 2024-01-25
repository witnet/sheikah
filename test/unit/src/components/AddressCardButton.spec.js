import AddressCardButton from '@/components/AddressCardButton.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import i18n from '@/plugins/i18n'

describe('AddressCardButton.vue', () => {
  describe('should render correctly', () => {
    test('should render the card', () => {
      const wrapper = mount(AddressCardButton, {
        global: {
          plugins: [i18n],
        },
      })

      expect(wrapper.find('.card').exists()).toBe(true)
    })

    test('should render the icon', () => {
      const wrapper = mount(AddressCardButton, {
        global: {
          plugins: [i18n],
        },
      })

      expect(wrapper.find('.icon').classes().includes('fa-plus')).toBe(true)
    })
  })
})
