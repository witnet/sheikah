import SettingsResync from '@/components/SettingsResync.vue'
import { NETWORK_STATUS } from '@/constants'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'

describe('SettingsResync.vue', () => {
  describe('should render properly', () => {
    const showResyncConfirmationMock = vi.fn()

    test('render the resync button and show modal', async () => {
      const wrapper = mount(
        SettingsResync,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                status: {
                  currentState: NETWORK_STATUS.SYNCED,
                  progress: 80,
                  lastBlock: '123456',
                  lastSync: 1605881425122,
                  lastBlockTimestamp: 1605881425122,
                  address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44',
                  isNodeSynced: true,
                  balance: '123456789',
                },
              },
              mutations: {
                showResyncConfirmation: showResyncConfirmationMock,
              },
            },
          },
        }),
      )

      const selectButton = wrapper.find('[data-test="resync-button"]')
      await selectButton.trigger('click')

      expect(showResyncConfirmationMock).toHaveBeenCalled()
    })

    test('render the resync button disabled', async () => {
      const wrapper = mount(
        SettingsResync,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                status: {
                  currentState: NETWORK_STATUS.WAITING_FOR_NODE_TO_SYNC,
                  progress: 80,
                  lastBlock: '123456',
                  lastSync: 1605881425122,
                  lastBlockTimestamp: 1605881425122,
                  address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44',
                  isNodeSynced: false,
                  balance: '123456789',
                },
              },
              mutations: {
                showResyncConfirmation: showResyncConfirmationMock,
              },
            },
          },
        }),
      )

      const selectButton = wrapper.find('[data-test="resync-button"]')
      await selectButton.trigger('click')

      expect(showResyncConfirmationMock).not.toHaveBeenCalled()
    })
  })
})
