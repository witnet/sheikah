import BalanceButtons from '@/components/BalanceButtons'

describe('BalanceButtons.vue', () => {
  describe('should render receive and send buttons', () => {
    it('send', () => {
      const wrapper = shallowMount(BalanceButtons)

      expect(wrapper.find('[data-test="btn-send"]').isVisible()).toBe(true)
    })

    it('receive', () => {
      const wrapper = shallowMount(BalanceButtons)

      expect(wrapper.find('[data-test="btn-receive"]').isVisible()).toBe(true)
    })
  })

  describe('should emit receive and send events on click', () => {
    it('send', done => {
      const wrapper = shallowMount(BalanceButtons)

      wrapper.find('[data-test="btn-send"]').trigger('click')

      nextTick(() => {
        expect(wrapper.emitted()).toBeTruthy()
        done()
      })
    })

    it('receive', done => {
      const wrapper = shallowMount(BalanceButtons)

      wrapper.find('[data-test="btn-receive"]').trigger('click')

      nextTick(() => {
        expect(wrapper.emitted()).toBeTruthy()
        done()
      })
    })
  })
})
