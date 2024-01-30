import RadonOperator from '@/components/RadonOperator.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { createMocks } from '../../utils'
import { ElTooltip } from 'element-plus'

describe('RadonOperator.vue', () => {
  describe('should render properly when there is arguments', () => {
    const state = {
      currentTemplate: {
        variables: [{}],
      },
    }
    const interactionsState = {
      generateRadRequestResultLoading: false,
    }
    const walletState = {
      theme: 'light',
    }
    const mockStore = createMocks({
      storeModules: {
        rad: { state: state },
        wallet: { state: walletState },
        uiInteractions: { state: interactionsState },
      },
      stubs: {
        CustomIcon: true,
        EditorOperatorArgument: true,
        'el-tooltip': ElTooltip,
        OperatorOutput: true,
      },
    })
    const wrapper = mount(RadonOperator, {
      ...mockStore,
      props: {
        scriptId: 8,
        sourceIndex: 0,
        operator: {
          selected: {
            label: 'asFloat',
            outputType: 'float',
            arguments: [
              {
                hierarchicalType: 'argument',
                id: 7,
                label: 'key',
                markupType: 'input',
                type: 'string',
                value: '',
              },
            ],
          },
          options: [
            {
              label: 'asBoolean',
              outputType: 'boolean',
            },
            {
              label: 'asBytes',
              outputType: 'bytes',
            },
            {
              label: 'asFloat',
              outputType: 'float',
            },
          ],
        },
      },
    })

    test('should render the operator label', () => {
      expect(wrapper.find('[data-test="operator-label"]').text()).toBe(
        'Operator',
      )
    })

    test('should render the operator', () => {
      expect(wrapper.find('[data-test="operator"]').exists()).toBe(true)
    })

    test('should render the select', () => {
      expect(wrapper.find('[data-test="arguments-label"]').text()).toBe(
        'Arguments',
      )
    })

    test('should render the selected value seconday text', () => {
      expect(wrapper.find('[data-test="has-arguments"]').exists()).toBe(true)
    })
  })
  describe('should render properly when there is no arguments', () => {
    const state = {
      currentTemplate: {
        variables: [{}],
      },
    }
    const interactionsState = {
      generateRadRequestResultLoading: false,
    }
    const walletState = {
      theme: 'light',
    }
    const mockStore = createMocks({
      storeModules: {
        rad: { state: state },
        wallet: { state: walletState },
        uiInteractions: { state: interactionsState },
      },
      stubs: {
        CustomIcon: true,
        EditorOperatorArgument: true,
        'el-tooltip': ElTooltip,
        OperatorOutput: true,
      },
    })
    const wrapper = mount(RadonOperator, {
      ...mockStore,
      props: {
        sourceIndex: 0,
        scriptId: 8,
        operator: {
          selected: {
            label: 'asFloat',
            outputType: 'float',
            arguments: [],
          },
          options: [
            {
              label: 'asBoolean',
              outputType: 'boolean',
            },
            {
              label: 'asBytes',
              outputType: 'bytes',
            },
            {
              label: 'asFloat',
              outputType: 'float',
            },
          ],
        },
      },
    })

    test('should render the operator label', () => {
      expect(wrapper.find('[data-test="operator-label"]').text()).toBe(
        'Operator',
      )
    })

    test('should render the operator', () => {
      expect(wrapper.find('[data-test="operator"]').exists()).toBe(true)
    })

    test('should render the select', () => {
      expect(wrapper.find('[data-test="arguments-label"]').exists()).toBe(false)
    })

    test('should render the selected value seconday text', () => {
      expect(wrapper.find('[data-test="has-arguments"]').exists()).toBe(false)
    })
  })
  describe('should emit the events on click', () => {
    const state = {
      currentTemplate: {
        variables: [{}],
      },
    }
    const interactionsState = {
      generateRadRequestResultLoading: false,
    }
    const walletState = {
      theme: 'light',
    }
    const mockStore = createMocks({
      storeModules: {
        rad: { state: state },
        wallet: { state: walletState },
        uiInteractions: { state: interactionsState },
      },
      stubs: {
        CustomIcon: true,
        EditorOperatorArgument: true,
        'el-tooltip': ElTooltip,
        OperatorOutput: true,
      },
    })
    const wrapper = mount(RadonOperator, {
      data() {
        return {
          showDelete: true,
        }
      },
      ...mockStore,
      props: {
        showOutputType: false,
        sourceIndex: 0,
        scriptId: 8,
        operator: {
          selected: {
            label: 'asFloat',
            outputType: 'float',
            arguments: [],
          },
          options: [
            {
              label: 'asBoolean',
              outputType: 'boolean',
            },
            {
              label: 'asBytes',
              outputType: 'bytes',
            },
            {
              label: 'asFloat',
              outputType: 'float',
            },
          ],
        },
      },
    })

    test('should emit an event to remove the operator', async () => {
      wrapper.find('[data-test="delete-operator"]').trigger('click')
      expect(wrapper.emitted()['delete-operator']).toBeTruthy()
    })

    test('should emit an event to add an operator', async () => {
      await wrapper.find('[data-test="add-operator"]').trigger('click')

      expect(wrapper.emitted()['add-operator']).toBeTruthy()
    })
  })
})
