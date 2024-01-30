import LayoutSidebar from '@/components/LayoutSidebar.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Sidebar from '@/components/Sidebar.vue'
import { createMocks } from '../../utils'

describe.skip('LayoutSidebar.vue', () => {
  test('render the slot', () => {
    const slotContent = '<div>Test</div>'
    const { element } = mount(LayoutSidebar, {
      ...createMocks({
        storeModules: {},
        slots: {
          default: slotContent,
          sidebar: () => slotContent,
        },
      }),
    })
    expect(element.innerHTML).toContain(slotContent)
  })

  test('render the siderbar', () => {
    const slotContent = '<div>Test</div>'
    const wrapper = mount(LayoutSidebar, {
      ...createMocks({
        storeModules: {},
        slots: {
          default: slotContent,
          sidebar: () => slotContent,
        },
      }),
    })
    expect(wrapper.findComponent(Sidebar).exists()).toBe(true)
  })
})
