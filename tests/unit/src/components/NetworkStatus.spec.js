import { mount } from '@vue/test-utils'
import '@/fontAwesome'
import i18n from '@/plugins/i18n'
import NetworkStatus from '@/components/NetworkStatus.vue'
import Avatar from '@/components/Avatar.vue'

describe('NetworkStatus', () => {
  describe('when is minimized', () => {
    describe('and is synced', () => {
      function getMinimizedSyncedData() {
        return {
          ...createComponentMocks({
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
                  errors: {},
                },
                getters: {
                  network: () => 'mainnet',
                  estimatedTimeOfSync: () => '00:32:22',
                  unlockedWallet: () => ({
                    id: '1',
                    name: 'wallet_1',
                    description: 'description',
                    image: 'wallet_img',
                  }),
                },
              },
            },
          }),
          propsData: {
            expanded: false,
          },
        }
      }

      describe('should show an avatar', () => {
        it('should include Avatar', () => {
          const wrapper = mount(NetworkStatus, getMinimizedSyncedData())

          expect(wrapper.findComponent(Avatar))
        })

        describe('should pass correct props to Avatar', () => {
          it('should pass borderColor with value green', () => {
            const wrapper = mount(NetworkStatus, getMinimizedSyncedData())

            const avatar = wrapper.findComponent(Avatar)

            expect(avatar.props().borderColor).toBe('green')
          })

          it('should pass prop src', () => {
            const wrapper = mount(NetworkStatus, getMinimizedSyncedData())

            const avatar = wrapper.findComponent(Avatar)

            expect(avatar.props().src).toBe('wallet_img')
          })
        })
      })

      it('should hide information detils', () => {
        const wrapper = mount(NetworkStatus, getMinimizedSyncedData())

        const informationDetails = wrapper.find('.detail-info')

        expect(informationDetails.exists()).toBe(false)
      })
    })

    describe('and is syncing', () => {
      function getMinimizedSyncingData() {
        return {
          ...createComponentMocks({
            store: {
              wallet: {
                state: {
                  status: {
                    currentState: i18n.t('syncing', { locale: i18n.locale }),
                    progress: 80,
                    lastBlock: '123456',
                    lastSync: 1605881425122,
                    lastBlockTimestamp: 1605881425122,
                    address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44',
                    isNodeSynced: true,
                    balance: '123456789',
                  },
                  errors: {},
                },
                getters: {
                  network: () => 'mainnet',
                  estimatedTimeOfSync: () => '00:32:22',
                  unlockedWallet: () => ({
                    id: '1',
                    name: 'wallet_1',
                    description: 'description',
                    image: 'wallet_img',
                  }),
                },
              },
            },
          }),
          propsData: {
            expanded: false,
          },
        }
      }

      describe('should show an avatar', () => {
        it('should include Avatar', () => {
          const wrapper = mount(NetworkStatus, getMinimizedSyncingData())

          expect(wrapper.findComponent(Avatar))
        })

        describe('should pass correct props to Avatar', () => {
          it('should pass color with value yellow', () => {
            const wrapper = mount(NetworkStatus, getMinimizedSyncingData())

            const avatar = wrapper.findComponent(Avatar)

            expect(avatar.props().borderColor).toBe('yellow')
          })

          it('should pass prop src', () => {
            const wrapper = mount(NetworkStatus, getMinimizedSyncingData())

            const avatar = wrapper.findComponent(Avatar)

            expect(avatar.props().src).toBe('wallet_img')
          })
        })
      })

      it('should hide information details', () => {
        const wrapper = mount(NetworkStatus, getMinimizedSyncingData())

        const informationDetails = wrapper.find('.detail-info')

        expect(informationDetails.exists()).toBe(false)
      })
    })

    describe('and exist sync error', () => {
      function getMinimizedSyncErrorData() {
        return {
          ...createComponentMocks({
            store: {
              wallet: {
                state: {
                  status: {
                    currentState: i18n.t('sync_error', { locale: i18n.locale }),
                    progress: 80,
                    lastBlock: '123456',
                    lastSync: 1605881425122,
                    lastBlockTimestamp: 1605881425122,
                    address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44',
                    isNodeSynced: true,
                    balance: '123456789',
                  },
                },
                getters: {
                  network: () => 'mainnet',
                  estimatedTimeOfSync: () => '00:32:22',
                  unlockedWallet: () => ({
                    id: '1',
                    name: 'wallet_1',
                    description: 'description',
                    image: 'wallet_img',
                  }),
                },
              },
            },
          }),
          propsData: {
            expanded: false,
          },
        }
      }

      describe('should show an avatar', () => {
        describe('should show an avatar', () => {
          it('should include Avatar', () => {
            const wrapper = mount(NetworkStatus, getMinimizedSyncErrorData())

            expect(wrapper.findComponent(Avatar))
          })

          describe('should pass correct props to Avatar', () => {
            it('should pass borderColor with value red', () => {
              const wrapper = mount(NetworkStatus, getMinimizedSyncErrorData())

              const avatar = wrapper.findComponent(Avatar)

              expect(avatar.props().borderColor).toBe('red')
            })

            it('should pass prop src', () => {
              const wrapper = mount(NetworkStatus, getMinimizedSyncErrorData())

              const avatar = wrapper.findComponent(Avatar)

              expect(avatar.props().src).toBe('wallet_img')
            })
          })
        })
      })

      it('should hide information detils', () => {
        const wrapper = mount(NetworkStatus, getMinimizedSyncErrorData())

        const informationDetails = wrapper.find('.detail-info')

        expect(informationDetails.exists()).toBe(false)
      })
    })

    describe('and node is disconnected', () => {
      describe('should show an avatar', () => {
        describe('should show an avatar', () => {
          it.todo('should include Avatar')

          describe('should pass correct props to Avatar', () => {
            it.todo('should pass sync with value syncing')

            it.todo('should pass prop src')
          })
        })
      })

      it.todo('should hide information detils')
    })
  })

  describe('when is closed', () => {
    describe('and is synced', () => {
      function getClosedSyncedData() {
        return {
          ...createComponentMocks({
            store: {
              wallet: {
                state: {
                  status: {
                    currentState: i18n.t('synced', { locale: i18n.locale }),
                    progress: 100,
                    lastBlock: '123456',
                    lastSync: 1605881425122,
                    lastBlockTimestamp: 1605881425122,
                    address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44',
                    isNodeSynced: true,
                    balance: '123456789',
                  },
                  errors: {},
                },
                getters: {
                  network: () => 'mainnet',
                  estimatedTimeOfSync: () => '00:32:22',
                  unlockedWallet: () => ({
                    id: '1',
                    name: 'wallet_1',
                    description: 'description',
                    image: 'wallet_img',
                  }),
                },
              },
            },
          }),
          propsData: {
            expanded: true,
          },
        }
      }

      describe('should show an avatar', () => {
        it('should include Avatar', () => {
          const wrapper = mount(NetworkStatus, getClosedSyncedData())

          expect(wrapper.findComponent(Avatar))
        })

        describe('should pass correct props to Avatar', () => {
          it('should pass borderColor with value green', () => {
            const wrapper = mount(NetworkStatus, getClosedSyncedData())

            const avatar = wrapper.findComponent(Avatar)

            expect(avatar.props().borderColor).toBe('green')
          })

          it('should pass prop src', () => {
            const wrapper = mount(NetworkStatus, getClosedSyncedData())

            const avatar = wrapper.findComponent(Avatar)

            expect(avatar.props().src).toBe('wallet_img')
          })
        })
      })

      it('should show the wallet name', () => {
        const wrapper = mount(NetworkStatus, getClosedSyncedData())

        const name = wrapper.find('.current-wallet-name').text()

        expect(name).toBe('wallet_1')
      })

      it('should show status label as sync ', () => {
        const wrapper = shallowMount(NetworkStatus, getClosedSyncedData())

        const name = wrapper.find('.status').text()

        expect(name).toBe('SYNCED')
      })

      it('should hide network details', () => {
        const wrapper = shallowMount(NetworkStatus, getClosedSyncedData())

        const existsNetworkDetails = wrapper.find('.details-info').exists()

        expect(existsNetworkDetails).toBe(false)
      })
    })

    describe('and is syncing', () => {
      describe('should show an avatar', () => {
        it('should include Avatar', () => {})

        describe('should pass correct props to Avatar', () => {
          it.todo('should pass borderColor with value yellow')

          it('should pass prop src', () => {})
        })
      })

      it.todo('should show the wallet name')
      it.todo('should show sync label with percentage')
    })

    describe('and exists sync error', () => {
      describe('should show an avatar', () => {
        it('should include Avatar', () => {})

        describe('should pass correct props to Avatar', () => {
          it.todo('should pass borderColor with value red')

          it.todo('should pass prop src')
        })
      })

      it.todo('should show the wallet name')
      it.todo('should show sync error label')
    })

    describe('and node is disconnected', () => {
      describe('should show an avatar', () => {
        it('should include Avatar', () => {})

        describe('should pass correct props to Avatar', () => {
          it.todo('should pass borderColor with value red')

          it.todo('should pass prop src')
        })
      })

      it.todo('should show wallet disconnected as label')
      it.todo('should show the wallet name')
    })
  })

  describe('when is expanded', () => {
    describe('and is synced', () => {
      describe('should show an avatar', () => {
        it('should include Avatar', () => {})

        describe('should pass correct props to Avatar', () => {
          it.todo('should pass borderColor with value green')

          it.todo('should pass prop src')
        })
      })

      it.todo('should show the wallet name')
      it.todo('should show synced as label')
      it.todo('should show RESYNC button')
      it.todo('should show wallet url')
      it.todo('should show network connected at')
      it.todo('should show current block')

      describe('should NOT show block information', () => {
        it.todo('should NOT show blocks left previous getting error')
        it.todo('should NOT synched blocks previous error')
      })
    })

    describe('and is syncing', () => {
      describe('should show an avatar', () => {
        it('should include Avatar', () => {})

        describe('should pass correct props to Avatar', () => {
          it.todo('should pass borderColor with value yellow')

          it.todo('should pass prop src')
        })
      })

      it.todo('should show the wallet name')
      it.todo('should show syncing label')
      it.todo('should show ETA')
      it.todo('should show percentage')
      it.todo('should show RESYNC button')

      it.todo('should show wallet url')
      it.todo('should show network connected at')
      describe('should show block information', () => {
        it.todo('should show blocks left')
        it.todo('should show synched blocks')
      })
    })

    describe('and exists sync error', () => {
      describe('should show an avatar', () => {
        it('should include Avatar', () => {})

        describe('should pass correct props to Avatar', () => {
          it.todo('should pass borderColor with value red')

          it.todo('should pass prop src')
        })
      })

      it.todo('should show the wallet name')
      it.todo('should show syncing label')
      it.todo('should hide ETA')
      it.todo('should show percentage')
      it.todo('should show RESYNC button if node synced')
      it.todo('should hide RESYNC button if node is not synced')
      it.todo('should show wallet url')
      it.todo('should show network connected at')
      describe('should show block information', () => {
        it.todo('should show blocks left previous getting error')
        it.todo('should show synched blocks previous error')
      })
    })

    describe('and node is disconnected', () => {
      describe('should show an avatar', () => {
        it('should include Avatar', () => {})

        describe('should pass correct props to Avatar', () => {
          it.todo('should pass borderColor with value red')

          it.todo('should pass prop src')
        })
      })

      it.todo('should show wallet disconnected as label')
      it.todo('should show the wallet name')
      it.todo('should show wallet url')

      describe('should NOT show block information', () => {
        it.todo('should NOT show blocks left previous getting error')
        it.todo('should NOT synched blocks previous error')
      })
    })
  })
})
