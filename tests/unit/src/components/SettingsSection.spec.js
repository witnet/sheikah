import SettingsSection from '@/components/SettingsSection'

describe('SettingsSection.vue', () => {
  describe('should render properly', () => {
    it('should render the currency section', () => {
      const wrapper = shallowMount(SettingsSection, {
        propsData: {
          settings: ['CURRENCY'],
        },
      })

      expect(wrapper.find('[data-test="settings-currency"]').exists()).toBe(
        true,
      )
    })

    it('should render the currency section', () => {
      const wrapper = shallowMount(SettingsSection, {
        propsData: {
          settings: ['COMMUNITY'],
        },
      })

      expect(wrapper.find('[data-test="settings-community"]').exists()).toBe(
        true,
      )
    })

    it('should render the currency section', () => {
      const wrapper = shallowMount(SettingsSection, {
        propsData: {
          settings: ['NOTIFICATIONS'],
        },
      })

      expect(
        wrapper.find('[data-test="settings-notifications"]').exists(),
      ).toBe(true)
    })

    it('should render the currency section', () => {
      const wrapper = shallowMount(SettingsSection, {
        propsData: {
          settings: ['EXPORT_XPRV', 'RESYNC'],
        },
      })

      expect(wrapper.find('[data-test="settings-resync"]').exists()).toBe(true)
      expect(wrapper.find('[data-test="settings-xprv"]').exists()).toBe(true)
    })
  })
})
