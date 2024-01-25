import LayoutTwoColumns from '@/components/LayoutTwoColumns.vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

describe('LayoutTwoColumns.vue', () => {
  test('render the left slot', () => {
    const leftSlot = '<div>Left</div>'
    const upperLeftSlot = '<div>Upper Right</div>'
    const upperRightSlot = '<div>Bottom Right</div>'
    const { element } = shallowMount(LayoutTwoColumns, {
      slots: {
        left: leftSlot,
        upperRight: upperRightSlot,
        upperLeft: upperLeftSlot,
      },
    })
    expect(element.innerHTML).toContain(leftSlot)
  })

  test('render the upperRight slot', () => {
    const leftSlot = '<div>Left</div>'
    const upperLeftSlot = '<div>Upper Right</div>'
    const upperRightSlot = '<div>Bottom Right</div>'
    const { element } = shallowMount(LayoutTwoColumns, {
      slots: {
        left: leftSlot,
        upperRight: upperRightSlot,
        upperLeft: upperLeftSlot,
      },
    })
    expect(element.innerHTML).toContain(upperLeftSlot)
  })

  test('render the upperRight slot', () => {
    const leftSlot = '<div>Left</div>'
    const upperLeftSlot = '<div>Upper Right</div>'
    const upperRightSlot = '<div>Bottom Right</div>'
    const { element } = shallowMount(LayoutTwoColumns, {
      slots: {
        left: leftSlot,
        upperRight: upperRightSlot,
        upperLeft: upperLeftSlot,
      },
    })
    expect(element.innerHTML).toContain(upperRightSlot)
  })
})
