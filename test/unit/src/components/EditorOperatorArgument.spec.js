import EditorOperatorArgument from '@/components/EditorOperatorArgument.vue'
import OperatorType from '@/components/OperatorType.vue'
import Select from '@/components/Select.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { createMocks } from '../../utils'
import { ElInput } from 'element-plus'

const getMockedStore = ({ state }) => {
  return createMocks({
    storeModules: {
      rad: { state: state },
      wallet: {
        state: {
          theme: 'light',
        },
      },
    },
    stubs: {
      'el-input': ElInput,
      OperatorType: OperatorType,
      Select: Select,
      Subscript: true,
      CustomIcon: true,
    },
  })
}

describe('EditorOperatorArgument.vue', () => {
  describe('should render properly when there is a select argument', () => {
    const state = {
      currentTemplate: {
        variables: [{}],
      },
    }
    const mockStore = getMockedStore(state)
    const wrapper = mount(EditorOperatorArgument, {
      ...mockStore,
      props: {
        argument: {
          hierarchicalType: 'argument',
          id: 4,
          label: 'function',
          markupType: 'select',
          options: [
            {
              label: 'greaterThan',
              hierarchicalType: 'operatorOption',
              markupType: 'option',
              outputType: 'filterOutput',
            },
            {
              label: 'LessThan',
              hierarchicalType: 'operatorOption',
              markupType: 'option',
              outputType: 'filterOutput',
            },
            {
              label: 'equals',
              hierarchicalType: 'operatorOption',
              markupType: 'option',
              outputType: 'filterOutput',
            },
            {
              label: 'deviationAbsolute',
              hierarchicalType: 'operatorOption',
              markupType: 'option',
              outputType: 'filterOutput',
            },
            {
              label: 'deviationRelative',
              hierarchicalType: 'operatorOption',
              markupType: 'option',
              outputType: 'filterOutput',
            },
            {
              label: 'deviationStandard',
              hierarchicalType: 'operatorOption',
              markupType: 'option',
              outputType: 'filterOutput',
            },
          ],
          selected: {
            arguments: [
              {
                hierarchicalType: 'argument',
                id: 5,
                label: 'by',
                markupType: 'input',
                value: 1,
                type: 'string',
              },
            ],
            hierarchicalType: 'selectedOperatorOption',
            label: 'greaterThan',
            outputType: 'filterOutput',
            markupType: 'option',
          },
        },
      },
    })

    test('should render the operator', () => {
      expect(wrapper.get('[data-test="argument-select"]').exists()).toBe(true)
    })

    test('should render the select', () => {
      expect(wrapper.get('[data-test="select-argument"]').exists()).toBe(true)
    })
  })
  describe('should render properly when there is an input argument and a select argument with no more arguments', () => {
    const state = {
      currentTemplate: {
        variables: [{}],
      },
    }
    const mockStore = getMockedStore(state)
    const wrapper = mount(EditorOperatorArgument, {
      ...mockStore,
      props: {
        argument: {
          hierarchicalType: 'argument',
          id: 4,
          label: 'function',
          markupType: 'select',
          options: [
            {
              label: 'greaterThan',
              hierarchicalType: 'operatorOption',
              markupType: 'option',
              outputType: 'filterOutput',
            },
            {
              label: 'LessThan',
              hierarchicalType: 'operatorOption',
              markupType: 'option',
              outputType: 'filterOutput',
            },
            {
              label: 'equals',
              hierarchicalType: 'operatorOption',
              markupType: 'option',
              outputType: 'filterOutput',
            },
            {
              label: 'deviationAbsolute',
              hierarchicalType: 'operatorOption',
              markupType: 'option',
              outputType: 'filterOutput',
            },
            {
              label: 'deviationRelative',
              hierarchicalType: 'operatorOption',
              markupType: 'option',
              outputType: 'filterOutput',
            },
            {
              label: 'deviationStandard',
              hierarchicalType: 'operatorOption',
              markupType: 'option',
              outputType: 'filterOutput',
            },
          ],
          selected: {
            arguments: [],
            hierarchicalType: 'selectedOperatorOption',
            label: 'greaterThan',
            outputType: 'filterOutput',
            markupType: 'option',
          },
        },
      },
    })

    test('should not render the argument input', () => {
      expect(wrapper.find('[data-test="argument-input"]').exists()).toBe(false)
    })

    test('should render the argument select', () => {
      expect(wrapper.find('[data-test="argument-select"]').exists()).toBe(true)
    })

    test('should render the select argument', () => {
      expect(wrapper.find('[data-test="select-argument"]').exists()).toBe(false)
    })
  })
})
