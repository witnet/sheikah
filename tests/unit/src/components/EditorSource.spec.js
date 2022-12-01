import EditorSource from '@/components/EditorSource.vue'

describe('EditorSource.vue', () => {
  describe('should render correctly', () => {
    it('should contains a the title', () => {
      const walletState = {
        theme: 'light',
      }
      const wrapper = mount(EditorSource, {
        ...createComponentMocks({
          store: {
            wallet: { state: walletState },
          },
        }),
        propsData: {
          index: 0,
          headers: '{}',
          body: '{}',
          protocol: '',
          url: '',
          contentType: '',
          kindOptions: ['HTTP-GET', 'RNG'],
          contentTypeOptions: { http: 'JSON API', rng: 'Bytes' },
        },
      })

      expect(wrapper.find('.title').text('Data Source #0'))
    })

    it('it should NOT contain subtitle if NO url', () => {
      const walletState = {
        theme: 'light',
      }
      const wrapper = mount(EditorSource, {
        ...createComponentMocks({
          store: {
            wallet: { state: walletState },
          },
        }),
        propsData: {
          index: 0,
          headers: '{}',
          body: '{}',
          protocol: '',
          url: '',
          contentType: '',
          kindOptions: ['HTTP-GET', 'RNG'],
          contentTypeOptions: { http: 'JSON API', rng: 'Bytes' },
        },
      })

      expect(wrapper.find('.subtitle').exists()).toBe(false)
    })

    it('it should NOT contain subtitle if NO valid url', () => {
      const walletState = {
        theme: 'light',
      }
      const wrapper = mount(EditorSource, {
        ...createComponentMocks({
          store: {
            wallet: { state: walletState },
          },
        }),
        propsData: {
          index: 0,
          headers: '{}',
          body: '{}',
          protocol: '',
          url: 'witnet.abcdefghij',
          contentType: '',
          kindOptions: ['HTTP-GET', 'RNG'],
          contentTypeOptions: { http: 'JSON API', rng: 'Bytes' },
        },
      })

      expect(wrapper.find('.subtitle').exists()).toBe(false)
    })

    it('it should contains subtitle if a valid url', () => {
      const walletState = {
        theme: 'light',
      }
      const wrapper = mount(EditorSource, {
        ...createComponentMocks({
          store: {
            wallet: { state: walletState },
          },
        }),
        propsData: {
          index: 0,
          headers: '{}',
          body: '{}',
          protocol: 'HTTP-GET',
          url: 'www.witnet.io',
          contentType: '',
          kindOptions: ['HTTP-GET', 'RNG'],
          contentTypeOptions: { http: 'JSON API', rng: 'Bytes' },
        },
      })

      expect(wrapper.find('.subtitle').exists()).toBe(true)
    })

    it('should contains protocol select field', () => {
      const walletState = {
        theme: 'light',
      }
      const wrapper = mount(EditorSource, {
        ...createComponentMocks({
          store: {
            wallet: { state: walletState },
          },
        }),
        propsData: {
          index: 0,
          headers: '{}',
          body: '{}',
          protocol: 'HTTP-GET',
          url: 'www.witnet.io',
          contentType: '',
          kindOptions: ['HTTP-GET', 'RNG'],
          contentTypeOptions: { http: 'JSON API', rng: 'Bytes' },
        },
      })

      expect(wrapper.find('[data-test="protocol-select"]').exists()).toBe(true)
    })

    it('should contains url input field', () => {
      const walletState = {
        theme: 'light',
      }
      const wrapper = mount(EditorSource, {
        ...createComponentMocks({
          store: {
            wallet: { state: walletState },
          },
        }),
        propsData: {
          index: 0,
          headers: '{}',
          body: '{}',
          protocol: 'HTTP-GET',
          url: 'www.witnet.io',
          contentType: '',
          kindOptions: ['HTTP-GET', 'RNG'],
          contentTypeOptions: { http: 'JSON API', rng: 'Bytes' },
        },
      })

      expect(wrapper.find('[data-test="protocol-select"]').exists()).toBe(true)
    })

    it('should contain content-type select field', () => {
      const walletState = {
        theme: 'light',
      }
      const wrapper = mount(EditorSource, {
        ...createComponentMocks({
          store: {
            wallet: { state: walletState },
          },
        }),
        propsData: {
          index: 0,
          headers: '{}',
          body: '{}',
          protocol: 'HTTP-GET',
          url: 'www.witnet.io',
          contentType: 'JSON API',
          kindOptions: ['HTTP-GET', 'RNG'],
          contentTypeOptions: { http: 'JSON API', rng: 'Bytes' },
        },
      })

      expect(wrapper.find('[data-test="content-type-select"]').exists()).toBe(
        true,
      )
    })
  })

  // FIXME: add test checking source update is called
  // FIXME: add test checking the source is delete on cross click
})
