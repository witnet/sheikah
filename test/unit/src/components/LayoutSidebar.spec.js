import LayoutSidebar from '@/components/LayoutSidebar.vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Sidebar from '@/components/Sidebar.vue'
import i18n from '@/plugins/i18n'

describe.skip('LayoutSidebar.vue', () => {
  test('render the slot', () => {
    const slotContent = '<div>Test</div>'
    const { element } = shallowMount(LayoutSidebar, {
      slots: {
        default: slotContent,
      },
      global: {
        plugins: [i18n],
      },
    })
    expect(element.innerHTML).toContain(slotContent)
  })

  test('render the siderbar', () => {
    const slotContent = '<div>Test</div>'
    const wrapper = shallowMount(LayoutSidebar, {
      slots: {
        default: slotContent,
      },
      global: {
        plugins: [i18n],
      },
    })
    expect(wrapper.findComponent(Sidebar).exists()).toBe(true)
  })
})
