import OperatorOutput from '@/components/OperatorOutput.vue'

describe('OperatorOutput.vue', () => {
  describe('should render correctly when there is an output and there is no error', () => {
    const wrapper = shallowMount(OperatorOutput, {
      propsData: {
        label: 'string',
        output: {
          RadonString:
            '0000000000000000000f83a7490243701b7d5d287b98e20792d951584347e009',
        },
        filter: false,
        error: null,
      },
      ...createComponentMocks({
        store: {
          uiInteractions: {
            state: {
              generateRadRequestResultLoading: false,
            },
          },
        },
      }),
    })

    it('should not find the filter output label', () => {
      expect(wrapper.find('[data-test="filter-output"]').exists()).toBe(false)
    })

    it('finds the label', () => {
      expect(wrapper.find('[data-test="label"]').text()).toBe('string')
    })

    it('should find the output icon', () => {
      expect(wrapper.find('[data-test="output"]').exists()).toBe(true)
    })

    it('should not find the error icon', () => {
      expect(wrapper.find('[data-test="error"]').exists()).toBe(false)
    })

    it('should not find the empty output icon', () => {
      expect(wrapper.find('[data-test="empty-output"]').exists()).toBe(false)
    })
  })
  describe('should render correctly when there is not an output', () => {
    const wrapper = shallowMount(OperatorOutput, {
      propsData: {
        label: 'string',
        output: null,
        filter: false,
        error: null,
      },
      ...createComponentMocks({
        store: {
          uiInteractions: {
            state: {
              generateRadRequestResultLoading: false,
            },
          },
        },
      }),
    })

    it('should not find the filter output label', () => {
      expect(wrapper.find('[data-test="filter-output"]').exists()).toBe(false)
    })

    it('finds the label', () => {
      expect(wrapper.find('[data-test="label"]').text()).toBe('string')
    })

    it('should not find the output icon', () => {
      expect(wrapper.find('[data-test="output"]').exists()).toBe(false)
    })

    it('should not find the error icon', () => {
      expect(wrapper.find('[data-test="error"]').exists()).toBe(false)
    })

    it('should find the empty output icon', () => {
      expect(wrapper.find('[data-test="empty-output"]').exists()).toBe(true)
    })
  })
  describe('should render correctly when there is an error', () => {
    const wrapper = shallowMount(OperatorOutput, {
      propsData: {
        label: 'string',
        output: null,
        filter: false,
        error: 'error',
      },
      ...createComponentMocks({
        store: {
          uiInteractions: {
            state: {
              generateRadRequestResultLoading: false,
            },
          },
        },
      }),
    })

    it('should not find the filter output label', () => {
      expect(wrapper.find('[data-test="filter-output"]').exists()).toBe(false)
    })

    it('finds the label', () => {
      expect(wrapper.find('[data-test="label"]').text()).toBe('string')
    })

    it('should not find the output icon', () => {
      expect(wrapper.find('[data-test="output"]').exists()).toBe(false)
    })

    it('should find the error icon', () => {
      expect(wrapper.find('[data-test="error"]').exists()).toBe(true)
    })

    it('should not find the empty output icon', () => {
      expect(wrapper.find('[data-test="empty-output"]').exists()).toBe(false)
    })
  })
  describe('should render correctly when the output is a filter', () => {
    const wrapper = shallowMount(OperatorOutput, {
      propsData: {
        label: 'string',
        output: null,
        filter: true,
        error: null,
      },
      ...createComponentMocks({
        store: {
          uiInteractions: {
            state: {
              generateRadRequestResultLoading: false,
            },
          },
        },
      }),
    })

    it('should not find the filter output label', () => {
      expect(wrapper.find('[data-test="filter-output"]').exists()).toBe(true)
    })

    it('finds the label', () => {
      expect(wrapper.find('[data-test="label"]').text()).toBe('string')
    })

    it('should not find the output icon', () => {
      expect(wrapper.find('[data-test="output"]').exists()).toBe(false)
    })

    it('should find the error icon', () => {
      expect(wrapper.find('[data-test="error"]').exists()).toBe(false)
    })

    it('should not find the empty output icon', () => {
      expect(wrapper.find('[data-test="empty-output"]').exists()).toBe(true)
    })
  })
})
