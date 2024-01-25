import OperatorOutput from '@/components/OperatorOutput.vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { createMockStore } from '../../utils'

describe('OperatorOutput.vue', () => {
  describe('should render correctly when there is an output and there is no error', () => {
    const mockStore = createMockStore({
      uiInteractions: {
        state: {
          generateRadRequestResultLoading: false,
        },
      },
    })
    const wrapper = shallowMount(OperatorOutput, {
      props: {
        label: 'string',
        output: {
          RadonString:
            '0000000000000000000f83a7490243701b7d5d287b98e20792d951584347e009',
        },
        filter: false,
        error: null,
      },
      global: {
        plugins: [mockStore],
      },
    })

    test('should not find the filter output label', () => {
      expect(wrapper.find('[data-test="filter-output"]').exists()).toBe(false)
    })

    test('finds the label', () => {
      expect(wrapper.find('[data-test="label"]').text()).toBe('string')
    })

    test('should find the output icon', () => {
      expect(wrapper.find('[data-test="output"]').exists()).toBe(true)
    })

    test('should not find the error icon', () => {
      expect(wrapper.find('[data-test="error"]').exists()).toBe(false)
    })

    test('should not find the empty output icon', () => {
      expect(wrapper.find('[data-test="empty-output"]').exists()).toBe(false)
    })
  })
  describe('should render correctly when there is not an output', () => {
    const mockStore = createMockStore({
      uiInteractions: {
        state: {
          generateRadRequestResultLoading: false,
        },
      },
    })
    const wrapper = shallowMount(OperatorOutput, {
      props: {
        label: 'string',
        output: null,
        filter: false,
        error: null,
      },
      global: {
        plugins: [mockStore],
      },
    })

    test('should not find the filter output label', () => {
      expect(wrapper.find('[data-test="filter-output"]').exists()).toBe(false)
    })

    test('finds the label', () => {
      expect(wrapper.find('[data-test="label"]').text()).toBe('string')
    })

    test('should not find the output icon', () => {
      expect(wrapper.find('[data-test="output"]').exists()).toBe(false)
    })

    test('should not find the error icon', () => {
      expect(wrapper.find('[data-test="error"]').exists()).toBe(false)
    })

    test('should find the empty output icon', () => {
      expect(wrapper.find('[data-test="empty-output"]').exists()).toBe(true)
    })
  })
  describe('should render correctly when there is an error', () => {
    const mockStore = createMockStore({
      uiInteractions: {
        state: {
          generateRadRequestResultLoading: false,
        },
      },
    })
    const wrapper = shallowMount(OperatorOutput, {
      props: {
        label: 'string',
        output: null,
        filter: false,
        error: 'error',
      },
      global: {
        plugins: [mockStore],
      },
    })

    test('should not find the filter output label', () => {
      expect(wrapper.find('[data-test="filter-output"]').exists()).toBe(false)
    })

    test('finds the label', () => {
      expect(wrapper.find('[data-test="label"]').text()).toBe('string')
    })

    test('should not find the output icon', () => {
      expect(wrapper.find('[data-test="output"]').exists()).toBe(false)
    })

    test('should find the error icon', () => {
      expect(wrapper.find('[data-test="error"]').exists()).toBe(true)
    })

    test('should not find the empty output icon', () => {
      expect(wrapper.find('[data-test="empty-output"]').exists()).toBe(false)
    })
  })
  describe('should render correctly when the output is a filter', () => {
    const mockStore = createMockStore({
      uiInteractions: {
        state: {
          generateRadRequestResultLoading: false,
        },
      },
    })
    const wrapper = shallowMount(OperatorOutput, {
      props: {
        label: 'string',
        output: null,
        filter: true,
        error: null,
      },
      global: {
        plugins: [mockStore],
      },
    })

    test('should not find the filter output label', () => {
      expect(wrapper.find('[data-test="filter-output"]').exists()).toBe(true)
    })

    test('finds the label', () => {
      expect(wrapper.find('[data-test="label"]').text()).toBe('string')
    })

    test('should not find the output icon', () => {
      expect(wrapper.find('[data-test="output"]').exists()).toBe(false)
    })

    test('should find the error icon', () => {
      expect(wrapper.find('[data-test="error"]').exists()).toBe(false)
    })

    test('should not find the empty output icon', () => {
      expect(wrapper.find('[data-test="empty-output"]').exists()).toBe(true)
    })
  })
})
