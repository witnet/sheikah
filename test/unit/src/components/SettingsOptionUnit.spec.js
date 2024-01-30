import SettingsOptionUnit from '@/components/SettingsOptionUnit.vue'
import Select from '@/components/Select.vue'
import { THEMES } from '@/constants'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { createMocks } from '../../utils'

describe('SettingsOptionUnit.vue', () => {
  describe('change unit', () => {
    const changeDefaultUnitMock = vi.fn()

    test('should call the mutation to change the unit', async () => {
      const mockStore = createMocks({
        storeModules: {
          wallet: {
            state: {
              unit: 'nanoWit',
            },
            mutations: {
              changeDefaultUnit: changeDefaultUnitMock,
            },
          },
        },
        stubs: {
          Select: Select,
          CustomIcon: true,
        },
      })
      const wrapper = mount(SettingsOptionUnit, {
        ...mockStore,
      })
      wrapper.setData({
        options: [
          { primaryText: 'wit', value: 'wit' },
          { primaryText: 'milliWit', value: 'milliWit' },
          { primaryText: 'microWit', value: 'microWit' },
          { primaryText: 'nanoWit', value: 'nanoWit' },
        ],
      })
      const selectButton = wrapper.find('[data-test="select-btn"]')
      await selectButton.trigger('click')

      const option2Button = wrapper.find('[data-test="option-2"]')
      await option2Button.trigger('click')
      expect(changeDefaultUnitMock).toHaveBeenCalled()
    })

    test('the default unit should be microWit on change', async () => {
      const mockStore = createMocks({
        storeModules: {
          wallet: {
            state: {
              unit: 'nanoWit',
            },
            mutations: {
              changeDefaultUnit: changeDefaultUnitMock,
            },
          },
        },
        stubs: {
          Select: Select,
          CustomIcon: true,
        },
      })
      const wrapper = mount(SettingsOptionUnit, {
        ...mockStore,
      })
      wrapper.setData({
        options: [
          { primaryText: 'wit', value: 'wit' },
          { primaryText: 'milliWit', value: 'milliWit' },
          { primaryText: 'microWit', value: 'microWit' },
          { primaryText: 'nanoWit', value: 'nanoWit' },
        ],
      })
      const selectButton = wrapper.find('[data-test="select-btn"]')
      await selectButton.trigger('click')

      const option2Button = wrapper.find('[data-test="option-2"]')
      await option2Button.trigger('click')
      expect(wrapper.find('[data-test="selected-option-primary"]').text()).toBe(
        'microWit',
      )
    })

    test('the default unit should be nanoWit on change', async () => {
      const mockStore = createMocks({
        storeModules: {
          wallet: {
            state: {
              unit: 'nanoWit',
            },
            mutations: {
              changeDefaultUnit: changeDefaultUnitMock,
            },
          },
        },
        stubs: {
          Select: Select,
          CustomIcon: true,
        },
      })
      const wrapper = mount(SettingsOptionUnit, {
        ...mockStore,
      })
      wrapper.setData({
        options: [
          { primaryText: 'wit', value: 'wit' },
          { primaryText: 'milliWit', value: 'milliWit' },
          { primaryText: 'microWit', value: 'microWit' },
          { primaryText: 'nanoWit', value: 'nanoWit' },
        ],
      })
      const selectButton = wrapper.find('[data-test="select-btn"]')
      await selectButton.trigger('click')

      const option2Button = wrapper.find('[data-test="option-3"]')
      await option2Button.trigger('click')
      expect(wrapper.find('[data-test="selected-option-primary"]').text()).toBe(
        'nanoWit',
      )
    })

    test('the default unit should be milliWit on change', async () => {
      const mockStore = createMocks({
        storeModules: {
          wallet: {
            state: {
              unit: 'nanoWit',
              theme: THEMES.DARK,
            },
            mutations: {
              changeDefaultUnit: changeDefaultUnitMock,
            },
          },
        },
        stubs: {
          Select: Select,
          CustomIcon: true,
        },
      })
      const wrapper = mount(SettingsOptionUnit, {
        ...mockStore,
      })
      wrapper.setData({
        options: [
          { primaryText: 'wit', value: 'wit' },
          { primaryText: 'milliWit', value: 'milliWit' },
          { primaryText: 'microWit', value: 'microWit' },
          { primaryText: 'nanoWit', value: 'nanoWit' },
        ],
      })
      const selectButton = wrapper.find('[data-test="select-btn"]')
      await selectButton.trigger('click')

      const option2Button = wrapper.find('[data-test="option-1"]')
      await option2Button.trigger('click')
      expect(wrapper.find('[data-test="selected-option-primary"]').text()).toBe(
        'milliWit',
      )
    })

    test('the default unit should be wit on change', async () => {
      const mockStore = createMocks({
        storeModules: {
          wallet: {
            state: {
              unit: 'nanoWit',
            },
            mutations: {
              changeDefaultUnit: changeDefaultUnitMock,
            },
          },
        },
        stubs: {
          Select: Select,
          CustomIcon: true,
        },
      })
      const wrapper = mount(SettingsOptionUnit, {
        ...mockStore,
      })
      wrapper.setData({
        options: [
          { primaryText: 'wit', value: 'wit' },
          { primaryText: 'milliWit', value: 'milliWit' },
          { primaryText: 'microWit', value: 'microWit' },
          { primaryText: 'nanoWit', value: 'nanoWit' },
        ],
      })
      const selectButton = wrapper.find('[data-test="select-btn"]')
      await selectButton.trigger('click')

      const option2Button = wrapper.find('[data-test="option-0"]')
      await option2Button.trigger('click')
      expect(wrapper.find('[data-test="selected-option-primary"]').text()).toBe(
        'wit',
      )
    })
  })
})
