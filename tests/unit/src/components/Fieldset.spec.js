import Fieldset from '@/components/Fieldset.vue'

describe('Fieldset.vue', () => {
  it('should render the slot', () => {
    const slotContent = '<div>Test</div>'
    const { element } = shallowMount(Fieldset, {
      ...i18n(),
      propsData: {
        title: 'title',
      },
      slots: {
        default: slotContent,
      },
    })
    expect(element.innerHTML).toContain(slotContent)
  })

  describe('should render title props', () => {
    it('title', () => {
      const slotContent = '<div>Test</div>'
      const wrapper = shallowMount(Fieldset, {
        ...i18n(),
        propsData: {
          title: 'title',
        },
        slots: {
          default: slotContent,
        },
      })
      expect(wrapper.findAll('p').at(0).isVisible()).toBe(true)
    })

    it('subtitle', () => {
      const slotContent = '<div>Test</div>'
      const wrapper = shallowMount(Fieldset, {
        ...i18n(),
        propsData: {
          title: 'title',
          subtitle: 'subtitle',
        },
        slots: {
          default: slotContent,
        },
      })
      expect(wrapper.findAll('p').at(1).isVisible()).toBe(true)
    })

    it('helper', () => {
      const slotContent = '<div>Test</div>'
      const wrapper = shallowMount(Fieldset, {
        ...i18n(),
        propsData: {
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
