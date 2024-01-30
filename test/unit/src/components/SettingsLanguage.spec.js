import SettingsLanguage from '@/components/SettingsLanguage.vue'
import Select from '@/components/Select.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { createMocks } from '../../utils'

describe.skip('SettingsLanguage.vue', () => {
  describe('change language', () => {
    const changeLocaleMock = vi.fn()

    test.only('should call the mutation to change the unit', async () => {
      const mockStore = createMocks({
        storeModules: {
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
        stubs: {
          Select: Select,
        },
        mocks: {
          '@/main': { localStorageWrapper: vi.fn() },
        },
      })
      const wrapper = mount(SettingsLanguage, {
        ...mockStore,
      })

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

    test('the language should be English on change', async () => {
      const mockStore = createMocks({
        storeModules: {
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
        stubs: {
          Select: Select,
        },
        mocks: {
          '@/main': { localStorageWrapper: vi.fn() },
        },
      })
      const wrapper = mount(SettingsLanguage, {
        ...mockStore,
      })
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

    test('the language should be Español on change', async () => {
      const mockStore = createMocks({
        storeModules: {
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
        stubs: {
          Select: Select,
        },
        mocks: {
          '@/main': { localStorageWrapper: vi.fn() },
        },
      })
      const wrapper = mount(SettingsLanguage, {
        ...mockStore,
      })
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
