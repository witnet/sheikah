import EditorSource from '@/components/EditorSource'

describe('EditorSource.vue', () => {
  describe('should render correctly', () => {
    it('should contains a the title', () => {
      const wrapper = mount(EditorSource, {
        propsData: {
          index: 0,
          protocol: '',
          url: '',
          contentType: '',
        },
      })

      expect(wrapper.find('.title').text('Data Source #0'))
    })

    it('it should NOT contain subtitle if NO url', () => {
      const wrapper = mount(EditorSource, {
        propsData: {
          index: 0,
          protocol: '',
          url: '',
          contentType: '',
        },
      })

      expect(wrapper.find('.subtitle').exists()).toBe(false)
    })

    it('it should NOT contain subtitle if NO valid url', () => {
      const wrapper = mount(EditorSource, {
        propsData: {
          index: 0,
          protocol: '',
          url: 'witnet.abcdefghij',
          contentType: '',
        },
      })

      expect(wrapper.find('.subtitle').exists()).toBe(false)
    })

    it('it should contains subtitle if a valid url', () => {
      const wrapper = mount(EditorSource, {
        propsData: {
          index: 0,
          protocol: 'HTTP-GET',
          url: 'www.witnet.io',
          contentType: '',
        },
      })

      expect(wrapper.find('.subtitle').exists()).toBe(true)
    })

    it('should contains protocol select field', () => {
      const wrapper = mount(EditorSource, {
        propsData: {
          index: 0,
          protocol: 'HTTP-GET',
          url: 'www.witnet.io',
          contentType: '',
        },
      })

      expect(wrapper.find('[data-test="protocol-select"]').exists()).toBe(true)
    })

    it('should contains url input field', () => {
      const wrapper = mount(EditorSource, {
        propsData: {
          index: 0,
          protocol: 'HTTP-GET',
          url: 'www.witnet.io',
          contentType: '',
        },
      })

      expect(wrapper.find('[data-test="protocol-select"]').exists()).toBe(true)
    })

    it('should contains content-type select field', () => {
      const wrapper = mount(EditorSource, {
        propsData: {
          index: 0,
          protocol: 'HTTP-GET',
          url: 'www.witnet.io',
          contentType: 'JSON API',
        },
      })

      expect(wrapper.find('[data-test="content-type-select"]').exists()).toBe(
        true
      )
    })
  })

  // FIXME: add test checking source update is called
  // FIXME: add test checking the source is delete on cross click
})
