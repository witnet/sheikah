import SettingsSection from '@/components/SettingsSection.vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import i18n from '@/plugins/i18n'

describe('SettingsSection.vue', () => {
  describe('should render properly', () => {
    test('should render the unit section', () => {
      const wrapper = shallowMount(SettingsSection, {
        props: {
          settings: ['UNIT'],
        },
        global: {
          plugins: [i18n],
        },
      })

      expect(wrapper.find('[data-test="settings-unit"]').exists()).toBe(true)
    })

    test('should render the unit section', () => {
      const wrapper = shallowMount(SettingsSection, {
        props: {
          settings: ['COMMUNITY'],
        },
        global: {
          plugins: [i18n],
        },
      })

      expect(wrapper.find('[data-test="settings-community"]').exists()).toBe(
        true,
      )
    })

    test('should render the unit section', () => {
      const wrapper = shallowMount(SettingsSection, {
        props: {
          settings: ['NOTIFICATIONS'],
        },
        global: {
          plugins: [i18n],
        },
      })

      expect(
        wrapper.find('[data-test="settings-notifications"]').exists(),
      ).toBe(true)
    })

    test('should render the unit section', () => {
      const wrapper = shallowMount(SettingsSection, {
        props: {
          settings: ['EXPORT_XPRV', 'RESYNC'],
        },
        global: {
          plugins: [i18n],
        },
      })

      expect(wrapper.find('[data-test="settings-resync"]').exists()).toBe(true)
      expect(wrapper.find('[data-test="settings-xprv"]').exists()).toBe(true)
    })
  })
})
