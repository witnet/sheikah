import { NOTIFICATIONS } from '@/constants'
import SettingsNotificationsList from '@/components/SettingsNotificationList.vue'

describe('SettingsNotificationsList.vue', () => {
  describe('should render properly', () => {
    it('the block notification', () => {
      const wrapper = shallowMount(SettingsNotificationsList, {
        ...i18n(),
        ...createComponentMocks({
          store: {
            wallet: {
              state: {
                locale: 'en',
              },
            },
          },
        }),
      })
      wrapper.setData({
        notifications: NOTIFICATIONS,
      })

      expect(wrapper.find('[data-test="block"]').exists()).toBe(true)
    })

    it('the transactions notification', () => {
      const wrapper = shallowMount(SettingsNotificationsList, {
        ...i18n(),
        ...createComponentMocks({
          store: {
            wallet: {
              state: {
                locale: 'en',
              },
            },
          },
        }),
      })
      wrapper.setData({
        notifications: NOTIFICATIONS,
      })

      expect(wrapper.find('[data-test="transactions"]').exists()).toBe(true)
    })

    it('the payments notification', () => {
      const wrapper = shallowMount(SettingsNotificationsList, {
        ...i18n(),
        ...createComponentMocks({
          store: {
            wallet: {
              state: {
                locale: 'en',
              },
            },
          },
        }),
      })
      wrapper.setData({
        notifications: NOTIFICATIONS,
      })

      expect(wrapper.find('[data-test="payments"]').exists()).toBe(true)
    })

    it('the syncronization notification', () => {
      const wrapper = shallowMount(SettingsNotificationsList, {
        ...i18n(),
        ...createComponentMocks({
          store: {
            wallet: {
              state: {
                locale: 'en',
              },
            },
          },
        }),
      })
      wrapper.setData({
        notifications: NOTIFICATIONS,
      })

      expect(wrapper.find('[data-test="syncronization"]').exists()).toBe(true)
    })
  })

  describe('should render properly', () => {
    it('the title of the block notification', () => {
      const wrapper = shallowMount(SettingsNotificationsList, {
        ...i18n(),
        ...createComponentMocks({
          store: {
            wallet: {
              state: {
                locale: 'en',
              },
            },
          },
        }),
      })
      wrapper.setData({
        notifications: NOTIFICATIONS,
      })

      expect(wrapper.find('[data-test="title-block"]').text()).toBe(
        'Block notifications',
      )
    })

    it('the title of the transactions notification', () => {
      const wrapper = shallowMount(SettingsNotificationsList, {
        ...i18n(),
        ...createComponentMocks({
          store: {
            wallet: {
              state: {
                locale: 'en',
              },
            },
          },
        }),
      })
      wrapper.setData({
        notifications: NOTIFICATIONS,
      })

      expect(wrapper.find('[data-test="title-transactions"]').text()).toBe(
        'Transactions notifications',
      )
    })

    it('the title of the payments notification', () => {
      const wrapper = shallowMount(SettingsNotificationsList, {
        ...i18n(),
        ...createComponentMocks({
          store: {
            wallet: {
              state: {
                locale: 'en',
              },
            },
          },
        }),
      })
      wrapper.setData({
        notifications: NOTIFICATIONS,
      })
      expect(wrapper.find('[data-test="title-payments"]').text()).toBe(
        'Payments notifications',
      )
    })

    it('the title of the syncronization notification', () => {
      const wrapper = shallowMount(SettingsNotificationsList, {
        ...i18n(),
        ...createComponentMocks({
          store: {
            wallet: {
              state: {
                locale: 'en',
              },
            },
          },
        }),
      })
      wrapper.setData({
        notifications: NOTIFICATIONS,
      })

      expect(wrapper.find('[data-test="title-syncronization"]').text()).toBe(
        'Syncronization notifications',
      )
    })
  })
})
