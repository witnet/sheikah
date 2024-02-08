import { NOTIFICATIONS } from '@/constants'
import SettingsNotificationsList from '@/components/SettingsNotificationList.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { createMocks } from '../../utils'

describe('SettingsNotificationsList.vue', () => {
  const mockStore = createMocks({
    storeModules: {
      wallet: {
        state: {
          locale: 'en',
        },
      },
    },
    stubs: {
      SettingsNotificationSwitch: true,
    },
  })
  describe('should render properly', () => {
    test('the block notification', () => {
      const wrapper = mount(SettingsNotificationsList, {
        ...mockStore,
      })
      expect(wrapper.find('[data-test="block"]').isVisible()).toBe(true)
    })

    test('the transactions notification', () => {
      const wrapper = mount(SettingsNotificationsList, {
        ...mockStore,
      })
      wrapper.setData({
        notifications: NOTIFICATIONS,
      })

      expect(wrapper.find('[data-test="transactions"]').exists()).toBe(true)
    })

    test('the payments notification', () => {
      const wrapper = mount(SettingsNotificationsList, {
        ...mockStore,
      })
      wrapper.setData({
        notifications: NOTIFICATIONS,
      })

      expect(wrapper.find('[data-test="payments"]').exists()).toBe(true)
    })

    test('the syncronization notification', () => {
      const wrapper = mount(SettingsNotificationsList, {
        ...mockStore,
      })
      wrapper.setData({
        notifications: NOTIFICATIONS,
      })

      expect(wrapper.find('[data-test="syncronization"]').exists()).toBe(true)
    })
  })

  describe('should render properly', () => {
    test('the title of the block notification', () => {
      const wrapper = mount(SettingsNotificationsList, {
        ...mockStore,
      })
      wrapper.setData({
        notifications: NOTIFICATIONS,
      })

      expect(wrapper.find('[data-test="title-block"]').text()).toBe(
        'Block notifications',
      )
    })

    test('the title of the transactions notification', () => {
      const wrapper = mount(SettingsNotificationsList, {
        ...mockStore,
      })
      wrapper.setData({
        notifications: NOTIFICATIONS,
      })

      expect(wrapper.find('[data-test="title-transactions"]').text()).toBe(
        'Transactions notifications',
      )
    })

    test('the title of the payments notification', () => {
      const wrapper = mount(SettingsNotificationsList, {
        ...mockStore,
      })
      wrapper.setData({
        notifications: NOTIFICATIONS,
      })
      expect(wrapper.find('[data-test="title-payments"]').text()).toBe(
        'Payments notifications',
      )
    })

    test('the title of the syncronization notification', () => {
      const wrapper = mount(SettingsNotificationsList, {
        ...mockStore,
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
