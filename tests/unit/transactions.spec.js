import { shallowMount } from '@vue/test-utils'
import ListAddresses from '@/components/ListAddresses.vue'
import '../../src/fontAwesome'

// remove skip test when the pagination component is ready to be used
describe.skip('ListAddresses.vue', () => {
  it('renders the first page with one address when there is one address', () => {
    const wrapper = shallowMount(ListAddresses, {
      components: {},
      propsData: { addresses: ['1'] },
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.props().addresses).toHaveLength(1)
    expect(wrapper.find('[data-test="page-1"]').text()).toEqual('1')
    expect(wrapper.find('[data-test="paginate-to-left"]').textContent).toBeUndefined()
    expect(wrapper.find('[data-test="paginate-to-right"]').textContent).toBeUndefined()
  })
  it('renders the first page with first 5 addresses when there is 5 addresses', () => {
    const wrapper = shallowMount(ListAddresses, {
      propsData: {
        addresses: ['1', '2', '3', '4', '5'],
      },
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.props().addresses).toHaveLength(5)
    expect(wrapper.find('[data-test="page-1"]').text()).toEqual('1')
    expect(wrapper.find('[data-test="page-2"]').textContent).toBeUndefined()
    expect(wrapper.find('[data-test="paginate-to-left"]').textContent).toBeUndefined()
    expect(wrapper.find('[data-test="paginate-to-right"]').textContent).toBeUndefined()
  })
  it('renders the 2nd page with one address when there is 6 addresses', () => {
    const wrapper = shallowMount(ListAddresses, {
      propsData: { addresses: ['1', '2', '3', '4', '5', '6'] },
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.props().addresses).toHaveLength(6)
    expect(wrapper.find('[data-test="page-1"]').text()).toEqual('1')
    expect(wrapper.find('[data-test="page-2"]').text()).toEqual('2')
    expect(wrapper.find('[data-test="page-3"]').textContent).toBeUndefined()
  })
  it('renders the 2nd page with 5 addresses when there is 10 addresses', () => {
    const wrapper = shallowMount(ListAddresses, {
      propsData: { addresses: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.props().addresses).toHaveLength(10)
    expect(wrapper.find('[data-test="page-1"]').text()).toEqual('1')
    expect(wrapper.find('[data-test="page-2"]').text()).toEqual('2')
    expect(wrapper.find('[data-test="page-3"]').textContent).toBeUndefined()
  })
  it('renders the 3th page with 1 address when there is 11 addresses', () => {
    const wrapper = shallowMount(ListAddresses, {
      propsData: { addresses: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'] },
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.props().addresses).toHaveLength(11)
    expect(wrapper.find('[data-test="page-1"]').text()).toEqual('1')
    expect(wrapper.find('[data-test="page-2"]').text()).toEqual('2')
    expect(wrapper.find('[data-test="page-3"]').text()).toEqual('3')
    expect(wrapper.find('[data-test="page-4"]').textContent).toBeUndefined()
  })
  it('renders the 3th page with 5 address when there is 15 addresses', () => {
    const wrapper = shallowMount(ListAddresses, {
      propsData: {
        addresses: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
        ],
      },
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.props().addresses).toHaveLength(15)
    expect(wrapper.find('[data-test="page-1"]').text()).toEqual('1')
    expect(wrapper.find('[data-test="page-2"]').text()).toEqual('2')
    expect(wrapper.find('[data-test="page-3"]').text()).toEqual('3')
    expect(wrapper.find('[data-test="page-4"]').textContent).toBeUndefined()
  })
  it('renders the 4th page with 1 address when there is 16 addresses', () => {
    const wrapper = shallowMount(ListAddresses, {
      propsData: {
        addresses: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
        ],
      },
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.props().addresses).toHaveLength(16)
    expect(wrapper.find('[data-test="page-1"]').text()).toEqual('1')
    expect(wrapper.find('[data-test="page-2"]').text()).toEqual('2')
    expect(wrapper.find('[data-test="page-3"]').text()).toEqual('3')
    expect(wrapper.find('[data-test="page-4"]').text()).toEqual('4')
    expect(wrapper.find('[data-test="page-5"]').textContent).toBeUndefined()
  })
  it('renders the 4th page with 5 address when there is 20 addresses', () => {
    const wrapper = shallowMount(ListAddresses, {
      propsData: {
        addresses: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
        ],
      },
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.props().addresses).toHaveLength(20)
    expect(wrapper.find('[data-test="page-1"]').text()).toEqual('1')
    expect(wrapper.find('[data-test="page-2"]').text()).toEqual('2')
    expect(wrapper.find('[data-test="page-3"]').text()).toEqual('3')
    expect(wrapper.find('[data-test="page-4"]').text()).toEqual('4')
    expect(wrapper.find('[data-test="page-5"]').textContent).toBeUndefined()
  })
  it('renders the 5th page with 1 address when there is 21 addresses', () => {
    const wrapper = shallowMount(ListAddresses, {
      propsData: {
        addresses: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
        ],
      },
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.props().addresses).toHaveLength(21)
    expect(wrapper.find('[data-test="page-1"]').text()).toEqual('1')
    expect(wrapper.find('[data-test="page-2"]').text()).toEqual('2')
    expect(wrapper.find('[data-test="page-3"]').text()).toEqual('3')
    expect(wrapper.find('[data-test="page-4"]').text()).toEqual('4')
    expect(wrapper.find('[data-test="page-5"]').text()).toEqual('5')
    expect(wrapper.find('[data-test="page-6"]').textContent).toBeUndefined()
  })
  it('renders the 5th page with 5 address when there is 25 addresses', () => {
    const wrapper = shallowMount(ListAddresses, {
      propsData: {
        addresses: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
          '25',
        ],
      },
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.props().addresses).toHaveLength(25)
    expect(wrapper.find('[data-test="page-1"]').text()).toEqual('1')
    expect(wrapper.find('[data-test="page-2"]').text()).toEqual('2')
    expect(wrapper.find('[data-test="page-3"]').text()).toEqual('3')
    expect(wrapper.find('[data-test="page-4"]').text()).toEqual('4')
    expect(wrapper.find('[data-test="page-5"]').text()).toEqual('5')
    expect(wrapper.find('[data-test="page-6"]').textContent).toBeUndefined()
  })
  it('renders the 6th page with 1 address when there is 26 addresses', () => {
    const wrapper = shallowMount(ListAddresses, {
      propsData: {
        addresses: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
          '25',
          '26',
        ],
      },
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.props().addresses).toHaveLength(26)
    expect(wrapper.find('[data-test="page-1"]').text()).toEqual('1')
    expect(wrapper.find('[data-test="page-2"]').text()).toEqual('2')
    expect(wrapper.find('[data-test="page-3"]').text()).toEqual('3')
    expect(wrapper.find('[data-test="page-4"]').text()).toEqual('4')
    expect(wrapper.find('[data-test="page-6"]').text()).toEqual('6')
    expect(wrapper.find('[data-test="page-7"]').textContent).toBeUndefined()
  })
  it('renders the 10th page with 5 address when there is 50 addresses', () => {
    const wrapper = shallowMount(ListAddresses, {
      propsData: {
        addresses: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
          '25',
          '26',
          '27',
          '28',
          '29',
          '30',
          '31',
          '32',
          '33',
          '34',
          '35',
          '36',
          '37',
          '38',
          '39',
          '40',
          '41',
          '42',
          '43',
          '44',
          '45',
          '46',
          '47',
          '48',
          '49',
          '50',
        ],
      },
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.props().addresses).toHaveLength(50)
    expect(wrapper.find('[data-test="page-1"]').text()).toEqual('1')
    expect(wrapper.find('[data-test="page-1"]').trigger('click'))
    expect(wrapper.find('[data-test="paginate-to-left"]').textContent).toBeUndefined()
    expect(wrapper.find('[data-test="address-1-0"]').text())
    expect(wrapper.find('[data-test="address-2-1"]').textContent).toBeUndefined()
    expect(wrapper.find('[data-test="page-2"]').text()).toEqual('2')

    expect(wrapper.find('[data-test="page-2"]').trigger('click'))
    expect(wrapper.find('[data-test="paginate-to-left"]').text())
    expect(wrapper.find('[data-test="paginate-to-right"]').text())
    expect(wrapper.find('[data-test="address-1-0"]').textContent).toBeUndefined()
    expect(wrapper.find('[data-test="address-2-0"]').text())
    expect(wrapper.find('[data-test="address-3-0"]').textContent).toBeUndefined()

    expect(wrapper.find('[data-test="page-3"]').text()).toEqual('3')

    expect(wrapper.find('[data-test="page-3"]').trigger('click'))
    expect(wrapper.find('[data-test="paginate-to-left"]').text())
    expect(wrapper.find('[data-test="paginate-to-right"]').text())
    expect(wrapper.find('[data-test="address-2-0"]').textContent).toBeUndefined()
    expect(wrapper.find('[data-test="address-3-0"]').text())
    expect(wrapper.find('[data-test="address-4-0"]').textContent).toBeUndefined()

    expect(wrapper.find('[data-test="page-4"]').text()).toEqual('4')

    expect(wrapper.find('[data-test="page-4"]').trigger('click'))
    expect(wrapper.find('[data-test="paginate-to-left"]').text())
    expect(wrapper.find('[data-test="paginate-to-right"]').text())
    expect(wrapper.find('[data-test="address-3-0"]').textContent).toBeUndefined()
    expect(wrapper.find('[data-test="address-4-0"]').text())
    expect(wrapper.find('[data-test="address-5-0"]').textContent).toBeUndefined()

    expect(wrapper.find('[data-test="page-10"]').text()).toEqual('10')

    expect(wrapper.find('[data-test="page-10"]').trigger('click'))
    expect(wrapper.find('[data-test="address-9-0"]').textContent).toBeUndefined()
    expect(wrapper.find('[data-test="address-10-0"]').text())
    expect(wrapper.find('[data-test="address-11-0"]').textContent).toBeUndefined()

    expect(wrapper.find('[data-test="page-11"]').textContent).toBeUndefined()
    expect(wrapper.find('[data-test="paginate-to-right"]').textContent).toBeUndefined()
    expect(wrapper.find('[data-test="paginate-to-left"]').text())
    expect(wrapper.find('[data-test="paginate-to-left"]').trigger('click'))
    expect(wrapper.find('[data-test="address-9-0"]').text())
    expect(wrapper.find('[data-test="paginate-to-left"]').trigger('click'))
    expect(wrapper.find('[data-test="address-8-0"]').text())
    expect(wrapper.find('[data-test="paginate-to-left"]').trigger('click'))
    expect(wrapper.find('[data-test="address-7-0"]').text())
    expect(wrapper.find('[data-test="paginate-to-left"]').trigger('click'))
    expect(wrapper.find('[data-test="address-6-0"]').text())
    expect(wrapper.find('[data-test="paginate-to-left"]').trigger('click'))
    expect(wrapper.find('[data-test="address-5-0"]').text())
    expect(wrapper.find('[data-test="paginate-to-left"]').trigger('click'))
    expect(wrapper.find('[data-test="address-4-0"]').text())
    expect(wrapper.find('[data-test="paginate-to-left"]').trigger('click'))
    expect(wrapper.find('[data-test="address-3-0"]').text())
    expect(wrapper.find('[data-test="paginate-to-left"]').trigger('click'))
    expect(wrapper.find('[data-test="address-2-0"]').text())
    expect(wrapper.find('[data-test="paginate-to-left"]').trigger('click'))
    expect(wrapper.find('[data-test="address-1-0"]').text())
    expect(wrapper.find('[data-test="paginate-to-right"]').trigger('click'))
    expect(wrapper.find('[data-test="address-2-0"]').text())
    expect(wrapper.find('[data-test="paginate-to-right"]').trigger('click'))
    expect(wrapper.find('[data-test="address-3-0"]').text())
    expect(wrapper.find('[data-test="paginate-to-right"]').trigger('click'))
    expect(wrapper.find('[data-test="address-4-0"]').text())
    expect(wrapper.find('[data-test="paginate-to-right"]').trigger('click'))
    expect(wrapper.find('[data-test="address-5-0"]').text())
    expect(wrapper.find('[data-test="paginate-to-right"]').trigger('click'))
    expect(wrapper.find('[data-test="address-6-0"]').text())
    expect(wrapper.find('[data-test="paginate-to-right"]').trigger('click'))
    expect(wrapper.find('[data-test="address-7-0"]').text())
    expect(wrapper.find('[data-test="paginate-to-right"]').trigger('click'))
    expect(wrapper.find('[data-test="address-8-0"]').text())
    expect(wrapper.find('[data-test="paginate-to-right"]').trigger('click'))
    expect(wrapper.find('[data-test="address-9-0"]').text())
    expect(wrapper.find('[data-test="paginate-to-right"]').trigger('click'))
    expect(wrapper.find('[data-test="address-10-0"]').text())
  })
})
