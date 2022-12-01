import LayoutSidebar from '@/components/LayoutSidebar.vue'
import Sidebar from '@/components/Sidebar.vue'

describe.skip('LayoutSidebar.vue', () => {
  it('render the slot', () => {
    const slotContent = '<div>Test</div>'
    const { element } = shallowMount(LayoutSidebar, {
      ...i18n(),
      slots: {
        default: slotContent,
      },
    })
    expect(element.innerHTML).toContain(slotContent)
  })

  it('render the siderbar', () => {
    const slotContent = '<div>Test</div>'
    const wrapper = shallowMount(LayoutSidebar, {
      ...i18n(),
      slots: {
        default: slotContent,
      },
    })
    expect(wrapper.findComponent(Sidebar).exists()).toBe(true)
  })
})
