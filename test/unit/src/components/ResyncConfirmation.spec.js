import Dialog from 'element-ui/lib/dialog'
import Button from 'element-ui/lib/button'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import i18n from '@/plugins/i18n'
import ResyncConfirmation from '@/components/ResyncConfirmation.vue'
import { createMockStore } from '../../utils'

describe('ResyncConfirmation.vue', () => {
  test('should contain an element dialog component', () => {
    const wrapper = shallowMount(ResyncConfirmation)

    expect(wrapper.findComponent(Dialog).exists()).toBe(true)
  })

  test('should contain a visible element dialog component', () => {
    const wrapper = shallowMount(ResyncConfirmation)

    expect(wrapper.findComponent(Dialog).isVisible()).toBe(true)
  })

  test('should contain cancel button', () => {
    const wrapper = shallowMount(ResyncConfirmation)

    expect(wrapper.findAllComponents(Button).at(0).text()).toBe('Cancel')
  })

  test('should contain confirm button', () => {
    const wrapper = shallowMount(ResyncConfirmation)

    expect(wrapper.findAllComponents(Button).at(1).text()).toBe('Resynchronize')
  })

  test('should call cancel mutation on click cancel', async () => {
    const closeMock = vi.fn()
    const resyncMock = vi.fn()
    const mockStore = createMockStore({
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
    })
    const wrapper = mount(ResyncConfirmation, {
      global: {
        plugins: [i18n, mockStore],
      },
    })
    await wrapper.findAllComponents(Button).at(0).trigger('click')

    expect(closeMock).toHaveBeenCalled()
  })

  test('should call resync action mutation on click confirm', async () => {
    const closeMock = vi.fn()
    const resyncMock = vi.fn()
    const mockStore = createMockStore({
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
    })
    const wrapper = mount(ResyncConfirmation, {
      global: {
        plugins: [i18n, mockStore],
      },
    })

    await wrapper.findAllComponents(Button).at(1).trigger('click')

    expect(resyncMock).toHaveBeenCalled()
  })

  test('should call close mutation on click confirm', async () => {
    const closeMock = vi.fn()
    const resyncMock = vi.fn()
    const mockStore = createMockStore({
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
    })
    const wrapper = mount(ResyncConfirmation, {
      global: {
        plugins: [i18n, mockStore],
      },
    })

    await wrapper.findAllComponents(Button).at(1).trigger('click')

    expect(closeMock).toHaveBeenCalled()
  })
})
