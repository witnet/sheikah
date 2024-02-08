import { flushPromises, mount } from '@vue/test-utils'

import ResyncConfirmation from '@/components/ResyncConfirmation.vue'

import { ElButton, ElDialog } from 'element-plus'

describe('ResyncConfirmation.vue', () => {
  const mockStore = createMocks({
    storeModules: {
      uiInteractions: {
        isResyncConfirmationVisible: true,
      },
    },
    stubs: {
      'el-dialog': ElDialog,
      'el-button': ElButton,
      teleport: true,
      template: true,
    },
  })
  test('should contain an element dialog component', () => {
    const wrapper = mount(ResyncConfirmation, mockStore)

    expect(wrapper.findComponent(ElDialog).exists()).toBe(true)
  })

  // Skip until we find a way to make components inside element ui templates visible
  test.skip('should contain cancel button', () => {
    const wrapper = mount(ResyncConfirmation, mockStore)

    expect(wrapper.find('[data-test="resync-cancel-btn"]').text()).toBe(
      'Cancel',
    )
  })

  // TODO: Skip until we find a way to make components inside element ui templates visible
  test.skip('should contain confirm button', () => {
    const wrapper = mount(ResyncConfirmation, mockStore)

    expect(wrapper.find('[data-test="resync-btn"]').text()).toBe(
      'Resynchronize',
    )
  })

  // TODO: Skip until we find a way to make components inside element ui templates visible
  test.skip('should call cancel mutation on click cancel', async () => {
    const closeMock = vi.fn()
    const resyncMock = vi.fn()
    const mockStore = createMocks({
      storeModules: {
        uiInteractions: {
          mutations: {
            closeResyncConfirmation: closeMock,
          },
        },
        wallet: {
          actions: {
            resync: resyncMock,
          },
        },
      },
    })
    const wrapper = mount(ResyncConfirmation, {
      ...mockStore,
    })
    const resyncBtn = wrapper.find('[data-test="resync-btn"]')
    await resyncBtn.trigger('click')
    await flushPromises()
    expect(closeMock).toHaveBeenCalled()
  })

  // TODO: Skip until we find a way to make components inside element ui templates visible
  test.skip('should call resync action mutation on click confirm', async () => {
    const closeMock = vi.fn()
    const resyncMock = vi.fn()
    const mockStore = createMocks({
      storeModules: {
        uiInteractions: {
          mutations: {
            closeResyncConfirmation: closeMock,
          },
        },
        wallet: {
          actions: {
            resync: resyncMock,
          },
        },
      },
    })
    const wrapper = mount(ResyncConfirmation, {
      ...mockStore,
    })
    const cancelBtn = wrapper.find('[data-test="resync-cancel-btn"]')
    await cancelBtn.trigger('click')
    await flushPromises()

    expect(resyncMock).toHaveBeenCalled()
  })

  // Skip until we find a way to make components inside element ui templates visible
  test.skip('should call close mutation on click confirm', async () => {
    const closeMock = vi.fn()
    const resyncMock = vi.fn()
    const mockStore = createMocks({
      storeModules: {
        uiInteractions: {
          mutations: {
            closeResyncConfirmation: closeMock,
          },
        },
        wallet: {
          actions: {
            resync: resyncMock,
          },
        },
      },
    })
    const wrapper = mount(ResyncConfirmation, {
      ...mockStore,
    })

    const cancelBtn = wrapper.find('[data-test="resync-cancel-btn"]')
    await cancelBtn.trigger('click')
    await flushPromises()

    expect(closeMock).toHaveBeenCalled()
  })
})
