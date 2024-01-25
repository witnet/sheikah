import SettingsSidebar from '@/components/SettingsSidebar.vue'
import { mount, shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import i18n from '@/plugins/i18n'

describe('SettingsSidebar.vue', () => {
  describe('should render properly', () => {
    test('should render the General section', () => {
      const wrapper = shallowMount(SettingsSidebar, {
        props: {
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
        global: {
          plugins: [i18n],
        },
      })

      expect(wrapper.find('[data-test="General"]').text()).toBe('General')
      expect(
        wrapper.find('[data-test="Language, appearence ..."]').text(),
      ).toBe('Language, appearence ...')
    })

    test('should render the Alerts section', () => {
      const wrapper = shallowMount(SettingsSidebar, {
        global: {
          plugins: [i18n],
        },
        props: {
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

    test('the element General should have the class active', async () => {
      const wrapper = mount(SettingsSidebar, {
        props: {
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
        global: {
          router: true,
          plugins: [i18n],
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

    test('the element Alerts should have the class active', async () => {
      const wrapper = mount(SettingsSidebar, {
        props: {
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
        global: {
          router: true,
          plugins: [i18n],
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

    test('the element About should have the class active', async () => {
      const wrapper = mount(SettingsSidebar, {
        props: {
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
        global: {
          router: true,
          plugins: [i18n],
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
