import EditorStageSources from '@/components/EditorStageSources'
import EditorSource from '@/components/EditorSource'
import Fieldset from '@/components/Fieldset'

describe('EditorStageSources.vue', () => {
  describe('should render correctly', () => {
    it('should render as much sources as there are in the store', () => {
      const wrapper = mount(EditorStageSources, {
        ...createComponentMocks({
          store: {
            rad: {
              state: {
                radRequest: {
                  getMarkup: () => ({
                    retrieve: [
                      {
                        url: 'url1',
                        kind: 'HTTP-GET',
                        contentType: 'JSON API',
                      },
                      {
                        url: 'url2',
                        kind: 'HTTP-GET',
                        contentType: 'JSON API',
                      },
                    ],
                  }),
                },
              },
            },
          },
        }),
      })

      expect(wrapper.findAllComponents(EditorSource).length).toBe(2)
    })

    it('should contains an add source button', () => {
      const addSourceMock = jest.fn()
      const wrapper = mount(EditorStageSources, {
        ...createComponentMocks({
          store: {
            rad: {
              state: {
                radRequest: {
                  getMarkup: () => ({
                    retrieve: [
                      {
                        url: 'url1',
                        kind: 'HTTP-GET',
                        contentType: 'JSON API',
                      },
                      {
                        url: 'url2',
                        kind: 'HTTP-GET',
                        contentType: 'JSON API',
                      },
                    ],
                  }),
                },
              },
              actions: {
                ADD_SOURCE: addSourceMock,
              },
            },
          },
        }),
      })

      expect(wrapper.find('[data-test="add-source"]').isVisible()).toBe(true)
    })

    it('should contains two fieldsets', () => {
      const addSourceMock = jest.fn()
      const wrapper = mount(EditorStageSources, {
        ...createComponentMocks({
          store: {
            rad: {
              state: {
                radRequest: {
                  getMarkup: () => ({
                    retrieve: [],
                  }),
                },
              },
              actions: {
                ADD_SOURCE: addSourceMock,
              },
            },
          },
        }),
      })

      expect(wrapper.findAllComponents(Fieldset).length).toBe(2)
    })
  })

  it('should create a new source on click "add source"', () => {
    const addSourceMock = jest.fn()
    const wrapper = mount(EditorStageSources, {
      ...createComponentMocks({
        store: {
          rad: {
            state: {
              radRequest: {
                getMarkup: () => ({
                  retrieve: [],
                }),
              },
            },
            mutations: {
              ADD_SOURCE: addSourceMock,
            },
          },
        },
      }),
    })
    wrapper.find('[data-test="add-source"]').trigger('click')
    expect(addSourceMock).toBeCalled()
  })
})
