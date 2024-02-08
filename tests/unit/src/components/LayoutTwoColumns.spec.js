import LayoutTwoColumns from '@/components/LayoutTwoColumns.vue'

describe('LayoutTwoColumns.vue', () => {
  const leftSlot = '<div>Left</div>'
  const upperRightSlot = '<div>Upper Right</div>'
  const bottomRightSlot = '<div>Bottom Right</div>'
  const mockStore = createMocks({
    slots: {
      left: leftSlot,
      upperRight: upperRightSlot,
      bottomRight: bottomRightSlot,
    },
  })

  test('render the left slot', () => {
    const { element } = mount(LayoutTwoColumns, mockStore)
    expect(element.innerHTML).toContain(leftSlot)
  })

  test('render the upperLeft slot', () => {
    const { element } = mount(LayoutTwoColumns, mockStore)
    expect(element.innerHTML).toContain(upperRightSlot)
  })

  test('render the upperRight slot', () => {
    const { element } = mount(LayoutTwoColumns, mockStore)
    expect(element.innerHTML).toContain(upperRightSlot)
  })
})
