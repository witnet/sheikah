import LayoutTwoColumns from '@/components/LayoutTwoColumns.vue'

describe('LayoutTwoColumns.vue', () => {
  it('render the left slot', () => {
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

  it('render the upperRight slot', () => {
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

  it('render the upperRight slot', () => {
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
