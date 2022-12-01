import Select from '@/components/Select.vue'

describe('Select.vue', () => {
  describe('should render properly', () => {
    const wrapper = shallowMount(Select, {
      ...createComponentMocks({
        store: {
          wallet: {
            state: {
              theme: 'light',
            },
          },
        },
      }),
      propsData: {
        type: 'big',
        value: {
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

    it('should render the selected value', () => {
      expect(wrapper.find('[data-test="selected-option-primary"]').text()).toBe(
        'option 1',
      )
    })

    it('finds does not find the options', () => {
      expect(wrapper.find('[data-test="options"]').exists()).toBe(false)
    })
  })
  describe('should render properly', () => {
    const wrapper = shallowMount(Select, {
      ...createComponentMocks({
        store: {
          wallet: {
            state: {
              theme: 'light',
            },
          },
        },
      }),
      propsData: {
        type: 'big',
        value: {
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

    it('finds does not find the options', () => {
      expect(wrapper.find('[data-test="options"]').exists()).toBe(true)
    })

    it('should render the selected option 1', () => {
      expect(wrapper.find('[data-test="option-label-0"]').text()).toBe(
        'option 1',
      )
    })

    it('should render the selected option 2', () => {
      expect(wrapper.find('[data-test="option-label-1"]').text()).toBe(
        'option 2',
      )
    })

    it('should render the selected option 3', () => {
      expect(wrapper.find('[data-test="option-label-2"]').text()).toBe(
        'option 3',
      )
    })
  })
  describe('delete file when click on delete', () => {
    const wrapper = mount(Select, {
      ...createComponentMocks({
        store: {
          wallet: {
            state: {
              theme: 'light',
            },
          },
        },
      }),
      propsData: {
        type: 'big',
        value: {
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

    it('triggers click', () => {
      expect(wrapper.find('[data-test="option-1"]').trigger('click'))
    })

    it('should render the selected value', () => {
      expect(wrapper.find('[data-test="selected-option-primary"]').text()).toBe(
        'option 2',
      )
    })
  })
})
