import EditorToolBar from '@/components/EditorToolBar'
import { EDITOR_UNDO, EDITOR_REDO } from '@/store/mutation-types'

describe('EditorToolBar.vue', () => {
  describe('should render properly', () => {
    it('should render the current template name', () => {
      const mockEditorUndo = jest.fn()
      const mockEditorRedo = jest.fn()
      const mockTryDataRequest = jest.fn()
      const mockSaveTemplate = jest.fn()

      const wrapper = shallowMount(
        EditorToolBar,
        createComponentMocks({
          router: true,
          store: {
            rad: {
              state: {
                currentTemplate: { name: 'Template 1' },
              },
              mutations: {
                [EDITOR_UNDO]: mockEditorUndo,
                [EDITOR_REDO]: mockEditorRedo,
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

      const wrapper = shallowMount(
        EditorToolBar,
        createComponentMocks({
          router: true,
          store: {
            rad: {
              state: {
                currentTemplate: { name: 'Template 1' },
              },
              mutations: {
                [EDITOR_UNDO]: mockEditorUndo,
                [EDITOR_REDO]: mockEditorRedo,
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

      const wrapper = shallowMount(
        EditorToolBar,
        createComponentMocks({
          router: true,
          store: {
            rad: {
              state: {
                currentTemplate: { name: 'Template 1' },
              },
              mutations: {
                [EDITOR_UNDO]: mockEditorUndo,
                [EDITOR_REDO]: mockEditorRedo,
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

    it('should render save button', () => {
      const mockEditorUndo = jest.fn()
      const mockEditorRedo = jest.fn()
      const mockTryDataRequest = jest.fn()
      const mockSaveTemplate = jest.fn()

      const wrapper = shallowMount(
        EditorToolBar,
        createComponentMocks({
          router: true,
          store: {
            rad: {
              state: {
                currentTemplate: { name: 'Template 1' },
              },
              mutations: {
                [EDITOR_UNDO]: mockEditorUndo,
                [EDITOR_REDO]: mockEditorRedo,
              },
              actions: {
                tryDataRequest: mockTryDataRequest,
                saveTemplate: mockSaveTemplate,
              },
            },
          },
        }),
      )

      expect(wrapper.find('[data-test="action-save"]').isVisible()).toBe(true)
    })

    it('should render export selection', () => {
      const mockEditorUndo = jest.fn()
      const mockEditorRedo = jest.fn()
      const mockTryDataRequest = jest.fn()
      const mockSaveTemplate = jest.fn()

      const wrapper = shallowMount(
        EditorToolBar,
        createComponentMocks({
          router: true,
          store: {
            rad: {
              state: {
                currentTemplate: { name: 'Template 1' },
              },
              mutations: {
                [EDITOR_UNDO]: mockEditorUndo,
                [EDITOR_REDO]: mockEditorRedo,
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

      const wrapper = shallowMount(
        EditorToolBar,
        createComponentMocks({
          router: true,
          store: {
            rad: {
              state: {
                currentTemplate: { name: 'Template 1' },
              },
              mutations: {
                [EDITOR_UNDO]: mockEditorUndo,
                [EDITOR_REDO]: mockEditorRedo,
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

      const wrapper = mount(
        EditorToolBar,
        createComponentMocks({
          router: true,
          store: {
            rad: {
              namespaced: false,
              state: {
                currentTemplate: { name: 'Template 1' },
              },
              mutations: {
                [EDITOR_UNDO]: mockEditorUndo,
                [EDITOR_REDO]: mockEditorRedo,
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

      const wrapper = mount(
        EditorToolBar,
        createComponentMocks({
          router: true,
          store: {
            rad: {
              namespaced: false,
              state: {
                currentTemplate: { name: 'Template 1' },
              },
              mutations: {
                [EDITOR_UNDO]: mockEditorUndo,
                [EDITOR_REDO]: mockEditorRedo,
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

    it('save', async () => {
      const mockEditorUndo = jest.fn()
      const mockEditorRedo = jest.fn()
      const mockTryDataRequest = jest.fn()
      const mockSaveTemplate = jest.fn()

      const wrapper = mount(
        EditorToolBar,
        createComponentMocks({
          router: true,
          store: {
            rad: {
              namespaced: false,
              state: {
                currentTemplate: { name: 'Template 1' },
              },
              mutations: {
                [EDITOR_UNDO]: mockEditorUndo,
                [EDITOR_REDO]: mockEditorRedo,
              },
              actions: {
                tryDataRequest: mockTryDataRequest,
                saveTemplate: mockSaveTemplate,
              },
            },
          },
        }),
      )

      const saveButton = wrapper.find('[data-test="action-save"]')
      await saveButton.trigger('click')

      expect(mockSaveTemplate).toHaveBeenCalled()
    })

    it('try', async () => {
      const mockEditorUndo = jest.fn()
      const mockEditorRedo = jest.fn()
      const mockTryDataRequest = jest.fn()
      const mockSaveTemplate = jest.fn()

      const wrapper = mount(
        EditorToolBar,
        createComponentMocks({
          router: true,
          store: {
            rad: {
              namespaced: false,
              state: {
                currentTemplate: { name: 'Template 1' },
              },
              mutations: {
                [EDITOR_UNDO]: mockEditorUndo,
                [EDITOR_REDO]: mockEditorRedo,
              },
              actions: {
                tryDataRequest: mockTryDataRequest,
                saveTemplate: mockSaveTemplate,
              },
            },
          },
        }),
      )

      const tryButton = wrapper.find('[data-test="action-try"]')
      await tryButton.trigger('click')

      expect(mockTryDataRequest).toHaveBeenCalled()
    })

    it('deploy', async () => {
      const mockEditorUndo = jest.fn()
      const mockEditorRedo = jest.fn()
      const mockTryDataRequest = jest.fn()
      const mockSaveTemplate = jest.fn()

      const wrapper = mount(
        EditorToolBar,
        createComponentMocks({
          router: true,
          store: {
            rad: {
              namespaced: false,
              state: {
                currentTemplate: { name: 'Template 1' },
              },
              mutations: {
                [EDITOR_UNDO]: mockEditorUndo,
                [EDITOR_REDO]: mockEditorRedo,
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
