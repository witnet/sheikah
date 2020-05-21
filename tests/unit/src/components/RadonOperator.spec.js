import RadonOperator from '@/components/RadonOperator'

describe('RadonOperator.vue', () => {
  describe('should render properly when there is arguments', () => {
    const state = {
      currentTemplate: {
        variables: [{}],
      },
    }
    const wrapper = mount(RadonOperator, {
      ...createComponentMocks({ store: { rad: { state: state } } }),
      propsData: {
        scriptId: 8,
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

    it('should render the operator label', () => {
      expect(wrapper.find('[data-test="operator-label"]').text()).toBe(
        'Operator'
      )
    })
    it('should render the operator', () => {
      expect(wrapper.contains('[data-test="operator"]')).toBe(true)
    })
    it('should render the select', () => {
      expect(wrapper.find('[data-test="arguments-label"]').text()).toBe(
        'Arguments'
      )
    })
    it('should render the selected value seconday text', () => {
      expect(wrapper.contains('[data-test="has-arguments"]')).toBe(true)
    })
  })
  describe('should render properly when there is no arguments', () => {
    const state = {
      currentTemplate: {
        variables: [{}],
      },
    }
    const wrapper = mount(RadonOperator, {
      ...createComponentMocks({ store: { rad: { state: state } } }),
      propsData: {
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

    it('should render the operator label', () => {
      expect(wrapper.find('[data-test="operator-label"]').text()).toBe(
        'Operator'
      )
    })
    it('should render the operator', () => {
      expect(wrapper.contains('[data-test="operator"]')).toBe(true)
    })
    it('should render the select', () => {
      expect(wrapper.contains('[data-test="arguments-label"]')).toBe(false)
    })
    it('should render the selected value seconday text', () => {
      expect(wrapper.contains('[data-test="has-arguments"]')).toBe(false)
    })
  })
})
