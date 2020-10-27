import LayoutSidebar from '@/components/LayoutSidebar'
import Sidebar from '@/components/Sidebar'

describe('LayoutSidebar.vue', () => {
  it('render the slot', () => {
    const slotContent = '<div>Test</div>'
    const { element } = shallowMount(LayoutSidebar, {
      slots: {
        default: slotContent,
      },
    })
    expect(element.innerHTML).toContain(slotContent)
  })

  it('render the siderbar', () => {
    const slotContent = '<div>Test</div>'
    const wrapper = shallowMount(LayoutSidebar, {
      slots: {
        default: slotContent,
      },
    })
    expect(wrapper.findComponent(Sidebar).exists()).toBe(true)
  })
})
