import SettingsSidebar from '@/components/SettingsSidebar.vue'

describe('SettingsSidebar.vue', () => {
  describe('should render properly', () => {
    it('should render the General section', () => {
      // const mockEditorUndo = jest.fn()

      const wrapper = shallowMount(SettingsSidebar, {
        ...i18n(),
        propsData: {
          sections: [
            {
              name: 'General',
              description: 'Language, appearence ...',
              route: '/settings/general',
            },
            {
              name: 'Alerts',
              description: 'Notifications',
              route: '/settings/notifications',
            },
            {
              name: 'About',
              description: 'Follow Witnet Foundation',
              route: '/settings/about',
            },
          ],
          activeSection: '/settings/general',
        },
      })

      expect(wrapper.find('[data-test="General"]').text()).toBe('General')
      expect(
        wrapper.find('[data-test="Language, appearence ..."]').text(),
      ).toBe('Language, appearence ...')
    })

    it('should render the Alerts section', () => {
      const wrapper = shallowMount(SettingsSidebar, {
        ...i18n(),
        propsData: {
          sections: [
            {
              name: 'General',
              description: 'Language, appearence ...',
              route: '/settings/general',
            },
            {
              name: 'Alerts',
              description: 'Notifications',
              route: '/settings/notifications',
            },
            {
              name: 'About',
              description: 'Follow Witnet Foundation',
              route: '/settings/about',
            },
          ],
          activeSection: '/settings/general',
        },
      })

      expect(wrapper.find('[data-test="Alerts"]').text()).toBe('Alerts')
      expect(wrapper.find('[data-test="Notifications"]').text()).toBe(
        'Notifications',
      )
    })

    it('the element General should have the class active', async () => {
      const wrapper = mount(SettingsSidebar, {
        ...createComponentMocks({
          router: true,
        }),
        propsData: {
          sections: [
            {
              name: 'General',
              description: 'Language, appearence ...',
              route: '/settings/general',
            },
            {
              name: 'Alerts',
              description: 'Notifications',
              route: '/settings/notifications',
            },
            {
              name: 'About',
              description: 'Follow Witnet Foundation',
              route: '/settings/about',
            },
          ],
          activeSection: '/settings/general',
        },
      })
      expect(
        wrapper.find('[data-test="section-Alerts"]').classes('active'),
      ).toBe(false)
      expect(
        wrapper.find('[data-test="section-General"]').classes('active'),
      ).toBe(true)
      expect(
        wrapper.find('[data-test="section-About"]').classes('active'),
      ).toBe(false)
    })

    it('the element Alerts should have the class active', async () => {
      const wrapper = mount(SettingsSidebar, {
        ...createComponentMocks({
          router: true,
        }),
        propsData: {
          sections: [
            {
              name: 'General',
              description: 'Language, appearence ...',
              route: '/settings/general',
            },
            {
              name: 'Alerts',
              description: 'Notifications',
              route: '/settings/notifications',
            },
            {
              name: 'About',
              description: 'Follow Witnet Foundation',
              route: '/settings/about',
            },
          ],
          activeSection: '/settings/notifications',
        },
      })
      expect(
        wrapper.find('[data-test="section-Alerts"]').classes('active'),
      ).toBe(true)
      expect(
        wrapper.find('[data-test="section-General"]').classes('active'),
      ).toBe(false)
      expect(
        wrapper.find('[data-test="section-About"]').classes('active'),
      ).toBe(false)
    })

    it('the element About should have the class active', async () => {
      const wrapper = mount(SettingsSidebar, {
        ...createComponentMocks({
          router: true,
        }),
        propsData: {
          sections: [
            {
              name: 'General',
              description: 'Language, appearence ...',
              route: '/settings/general',
            },
            {
              name: 'Alerts',
              description: 'Notifications',
              route: '/settings/notifications',
            },
            {
              name: 'About',
              description: 'Follow Witnet Foundation',
              route: '/settings/about',
            },
          ],
          activeSection: '/settings/about',
        },
      })
      expect(
        wrapper.find('[data-test="section-Alerts"]').classes('active'),
      ).toBe(false)
      expect(
        wrapper.find('[data-test="section-General"]').classes('active'),
      ).toBe(false)
      expect(
        wrapper.find('[data-test="section-About"]').classes('active'),
      ).toBe(true)
    })
  })
})
