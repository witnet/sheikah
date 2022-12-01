import RadonOperator from '@/components/RadonOperator.vue'

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
    const wrapper = mount(RadonOperator, {
      ...createComponentMocks({
        store: {
          rad: { state: state },
          wallet: { state: walletState },
          uiInteractions: { state: interactionsState },
        },
      }),
      propsData: {
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

    it('should render the operator label', () => {
      expect(wrapper.find('[data-test="operator-label"]').text()).toBe(
        'Operator',
      )
    })

    it('should render the operator', () => {
      expect(wrapper.find('[data-test="operator"]').exists()).toBe(true)
    })

    it('should render the select', () => {
      expect(wrapper.find('[data-test="arguments-label"]').text()).toBe(
        'Arguments',
      )
    })

    it('should render the selected value seconday text', () => {
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
    const wrapper = mount(RadonOperator, {
      ...createComponentMocks({
        store: {
          rad: { state: state },
          wallet: { state: walletState },
          uiInteractions: { state: interactionsState },
        },
      }),
      propsData: {
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

    it('should render the operator label', () => {
      expect(wrapper.find('[data-test="operator-label"]').text()).toBe(
        'Operator',
      )
    })

    it('should render the operator', () => {
      expect(wrapper.find('[data-test="operator"]').exists()).toBe(true)
    })

    it('should render the select', () => {
      expect(wrapper.find('[data-test="arguments-label"]').exists()).toBe(false)
    })

    it('should render the selected value seconday text', () => {
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
    const wrapper = mount(RadonOperator, {
      ...createComponentMocks({
        store: {
          rad: { state: state },
          wallet: { state: walletState },
          uiInteractions: { state: interactionsState },
        },
      }),
      propsData: {
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

    it('should emit an event to remove the operator', async () => {
      await wrapper.find('[data-test="delete-operator"]').trigger('click')

      expect(wrapper.emitted()['delete-operator']).toBeTruthy()
    })

    it('should emit an event to add an operator', async () => {
      await wrapper.find('[data-test="add-operator"]').trigger('click')

      expect(wrapper.emitted()['add-operator']).toBeTruthy()
    })
  })
})
