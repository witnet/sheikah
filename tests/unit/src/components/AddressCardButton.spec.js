import AddressCardButton from '@/components/AddressCardButton.vue'

import { ElTooltip } from 'element-plus'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

describe('AddressCardButton.vue', () => {
  describe('should render correctly', () => {
    test('should render the card', () => {
      const wrapper = mount(
        AddressCardButton,
        createMocks({
          storeModules: {
            uiInteractions: {
              state: {
                receiveTransactionClicked: true,
              },
            },
          },
          stubs: {
            'el-tooltip': ElTooltip,
            'font-awesome-icon': FontAwesomeIcon,
          },
        }),
      )

      expect(wrapper.find('[data-test="address-card-button"]').exists()).toBe(
        true,
      )
    })

    test('should emit click event on click button', async () => {
      const wrapper = mount(
        AddressCardButton,
        createMocks({
          storeModules: {
            uiInteractions: {
              state: {
                receiveTransactionClicked: true,
              },
            },
          },
          stubs: {
            'el-tooltip': ElTooltip,
            'font-awesome-icon': FontAwesomeIcon,
          },
        }),
      )
      const btn = wrapper.find('[data-test="address-card-button"]')
      await btn.trigger('click')
      expect(wrapper.emitted().click).toBeTruthy()
    })
  })
})
