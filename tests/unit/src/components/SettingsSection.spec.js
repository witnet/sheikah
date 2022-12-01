import SettingsSection from '@/components/SettingsSection.vue'

describe('SettingsSection.vue', () => {
  describe('should render properly', () => {
    it('should render the unit section', () => {
      const wrapper = shallowMount(SettingsSection, {
        ...i18n(),
        propsData: {
          settings: ['UNIT'],
        },
      })

      expect(wrapper.find('[data-test="settings-unit"]').exists()).toBe(true)
    })

    it('should render the unit section', () => {
      const wrapper = shallowMount(SettingsSection, {
        ...i18n(),
        propsData: {
          settings: ['COMMUNITY'],
        },
      })

      expect(wrapper.find('[data-test="settings-community"]').exists()).toBe(
        true,
      )
    })

    it('should render the unit section', () => {
      const wrapper = shallowMount(SettingsSection, {
        ...i18n(),
        propsData: {
          settings: ['NOTIFICATIONS'],
        },
      })

      expect(
        wrapper.find('[data-test="settings-notifications"]').exists(),
      ).toBe(true)
    })

    it('should render the unit section', () => {
      const wrapper = shallowMount(SettingsSection, {
        ...i18n(),
        propsData: {
          settings: ['EXPORT_XPRV', 'RESYNC'],
        },
      })

      expect(wrapper.find('[data-test="settings-resync"]').exists()).toBe(true)
      expect(wrapper.find('[data-test="settings-xprv"]').exists()).toBe(true)
    })
  })
})
