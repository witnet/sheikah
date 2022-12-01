import SettingsLanguage from '@/components/SettingsLanguage.vue'

describe('SettingsLanguage.vue', () => {
  describe('change language', () => {
    const changeLocaleMock = jest.fn()

    it('should call the mutation to change the unit', async () => {
      const wrapper = mount(
        SettingsLanguage,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                language: 'English',
              },
              mutations: {
                changeLocale: changeLocaleMock,
              },
              getters: {
                language: () => {
                  return 'English'
                },
              },
            },
          },
        }),
      )

      wrapper.setData({
        options: [
          { primaryText: 'Español', value: 'Español' },
          { primaryText: 'English', value: 'English' },
        ],
      })

      const selectButton = wrapper.find('[data-test="select-btn"]')
      await selectButton.trigger('click')

      const option2Button = wrapper.find('[data-test="option-0"]')
      await option2Button.trigger('click')

      expect(changeLocaleMock).toHaveBeenCalled()
    })

    it('the language should be English on change', async () => {
      const wrapper = mount(
        SettingsLanguage,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                language: 'English',
              },
              mutations: {
                changeLocale: changeLocaleMock,
              },
              getters: {
                language: () => {
                  return 'English'
                },
              },
            },
          },
        }),
      )
      wrapper.setData({
        options: [
          { primaryText: 'Español', value: 'Español' },
          { primaryText: 'English', value: 'English' },
        ],
      })
      const selectButton = wrapper.find('[data-test="select-btn"]')
      await selectButton.trigger('click')

      const option2Button = wrapper.find('[data-test="option-1"]')
      await option2Button.trigger('click')
      expect(wrapper.find('[data-test="selected-option-primary"]').text()).toBe(
        'English',
      )
    })

    it('the language should be Español on change', async () => {
      const wrapper = mount(
        SettingsLanguage,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                language: 'English',
              },
              mutations: {
                changeLocale: changeLocaleMock,
              },
              getters: {
                language: () => {
                  return 'English'
                },
              },
            },
          },
        }),
      )
      wrapper.setData({
        options: [
          { primaryText: 'Español', value: 'Español' },
          { primaryText: 'English', value: 'English' },
        ],
      })
      const selectButton = wrapper.find('[data-test="select-btn"]')
      await selectButton.trigger('click')

      const option2Button = wrapper.find('[data-test="option-0"]')
      await option2Button.trigger('click')
      expect(wrapper.find('[data-test="selected-option-primary"]').text()).toBe(
        'Español',
      )
    })
  })
})
