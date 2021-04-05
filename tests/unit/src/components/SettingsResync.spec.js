import SettingsResync from '@/components/SettingsResync'
import i18n from '@/plugins/i18n'

describe('SettingsResync.vue', () => {
  describe('should render properly', () => {
    const showResyncConfirmationMock = jest.fn()

    it('render the resync button and show modal', async () => {
      const wrapper = mount(
        SettingsResync,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                status: {
                  currentState: i18n.t('synced', { locale: i18n.locale }),
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

    it('render the resync button disabled', async () => {
      const wrapper = mount(
        SettingsResync,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                status: {
                  currentState: i18n.t('waiting_for_node_to_sync', {
                    locale: i18n.locale,
                  }),
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
