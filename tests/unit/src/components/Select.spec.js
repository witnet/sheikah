import Select from '@/components/Select.vue'

describe('Select.vue', () => {
  const mockStore = createMocks({
    storeModules: {
      wallet: {
        state: {
          theme: 'light',
        },
      },
    },
    stubs: {
      CustomIcon: true,
    },
  })
  describe('should render properly', () => {
    const wrapper = shallowMount(Select, {
      ...mockStore,
      props: {
        type: 'big',
        modelValue: {
          primaryText: 'option 1',
          secondaryText: 'option value 1',
        },
        options: [
          {
            primaryText: 'option 1',
            secondaryText: 'option value 1',
          },
          {
            primaryText: 'option 2',
            secondaryText: 'option value 2',
          },
          {
            primaryText: 'option 3',
            secondaryText: 'option value 3',
          },
        ],
      },
    })
    wrapper.setData({
      areOptionsVisible: false,
    })

    test('should render the selected value', () => {
      expect(wrapper.find('[data-test="selected-option-primary"]').text()).toBe(
        'option 1',
      )
    })

    test('finds does not find the options', () => {
      expect(wrapper.find('[data-test="options"]').exists()).toBe(false)
    })
  })
  describe('should render properly', () => {
    const wrapper = shallowMount(Select, {
      ...mockStore,
      props: {
        type: 'big',
        modelValue: {
          primaryText: 'option 1',
          secondaryText: 'option value 1',
        },
        options: [
          {
            primaryText: 'option 1',
            secondaryText: 'option value 1',
          },
          {
            primaryText: 'option 2',
            secondaryText: 'option value 2',
          },
          {
            primaryText: 'option 3',
            secondaryText: 'option value 3',
          },
        ],
      },
    })
    wrapper.setData({
      areOptionsVisible: true,
    })

    test('finds does not find the options', () => {
      expect(wrapper.find('[data-test="options"]').exists()).toBe(true)
    })

    test('should render the selected option 1', () => {
      expect(wrapper.find('[data-test="option-label-0"]').text()).toBe(
        'option 1',
      )
    })

    test('should render the selected option 2', () => {
      expect(wrapper.find('[data-test="option-label-1"]').text()).toBe(
        'option 2',
      )
    })

    test('should render the selected option 3', () => {
      expect(wrapper.find('[data-test="option-label-2"]').text()).toBe(
        'option 3',
      )
    })
  })
  describe('delete file when click on delete', () => {
    const wrapper = mount(Select, {
      ...mockStore,
      props: {
        type: 'big',
        modelValue: {
          primaryText: 'option 1',
          secondaryText: 'option value 1',
        },
        options: [
          {
            primaryText: 'option 1',
            secondaryText: 'option value 1',
          },
          {
            primaryText: 'option 2',
            secondaryText: 'option value 2',
          },
          {
            primaryText: 'option 3',
            secondaryText: 'option value 3',
          },
        ],
      },
    })
    wrapper.setData({
      areOptionsVisible: true,
    })

    test('triggers click', () => {
      expect(wrapper.find('[data-test="option-1"]').trigger('click'))
    })

    test('should render the selected value', () => {
      expect(wrapper.find('[data-test="selected-option-primary"]').text()).toBe(
        'option 2',
      )
    })
  })
})
