import SettingsNotificationSwitch from '@/components/SettingsNotificationSwitch'

describe('SettingsNotificationSwitch.vue', () => {
  describe('change currency', () => {
    const toggleNotificationMock = jest.fn()
    const getNotificationsMock = jest.fn()

    it('should call the mutation to change the currency', async () => {
      const wrapper = mount(SettingsNotificationSwitch, {
        propsData: {
          title: 'block',
        },
        ...createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                notifications: {
                  block: false,
                },
              },
              mutations: {
                toggleNotification: toggleNotificationMock,
              },
              actions: {
                getNotifications: getNotificationsMock,
              },
            },
          },
        }),
      })
      const switchButton = wrapper.find('.el-switch')
      await switchButton.trigger('click')
      expect(toggleNotificationMock).toHaveBeenCalled()
    })
  })
})
