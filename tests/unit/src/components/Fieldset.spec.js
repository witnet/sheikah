import Fieldset from '@/components/Fieldset.vue'

describe('Fieldset.vue', () => {
  test('should render the slot', () => {
    const slotContent = '<div>Test</div>'
    const { element } = shallowMount(Fieldset, {
      props: {
        title: 'title',
      },
      slots: {
        default: slotContent,
      },
    })
    expect(element.innerHTML).toContain(slotContent)
  })

  describe('should render title props', () => {
    test('title', () => {
      const slotContent = '<div>Test</div>'
      const wrapper = shallowMount(Fieldset, {
        props: {
          title: 'title',
        },
        slots: {
          default: slotContent,
        },
      })
      expect(wrapper.findAll('p').at(0).isVisible()).toBe(true)
    })

    test('subtitle', () => {
      const slotContent = '<div>Test</div>'
      const wrapper = shallowMount(Fieldset, {
        props: {
          title: 'title',
          subtitle: 'subtitle',
        },
        slots: {
          default: slotContent,
        },
      })
      expect(wrapper.findAll('p').at(1).isVisible()).toBe(true)
    })

    test('helper', () => {
      const slotContent = '<div>Test</div>'
      const wrapper = shallowMount(Fieldset, {
        props: {
          title: 'title',
          subtitle: 'subtitle',

          helper: 'helper',
        },
        slots: {
          default: slotContent,
        },
      })
      expect(wrapper.findAll('p').at(2).isVisible()).toBe(true)
    })
  })
})
