import EditorStageBar from '@/components/EditorStageBar.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { createMockStore } from '../../utils'

describe('EditorStageBar.vue', () => {
  describe('should render properly', () => {
    const mockStore = createMockStore({
      rad: {
        state: {
          currentStage: 'settings',
        },
      },
    })
    const wrapper = mount(
      EditorStageBar,
      {
        global: {
          plugins: [i18n, mockStore],
        },
      },
    )

    test('should render the settings stage btn', () => {
      expect(wrapper.find('[data-test="stage-settings"]').text()).toBe(
        `1. Enter Template Settings`,
      )
    })

    test('should render the sources stage btn', () => {
      expect(wrapper.find('[data-test="stage-sources"]').text()).toBe(
        `2. Select your Data Sources`,
      )
    })

    test('should render the scripts stage btn', () => {
      expect(wrapper.find('[data-test="stage-scripts"]').text()).toBe(
        `3. Edit Source Scripts`,
      )
    })

    test('should render the aggregations stage btn', () => {
      expect(wrapper.find('[data-test="stage-aggregations"]').text()).toBe(
        `4. Set Aggregator`,
      )
    })

    test('should render the tally stage', () => {
      expect(wrapper.find('[data-test="stage-tally"]').text()).toEqual(
        `5. Set Tally`,
      )
    })
  })
})
