import SettingsSection from '@/components/SettingsSection.vue'

describe('SettingsSection.vue', () => {
  describe('should render properly', () => {
    const mocks = createMocks({
      storeModules: {},
      stubs: {
        SettingsOptionUnit: true,
        SettingsLanguage: true,
        SettingsAppearance: true,
        ExportXprv: true,
        SettingsNotificationList: true,
        Community: true,
        SettingsResync: true,
        RenameWallet: true,
        DeleteWallet: true,
      },
    })

    test('should render the unit section', () => {
      const wrapper = mount(SettingsSection, {
        props: {
          settings: ['UNIT'],
        },
        ...mocks,
      })

      expect(wrapper.find('[data-test="settings-unit"]').exists()).toBe(true)
    })

    test('should render the unit section', () => {
      const wrapper = mount(SettingsSection, {
        props: {
          settings: ['COMMUNITY'],
        },
        ...mocks,
      })

      expect(wrapper.find('[data-test="settings-community"]').exists()).toBe(
        true,
      )
    })

    test('should render the unit section', () => {
      const wrapper = mount(SettingsSection, {
        props: {
          settings: ['NOTIFICATIONS'],
        },
        ...mocks,
      })

      expect(
        wrapper.find('[data-test="settings-notifications"]').exists(),
      ).toBe(true)
    })

    test('should render the unit section', () => {
      const wrapper = mount(SettingsSection, {
        props: {
          settings: ['EXPORT_XPRV', 'RESYNC'],
        },
        ...mocks,
      })

      expect(wrapper.find('[data-test="settings-resync"]').exists()).toBe(true)
      expect(wrapper.find('[data-test="settings-xprv"]').exists()).toBe(true)
    })
  })
})
