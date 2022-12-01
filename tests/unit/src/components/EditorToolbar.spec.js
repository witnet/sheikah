import EditorToolBar from '@/components/EditorToolBar.vue'
import { EDITOR_UNDO, EDITOR_REDO } from '@/store/mutation-types'
import { NETWORK_STATUS } from '@/constants'

describe('EditorToolBar.vue', () => {
  describe('should render properly', () => {
    it('should render the current template name', () => {
      const mockEditorUndo = jest.fn()
      const mockEditorRedo = jest.fn()
      const mockTryDataRequest = jest.fn()
      const mockSaveTemplate = jest.fn()
      const mockSetError = jest.fn()

      const wrapper = shallowMount(
        EditorToolBar,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                status: {
                  currentState: NETWORK_STATUS.SYNCED,
                },
              },
            },
            rad: {
              state: {
                currentTemplate: { name: 'Template 1' },
              },
              mutations: {
                [EDITOR_UNDO]: mockEditorUndo,
                [EDITOR_REDO]: mockEditorRedo,
                setError: mockSetError,
              },
              actions: {
                tryDataRequest: mockTryDataRequest,
                saveTemplate: mockSaveTemplate,
              },
            },
          },
        }),
      )

      expect(wrapper.find('.name').text()).toBe('Template 1')
    })

    it('should render redo button', () => {
      const mockEditorUndo = jest.fn()
      const mockEditorRedo = jest.fn()
      const mockTryDataRequest = jest.fn()
      const mockSaveTemplate = jest.fn()
      const mockSetError = jest.fn()

      const wrapper = shallowMount(
        EditorToolBar,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                status: {
                  currentState: NETWORK_STATUS.SYNCED,
                },
              },
            },
            rad: {
              state: {
                currentTemplate: { name: 'Template 1' },
              },
              mutations: {
                [EDITOR_UNDO]: mockEditorUndo,
                [EDITOR_REDO]: mockEditorRedo,
                setError: mockSetError,
              },
              actions: {
                tryDataRequest: mockTryDataRequest,
                saveTemplate: mockSaveTemplate,
              },
            },
          },
        }),
      )

      expect(wrapper.find('[data-test="action-redo"]').isVisible()).toBe(true)
    })

    it('should render undo button', () => {
      const mockEditorUndo = jest.fn()
      const mockEditorRedo = jest.fn()
      const mockTryDataRequest = jest.fn()
      const mockSaveTemplate = jest.fn()
      const mockSetError = jest.fn()

      const wrapper = shallowMount(
        EditorToolBar,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                status: {
                  currentState: NETWORK_STATUS.SYNCED,
                },
              },
            },
            rad: {
              state: {
                currentTemplate: { name: 'Template 1' },
              },
              mutations: {
                [EDITOR_UNDO]: mockEditorUndo,
                [EDITOR_REDO]: mockEditorRedo,
                setError: mockSetError,
              },
              actions: {
                tryDataRequest: mockTryDataRequest,
                saveTemplate: mockSaveTemplate,
              },
            },
          },
        }),
      )

      expect(wrapper.find('[data-test="action-undo"]').isVisible()).toBe(true)
    })

    it('should render export selection', () => {
      const mockEditorUndo = jest.fn()
      const mockEditorRedo = jest.fn()
      const mockTryDataRequest = jest.fn()
      const mockSaveTemplate = jest.fn()
      const mockSetError = jest.fn()

      const wrapper = shallowMount(
        EditorToolBar,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                status: {
                  currentState: NETWORK_STATUS.SYNCED,
                },
              },
            },
            rad: {
              state: {
                currentTemplate: { name: 'Template 1' },
              },
              mutations: {
                [EDITOR_UNDO]: mockEditorUndo,
                [EDITOR_REDO]: mockEditorRedo,
                setError: mockSetError,
              },
              actions: {
                tryDataRequest: mockTryDataRequest,
                saveTemplate: mockSaveTemplate,
              },
            },
          },
        }),
      )

      expect(wrapper.find('[data-test="export-selection"]').isVisible()).toBe(
        true,
      )
    })

    it('should render try button', () => {
      const mockEditorUndo = jest.fn()
      const mockEditorRedo = jest.fn()
      const mockTryDataRequest = jest.fn()
      const mockSaveTemplate = jest.fn()
      const mockSetError = jest.fn()

      const wrapper = shallowMount(
        EditorToolBar,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                status: {
                  currentState: NETWORK_STATUS.SYNCED,
                },
              },
            },
            rad: {
              state: {
                currentTemplate: { name: 'Template 1' },
              },
              mutations: {
                [EDITOR_UNDO]: mockEditorUndo,
                [EDITOR_REDO]: mockEditorRedo,
                setError: mockSetError,
              },
              actions: {
                tryDataRequest: mockTryDataRequest,
                saveTemplate: mockSaveTemplate,
              },
            },
          },
        }),
      )

      expect(wrapper.find('[data-test="action-try"]').isVisible()).toBe(true)
    })
  })

  describe('should buttons trigger its action on click', () => {
    it('redo', async () => {
      const mockEditorUndo = jest.fn(() => true)
      const mockEditorRedo = jest.fn(() => true)
      const mockSaveTemplate = jest.fn()
      const mockclearDataRequestResult = jest.fn()
      const mockSetError = jest.fn()

      const wrapper = mount(
        EditorToolBar,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                status: {
                  currentState: NETWORK_STATUS.SYNCED,
                },
              },
            },
            rad: {
              namespaced: false,
              state: {
                currentTemplate: { name: 'Template 1' },
              },
              mutations: {
                [EDITOR_UNDO]: mockEditorUndo,
                [EDITOR_REDO]: mockEditorRedo,
                setError: mockSetError,
                clearDataRequestResult: mockclearDataRequestResult,
              },
              actions: {
                saveTemplate: mockSaveTemplate,
              },
            },
          },
        }),
      )
      const redoButton = wrapper.find('[data-test="action-redo"]')
      await redoButton.trigger('click')
      expect(mockEditorRedo).toHaveBeenCalled()
    })

    it('undo', async () => {
      const mockEditorUndo = jest.fn()
      const mockEditorRedo = jest.fn()
      const mockTryDataRequest = jest.fn()
      const mockSaveTemplate = jest.fn()
      const mockSetError = jest.fn()

      const wrapper = mount(
        EditorToolBar,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                status: {
                  currentState: NETWORK_STATUS.SYNCED,
                },
              },
            },
            rad: {
              namespaced: false,
              state: {
                currentTemplate: { name: 'Template 1' },
              },
              mutations: {
                [EDITOR_UNDO]: mockEditorUndo,
                [EDITOR_REDO]: mockEditorRedo,
                setError: mockSetError,
              },
              actions: {
                tryDataRequest: mockTryDataRequest,
                saveTemplate: mockSaveTemplate,
              },
            },
          },
        }),
      )

      const undoButton = wrapper.find('[data-test="action-undo"]')
      await undoButton.trigger('click')
      expect(mockEditorUndo).toHaveBeenCalled()
    })

    it('try', async () => {
      const mockEditorUndo = jest.fn()
      const mockEditorRedo = jest.fn()
      const mockToggleTryDataRequest = jest.fn()
      const mockSaveTemplate = jest.fn()
      const mockSetError = jest.fn()

      const wrapper = mount(
        EditorToolBar,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                status: {
                  currentState: NETWORK_STATUS.SYNCED,
                },
              },
            },
            rad: {
              namespaced: false,
              state: {
                currentTemplate: { name: 'Template 1' },
                autoTry: false,
              },
              mutations: {
                [EDITOR_UNDO]: mockEditorUndo,
                [EDITOR_REDO]: mockEditorRedo,
                setError: mockSetError,
                toggleTryDataRequest: mockToggleTryDataRequest,
              },
              actions: {
                saveTemplate: mockSaveTemplate,
              },
            },
          },
        }),
      )

      const tryButton = wrapper.find('[data-test="action-try"]')
      await tryButton.trigger('click')

      expect(mockToggleTryDataRequest).toHaveBeenCalled()
    })

    it('does not deploy when node status is not SYNCED', async () => {
      const mockEditorUndo = jest.fn()
      const mockEditorRedo = jest.fn()
      const mockTryDataRequest = jest.fn()
      const mockSaveTemplate = jest.fn()
      const mockSetError = jest.fn()

      const wrapper = mount(
        EditorToolBar,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                status: {
                  currentState: NETWORK_STATUS.NODE_DISCONNECTED,
                },
              },
            },
            rad: {
              namespaced: false,
              state: {
                currentTemplate: { name: 'Template 1' },
              },
              mutations: {
                [EDITOR_UNDO]: mockEditorUndo,
                [EDITOR_REDO]: mockEditorRedo,
                setError: mockSetError,
              },
              actions: {
                tryDataRequest: mockTryDataRequest,
                saveTemplate: mockSaveTemplate,
              },
            },
          },
        }),
      )

      const tryButton = wrapper.find('[data-test="action-deploy"]')
      await tryButton.trigger('click')
      await nextTick()
      expect(wrapper.emitted().deploy).toBeFalsy()
    })

    it('deploy when node status is SYNCED', async () => {
      const mockEditorUndo = jest.fn()
      const mockEditorRedo = jest.fn()
      const mockTryDataRequest = jest.fn()
      const mockSaveTemplate = jest.fn()
      const mockSetError = jest.fn()

      const wrapper = mount(
        EditorToolBar,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                status: {
                  currentState: NETWORK_STATUS.SYNCED,
                },
              },
            },
            rad: {
              namespaced: false,
              state: {
                currentTemplate: { name: 'Template 1' },
              },
              mutations: {
                [EDITOR_UNDO]: mockEditorUndo,
                [EDITOR_REDO]: mockEditorRedo,
                setError: mockSetError,
              },
              actions: {
                tryDataRequest: mockTryDataRequest,
                saveTemplate: mockSaveTemplate,
              },
            },
          },
        }),
      )

      const tryButton = wrapper.find('[data-test="action-deploy"]')
      await tryButton.trigger('click')
      await nextTick()
      expect(wrapper.emitted().deploy).toBeTruthy()
    })
  })
})
