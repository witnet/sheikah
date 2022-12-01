import Dialog from 'element-ui/lib/dialog'
import Button from 'element-ui/lib/button'

import ResyncConfirmation from '@/components/ResyncConfirmation.vue'

describe('ResyncConfirmation.vue', () => {
  it('should contain an element dialog component', () => {
    const wrapper = shallowMount(ResyncConfirmation, { ...i18n() })

    expect(wrapper.findComponent(Dialog).exists()).toBe(true)
  })

  it('should contain a visible element dialog component', () => {
    const wrapper = shallowMount(ResyncConfirmation, { ...i18n() })

    expect(wrapper.findComponent(Dialog).isVisible()).toBe(true)
  })

  it('should contain cancel button', () => {
    const wrapper = shallowMount(ResyncConfirmation, { ...i18n() })

    expect(wrapper.findAllComponents(Button).at(0).text()).toBe('Cancel')
  })

  it('should contain confirm button', () => {
    const wrapper = shallowMount(ResyncConfirmation, { ...i18n() })

    expect(wrapper.findAllComponents(Button).at(1).text()).toBe('Resynchronize')
  })

  it('should call cancel mutation on click cancel', async () => {
    const closeMock = jest.fn()
    const resyncMock = jest.fn()
    const wrapper = mount(ResyncConfirmation, {
      ...createComponentMocks({
        store: {
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
      }),
    })
    await wrapper.findAllComponents(Button).at(0).trigger('click')

    expect(closeMock).toHaveBeenCalled()
  })

  it('should call resync action mutation on click confirm', async () => {
    const closeMock = jest.fn()
    const resyncMock = jest.fn()
    const wrapper = mount(ResyncConfirmation, {
      ...createComponentMocks({
        store: {
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
      }),
    })

    await wrapper.findAllComponents(Button).at(1).trigger('click')

    expect(resyncMock).toHaveBeenCalled()
  })

  it('should call close mutation on click confirm', async () => {
    const closeMock = jest.fn()
    const resyncMock = jest.fn()
    const wrapper = mount(ResyncConfirmation, {
      ...createComponentMocks({
        store: {
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
      }),
    })

    await wrapper.findAllComponents(Button).at(1).trigger('click')

    expect(closeMock).toHaveBeenCalled()
  })
})
