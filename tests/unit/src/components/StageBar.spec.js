import StageBar from '@/components/StageBar'
describe('StageBar.vue', () => {
  describe('should render properly', () => {
    const wrapper = shallowMount(StageBar, {
      propsData: {
        initialStage: 'retrieve',
      },
    })
    wrapper.setData({
      stages: [{ name: 'retrieve' }, { name: 'aggregate' }, { name: 'tally' }],
    })
    it('should render the retrieve stage', () => {
      expect(wrapper.find('[data-test="stage-retrieve"]').text()).toBe('retrieve')
    })
    it('should render the aggregate stage', () => {
      expect(wrapper.find('[data-test="stage-aggregate"]').text()).toBe('aggregate')
    })
    it('should render the tally stage', () => {
      expect(wrapper.find('[data-test="stage-tally"]').text()).toBe('tally')
    })
  })
})
