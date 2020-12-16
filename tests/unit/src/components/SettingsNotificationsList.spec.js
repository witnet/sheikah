import { NOTIFICATIONS } from '@/constants'
import SettingsNotificationsList from '@/components/SettingsNotificationList'

describe('SettingsNotificationsList.vue', () => {
  describe('should render properly', () => {
    it('the block notification', () => {
      const wrapper = shallowMount(SettingsNotificationsList)
      wrapper.setData({
        notifications: NOTIFICATIONS,
      })

      expect(wrapper.find('[data-test="block"]').exists()).toBe(true)
    })

    it('the transactions notification', () => {
      const wrapper = shallowMount(SettingsNotificationsList)
      wrapper.setData({
        notifications: NOTIFICATIONS,
      })

      expect(wrapper.find('[data-test="transactions"]').exists()).toBe(true)
    })

    it('the payments notification', () => {
      const wrapper = shallowMount(SettingsNotificationsList)
      wrapper.setData({
        notifications: NOTIFICATIONS,
      })

      expect(wrapper.find('[data-test="payments"]').exists()).toBe(true)
    })

    it('the syncronization notification', () => {
      const wrapper = shallowMount(SettingsNotificationsList)
      wrapper.setData({
        notifications: NOTIFICATIONS,
      })

      expect(wrapper.find('[data-test="syncronization"]').exists()).toBe(true)
    })
  })

  describe('should render properly', () => {
    it('the title of the block notification', () => {
      const wrapper = shallowMount(SettingsNotificationsList)
      wrapper.setData({
        notifications: NOTIFICATIONS,
      })

      expect(wrapper.find('[data-test="title-block"]').text()).toBe(
        NOTIFICATIONS.BLOCK.title,
      )
    })

    it('the title of the transactions notification', () => {
      const wrapper = shallowMount(SettingsNotificationsList)
      wrapper.setData({
        notifications: NOTIFICATIONS,
      })

      expect(wrapper.find('[data-test="title-transactions"]').text()).toBe(
        NOTIFICATIONS.TRANSACTIONS.title,
      )
    })

    it('the title of the payments notification', () => {
      const wrapper = shallowMount(SettingsNotificationsList)
      wrapper.setData({
        notifications: NOTIFICATIONS,
      })

      expect(wrapper.find('[data-test="title-payments"]').text()).toBe(
        NOTIFICATIONS.PAYMENTS.title,
      )
    })

    it('the title of the syncronization notification', () => {
      const wrapper = shallowMount(SettingsNotificationsList)
      wrapper.setData({
        notifications: NOTIFICATIONS,
      })

      expect(wrapper.find('[data-test="title-syncronization"]').text()).toBe(
        NOTIFICATIONS.SYNCRONIZATION.title,
      )
    })
  })
})
