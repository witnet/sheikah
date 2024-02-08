import EditorToolBar from '@/components/EditorToolBar.vue'
import { EDITOR_UNDO, EDITOR_REDO } from '@/store/mutation-types'
import { NETWORK_STATUS } from '@/constants'

import { describe, expect, test, vi } from 'vitest'

import {
  ElButton,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElSwitch,
  ElTooltip,
} from 'element-plus'

describe('EditorToolBar.vue', () => {
  describe('should render properly', () => {
    test('should render the current template name', () => {
      const mockEditorUndo = vi.fn()
      const mockEditorRedo = vi.fn()
      const mockTryDataRequest = vi.fn()
      const mockSaveTemplate = vi.fn()
      const mockSetError = vi.fn()
      const mockStore = createMocks({
        storeModules: {
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
        stubs: {
          'el-dropdown-item': ElDropdownItem,
          'el-dropdown-menu': ElDropdownMenu,
          'el-dropdown': ElDropdown,
          'el-switch': ElSwitch,
          'el-tooltip': ElTooltip,
          'el-button': ElButton,
          'font-awesome-icon': true,
          'router-link': true,
        },
      })

      const wrapper = mount(EditorToolBar, {
        ...mockStore,
      })

      expect(wrapper.find('.name').text()).toBe('Template 1')
    })

    test('should render redo button', () => {
      const mockEditorUndo = vi.fn()
      const mockEditorRedo = vi.fn()
      const mockTryDataRequest = vi.fn()
      const mockSaveTemplate = vi.fn()
      const mockSetError = vi.fn()
      const mockStore = createMocks({
        storeModules: {
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
        stubs: {
          'el-dropdown-item': ElDropdownItem,
          'el-dropdown-menu': ElDropdownMenu,
          'el-dropdown': ElDropdown,
          'el-switch': ElSwitch,
          'el-tooltip': ElTooltip,
          'el-button': ElButton,
          'font-awesome-icon': true,
          'router-link': true,
        },
      })

      const wrapper = mount(EditorToolBar, {
        ...mockStore,
      })

      expect(wrapper.find('[data-test="action-redo"]').isVisible()).toBe(true)
    })

    test('should render undo button', () => {
      const mockEditorUndo = vi.fn()
      const mockEditorRedo = vi.fn()
      const mockTryDataRequest = vi.fn()
      const mockSaveTemplate = vi.fn()
      const mockSetError = vi.fn()
      const mockStore = createMocks({
        storeModules: {
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
        stubs: {
          'el-dropdown-item': ElDropdownItem,
          'el-dropdown-menu': ElDropdownMenu,
          'el-dropdown': ElDropdown,
          'el-switch': ElSwitch,
          'el-tooltip': ElTooltip,
          'el-button': ElButton,
          'font-awesome-icon': true,
          'router-link': true,
        },
      })

      const wrapper = mount(EditorToolBar, {
        ...mockStore,
      })

      expect(wrapper.find('[data-test="action-undo"]').isVisible()).toBe(true)
    })

    test('should render export selection', () => {
      const mockEditorUndo = vi.fn()
      const mockEditorRedo = vi.fn()
      const mockTryDataRequest = vi.fn()
      const mockSaveTemplate = vi.fn()
      const mockSetError = vi.fn()
      const mockStore = createMocks({
        storeModules: {
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
        stubs: {
          'el-dropdown-item': ElDropdownItem,
          'el-dropdown-menu': ElDropdownMenu,
          'el-dropdown': ElDropdown,
          'el-switch': ElSwitch,
          'el-tooltip': ElTooltip,
          'el-button': ElButton,
          'font-awesome-icon': true,
          'router-link': true,
        },
      })
      const wrapper = mount(EditorToolBar, {
        ...mockStore,
        router: true,
      })

      expect(wrapper.find('[data-test="export-selection"]').isVisible()).toBe(
        true,
      )
    })

    test('should render try button', () => {
      const mockEditorUndo = vi.fn()
      const mockEditorRedo = vi.fn()
      const mockTryDataRequest = vi.fn()
      const mockSaveTemplate = vi.fn()
      const mockSetError = vi.fn()
      const mockStore = createMocks({
        storeModules: {
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
        stubs: {
          'el-dropdown-item': ElDropdownItem,
          'el-dropdown-menu': ElDropdownMenu,
          'el-dropdown': ElDropdown,
          'el-switch': ElSwitch,
          'el-tooltip': ElTooltip,
          'el-button': ElButton,
          'font-awesome-icon': true,
          'router-link': true,
        },
      })
      const wrapper = mount(EditorToolBar, {
        ...mockStore,
      })

      expect(wrapper.find('[data-test="action-try"]').isVisible()).toBe(true)
    })
  })

  describe('should buttons trigger its action on click', () => {
    test('redo', async () => {
      const mockEditorUndo = vi.fn(() => true)
      const mockEditorRedo = vi.fn(() => true)
      const mockSaveTemplate = vi.fn()
      const mockclearDataRequestResult = vi.fn()
      const mockSetError = vi.fn()
      const mockStore = createMocks({
        storeModules: {
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
        stubs: {
          'el-dropdown-item': ElDropdownItem,
          'el-dropdown-menu': ElDropdownMenu,
          'el-dropdown': ElDropdown,
          'el-switch': ElSwitch,
          'el-tooltip': ElTooltip,
          'el-button': ElButton,
          'font-awesome-icon': true,
          'router-link': true,
        },
      })
      const wrapper = mount(EditorToolBar, {
        ...mockStore,
      })
      const redoButton = wrapper.find('[data-test="action-redo"]')
      await redoButton.trigger('click')
      expect(mockEditorRedo).toHaveBeenCalled()
    })

    test('undo', async () => {
      const mockEditorUndo = vi.fn()
      const mockEditorRedo = vi.fn()
      const mockTryDataRequest = vi.fn()
      const mockSaveTemplate = vi.fn()
      const mockSetError = vi.fn()
      const mockStore = createMocks({
        storeModules: {
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
        stubs: {
          'el-dropdown-item': ElDropdownItem,
          'el-dropdown-menu': ElDropdownMenu,
          'el-dropdown': ElDropdown,
          'el-switch': ElSwitch,
          'el-tooltip': ElTooltip,
          'el-button': ElButton,
          'font-awesome-icon': true,
          'router-link': true,
        },
      })

      const wrapper = mount(EditorToolBar, {
        ...mockStore,
      })

      const undoButton = wrapper.find('[data-test="action-undo"]')
      await undoButton.trigger('click')
      expect(mockEditorUndo).toHaveBeenCalled()
    })

    test('try', async () => {
      const mockEditorUndo = vi.fn()
      const mockEditorRedo = vi.fn()
      const mockToggleTryDataRequest = vi.fn()
      const mockSaveTemplate = vi.fn()
      const mockSetError = vi.fn()
      const mockStore = createMocks({
        storeModules: {
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
        stubs: {
          'el-dropdown-item': ElDropdownItem,
          'el-dropdown-menu': ElDropdownMenu,
          'el-dropdown': ElDropdown,
          'el-switch': ElSwitch,
          'el-tooltip': ElTooltip,
          'el-button': ElButton,
          'font-awesome-icon': true,
          'router-link': true,
        },
      })
      const wrapper = mount(EditorToolBar, {
        ...mockStore,
      })

      const tryButton = wrapper.find('[data-test="action-try"]')
      await tryButton.trigger('click')

      expect(mockToggleTryDataRequest).toHaveBeenCalled()
    })

    test('does not deploy when node status is not SYNCED', async () => {
      const mockEditorUndo = vi.fn()
      const mockEditorRedo = vi.fn()
      const mockTryDataRequest = vi.fn()
      const mockSaveTemplate = vi.fn()
      const mockSetError = vi.fn()
      const mockStore = createMocks({
        storeModules: {
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
        stubs: {
          'el-dropdown-item': ElDropdownItem,
          'el-dropdown-menu': ElDropdownMenu,
          'el-dropdown': ElDropdown,
          'el-switch': ElSwitch,
          'el-tooltip': ElTooltip,
          'el-button': ElButton,
          'font-awesome-icon': true,
          'router-link': true,
        },
      })
      const wrapper = mount(EditorToolBar, {
        ...mockStore,
      })

      const tryButton = wrapper.find('[data-test="action-deploy"]')
      await tryButton.trigger('click')
      await flushPromises()
      expect(wrapper.emitted().deploy).toBeFalsy()
    })

    test('deploy when node status is SYNCED', async () => {
      const mockEditorUndo = vi.fn()
      const mockEditorRedo = vi.fn()
      const mockTryDataRequest = vi.fn()
      const mockSaveTemplate = vi.fn()
      const mockSetError = vi.fn()
      const mockStore = createMocks({
        storeModules: {
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
        stubs: {
          'el-dropdown-item': ElDropdownItem,
          'el-dropdown-menu': ElDropdownMenu,
          'el-dropdown': ElDropdown,
          'el-switch': ElSwitch,
          'el-tooltip': ElTooltip,
          'el-button': ElButton,
          'font-awesome-icon': true,
          'router-link': true,
        },
      })

      const wrapper = mount(EditorToolBar, {
        ...mockStore,
      })

      const tryButton = wrapper.find('[data-test="action-deploy"]')
      await tryButton.trigger('click')
      await flushPromises()
      expect(wrapper.emitted().deploy).toBeTruthy()
    })
  })
})
