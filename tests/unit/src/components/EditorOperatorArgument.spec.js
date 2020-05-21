import EditorOperatorArgument from '@/components/EditorOperatorArgument'

describe('RadonOperator.vue', () => {
  describe('should render properly when there is a select argument', () => {
    const state = {
      currentTemplate: {
        variables: [{}],
      },
    }
    const wrapper = mount(EditorOperatorArgument, {
      ...createComponentMocks({ store: { rad: { state: state } } }),
      propsData: {
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
    it('should render the operator', () => {
      expect(wrapper.contains('[data-test="argument-select"]')).toBe(true)
    })
    it('should render the select', () => {
      expect(wrapper.contains('[data-test="select-argument"]')).toBe(true)
    })
  })
  describe('should render properly when there is an input argument and a select argument with no more arguments', () => {
    const state = {
      currentTemplate: {
        variables: [{}],
      },
    }
    const wrapper = mount(EditorOperatorArgument, {
      ...createComponentMocks({ store: { rad: { state: state } } }),
      propsData: {
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
            hierarchicalType: 'selectedOperatorOption',
            label: 'greaterThan',
            outputType: 'filterOutput',
            markupType: 'option',
          },
        },
      },
    })
    it('should not render the argument input', () => {
      expect(wrapper.contains('[data-test="argument-input"]')).toBe(false)
    })
    it('should render the argument select', () => {
      expect(wrapper.contains('[data-test="argument-select"]')).toBe(true)
    })
    it('should render the select argument', () => {
      expect(wrapper.contains('[data-test="select-argument"]')).toBe(false)
    })
  })
})
