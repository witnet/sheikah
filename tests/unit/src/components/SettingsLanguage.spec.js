import SettingsLanguage from '@/components/SettingsLanguage.vue'
import Select from '@/components/Select.vue'

import { describe, expect, test, vi } from 'vitest'

import { LocalStorageWrapper } from '@/api'

describe('SettingsLanguage.vue', () => {
  describe('change language', () => {
    const updateDRLanguage = vi.fn()
    const data = () => ({
      options: [
        { primaryText: 'Español', value: 'Español' },
        { primaryText: 'English', value: 'English' },
      ],
    })

    test('should call the mutation to change the unit', async () => {
      const mockStore = createMocks({
        storeModules: {
          wallet: {
            state: {
              language: 'English',
              locale: 'en',
              localStorage: new LocalStorageWrapper(),
            },
            mutations: {
              updateDRLanguage: updateDRLanguage,
            },
            getters: {
              language: () => {
                return 'English'
              },
            },
          },
        },
        stubs: {
          Select: Select,
          CustomIcon: true,
        },
      })
      const wrapper = mount(SettingsLanguage, {
        data,
        ...mockStore,
      })

      const selectButton = wrapper.find('[data-test="select-btn"]')
      await selectButton.trigger('click')

      const option2Button = wrapper.find('[data-test="option-0"]')
      await option2Button.trigger('click')

      expect(updateDRLanguage).toHaveBeenCalled()
    })

    test('the language should be English on change', async () => {
      const mockStore = createMocks({
        storeModules: {
          wallet: {
            state: {
              language: 'English',
              locale: 'en',
              localStorage: new LocalStorageWrapper(),
            },
            mutations: {
              updateDRLanguage: updateDRLanguage,
            },
            getters: {
              language: () => {
                return 'English'
              },
            },
          },
        },
        stubs: {
          Select: Select,
          CustomIcon: true,
        },
      })
      const wrapper = mount(SettingsLanguage, {
        ...mockStore,
        data,
      })
      const selectButton = wrapper.find('[data-test="select-btn"]')
      await selectButton.trigger('click')

      const option2Button = wrapper.find('[data-test="option-1"]')
      await option2Button.trigger('click')
      expect(wrapper.find('[data-test="selected-option-primary"]').text()).toBe(
        'English',
      )
    })

    test('the language should be Español on change', async () => {
      const mockStore = createMocks({
        storeModules: {
          wallet: {
            state: {
              language: 'English',
              locale: 'en',
              localStorage: new LocalStorageWrapper(),
            },
            mutations: {
              updateDRLanguage: updateDRLanguage,
            },
            getters: {
              language: () => {
                return 'English'
              },
            },
          },
        },
        stubs: {
          Select: Select,
          CustomIcon: true,
        },
      })
      const wrapper = mount(SettingsLanguage, {
        ...mockStore,
        data,
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
