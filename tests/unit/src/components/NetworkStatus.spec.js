import '@/fontAwesome'
import NetworkStatus from '@/components/NetworkStatus.vue'
import Avatar from '@/components/Avatar.vue'

import { NETWORK_STATUS } from '@/constants'

import { ElButton } from 'element-plus'

describe('NetworkStatus', () => {
  describe('when is minimized', () => {
    describe('and is synced', () => {
      const mockStore = createMocks({
        storeModules: {
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
        stubs: {
          'el-button': ElButton,
          'i18n-t': true,
          'font-awesome-icon': true,
          Avatar: Avatar,
          CustomIcon: true,
          DotsLoading: true,
        },
      })
      function getMinimizedSyncedData() {
        return {
          ...mockStore,
          props: {
            expanded: false,
          },
        }
      }

      describe('should show an avatar', () => {
        test('should include Avatar', () => {
          const wrapper = mount(NetworkStatus, getMinimizedSyncedData())

          expect(wrapper.findComponent(Avatar).exists())
        })

        describe('should pass correct props to Avatar', () => {
          test('should pass borderColor with value green', () => {
            const wrapper = mount(NetworkStatus, getMinimizedSyncedData())

            const avatar = wrapper.findComponent(Avatar)

            expect(avatar.props().borderColor).toBe('green')
          })

          test('should pass prop src', () => {
            const wrapper = mount(NetworkStatus, getMinimizedSyncedData())

            const avatar = wrapper.findComponent(Avatar)

            expect(avatar.props().src).toBe('wallet_img')
          })
        })
      })

      test('should hide information detils', () => {
        const wrapper = mount(NetworkStatus, getMinimizedSyncedData())

        const informationDetails = wrapper.find('.detail-info')

        expect(informationDetails.exists()).toBe(false)
      })
    })

    describe('and is syncing', () => {
      const mockStore = createMocks({
        storeModules: {
          wallet: {
            state: {
              theme: 'light',
              status: {
                currentState: NETWORK_STATUS.SYNCING,
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
        stubs: {
          CustomIcon: true,
        },
      })
      function getMinimizedSyncingData() {
        return {
          ...mockStore,
          props: {
            expanded: false,
          },
        }
      }

      describe('should show an avatar', () => {
        test('should include Avatar', () => {
          const wrapper = mount(NetworkStatus, getMinimizedSyncingData())

          expect(wrapper.findComponent(Avatar))
        })

        describe('should pass correct props to Avatar', () => {
          test('should pass color with value yellow', () => {
            const wrapper = mount(NetworkStatus, getMinimizedSyncingData())

            const avatar = wrapper.findComponent(Avatar)

            expect(avatar.props().borderColor).toBe('yellow')
          })

          test('should pass prop src', () => {
            const wrapper = mount(NetworkStatus, getMinimizedSyncingData())

            const avatar = wrapper.findComponent(Avatar)

            expect(avatar.props().src).toBe('wallet_img')
          })
        })
      })

      test('should hide information details', () => {
        const wrapper = mount(NetworkStatus, getMinimizedSyncingData())

        const informationDetails = wrapper.find('.detail-info')

        expect(informationDetails.exists()).toBe(false)
      })
    })

    describe('and exist sync error', () => {
      const mockStore = createMocks({
        storeModules: {
          wallet: {
            state: {
              theme: 'light',
              status: {
                currentState: NETWORK_STATUS.SYNC_ERROR,
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
        stubs: {
          CustomIcon: true,
          'el-button': ElButton,
        },
      })
      function getMinimizedSyncErrorData() {
        return {
          ...mockStore,
          props: {
            expanded: false,
          },
        }
      }

      describe('should show an avatar', () => {
        describe('should show an avatar', () => {
          test('should include Avatar', () => {
            const wrapper = mount(NetworkStatus, getMinimizedSyncErrorData())

            expect(wrapper.findComponent(Avatar))
          })

          describe('should pass correct props to Avatar', () => {
            test('should pass borderColor with value red', () => {
              const wrapper = mount(NetworkStatus, getMinimizedSyncErrorData())

              const avatar = wrapper.findComponent(Avatar)

              expect(avatar.props().borderColor).toBe('red')
            })

            test('should pass prop src', () => {
              const wrapper = mount(NetworkStatus, getMinimizedSyncErrorData())

              const avatar = wrapper.findComponent(Avatar)

              expect(avatar.props().src).toBe('wallet_img')
            })
          })
        })
      })

      test('should hide information detils', () => {
        const wrapper = mount(NetworkStatus, getMinimizedSyncErrorData())

        const informationDetails = wrapper.find('.detail-info')

        expect(informationDetails.exists()).toBe(false)
      })
    })

    describe('and node is disconnected', () => {
      describe('should show an avatar', () => {
        describe('should show an avatar', () => {
          test.todo('should include Avatar')

          describe('should pass correct props to Avatar', () => {
            test.todo('should pass sync with value syncing')

            test.todo('should pass prop src')
          })
        })
      })

      test.todo('should hide information detils')
    })
  })

  describe('when is closed', () => {
    describe('and is synced', () => {
      const mockStore = createMocks({
        storeModules: {
          wallet: {
            state: {
              theme: 'light',
              status: {
                currentState: NETWORK_STATUS.SYNCED,
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
        stubs: {
          CustomIcon: true,
        },
      })
      function getClosedSyncedData() {
        return {
          ...mockStore,
          props: {
            expanded: true,
          },
        }
      }

      describe('should show an avatar', () => {
        test('should include Avatar', () => {
          const wrapper = mount(NetworkStatus, getClosedSyncedData())

          expect(wrapper.findComponent(Avatar))
        })

        describe('should pass correct props to Avatar', () => {
          test('should pass borderColor with value green', () => {
            const wrapper = mount(NetworkStatus, getClosedSyncedData())

            const avatar = wrapper.findComponent(Avatar)

            expect(avatar.props().borderColor).toBe('green')
          })

          test('should pass prop src', () => {
            const wrapper = mount(NetworkStatus, getClosedSyncedData())

            const avatar = wrapper.findComponent(Avatar)

            expect(avatar.props().src).toBe('wallet_img')
          })
        })
      })

      test('should show the wallet name', () => {
        const wrapper = mount(NetworkStatus, getClosedSyncedData())

        const name = wrapper.find('.current-wallet-name').text()

        expect(name).toBe('wallet_1')
      })

      test('should show status label as sync ', () => {
        const wrapper = shallowMount(NetworkStatus, getClosedSyncedData())

        const name = wrapper.find('.status').text()

        expect(name).toBe('SYNCED')
      })

      test('should hide network details', () => {
        const wrapper = shallowMount(NetworkStatus, getClosedSyncedData())

        const existsNetworkDetails = wrapper.find('.details-info').exists()

        expect(existsNetworkDetails).toBe(false)
      })
    })

    describe('and is syncing', () => {
      describe('should show an avatar', () => {
        test('should include Avatar', () => {})

        describe('should pass correct props to Avatar', () => {
          test.todo('should pass borderColor with value yellow')

          test('should pass prop src', () => {})
        })
      })

      test.todo('should show the wallet name')
      test.todo('should show sync label with percentage')
    })

    describe('and exists sync error', () => {
      describe('should show an avatar', () => {
        test('should include Avatar', () => {})

        describe('should pass correct props to Avatar', () => {
          test.todo('should pass borderColor with value red')

          test.todo('should pass prop src')
        })
      })

      test.todo('should show the wallet name')
      test.todo('should show sync error label')
    })

    describe('and node is disconnected', () => {
      describe('should show an avatar', () => {
        test('should include Avatar', () => {})

        describe('should pass correct props to Avatar', () => {
          test.todo('should pass borderColor with value red')

          test.todo('should pass prop src')
        })
      })

      test.todo('should show wallet disconnected as label')
      test.todo('should show the wallet name')
    })
  })

  describe('when is expanded', () => {
    describe('and is synced', () => {
      describe('should show an avatar', () => {
        test('should include Avatar', () => {})

        describe('should pass correct props to Avatar', () => {
          test.todo('should pass borderColor with value green')

          test.todo('should pass prop src')
        })
      })

      test.todo('should show the wallet name')
      test.todo('should show synced as label')
      test.todo('should show RESYNC button')
      test.todo('should show wallet url')
      test.todo('should show network connected at')
      test.todo('should show current block')

      describe('should NOT show block information', () => {
        test.todo('should NOT show blocks left previous getting error')
        test.todo('should NOT synched blocks previous error')
      })
    })

    describe('and is syncing', () => {
      describe('should show an avatar', () => {
        test('should include Avatar', () => {})

        describe('should pass correct props to Avatar', () => {
          test.todo('should pass borderColor with value yellow')

          test.todo('should pass prop src')
        })
      })

      test.todo('should show the wallet name')
      test.todo('should show syncing label')
      test.todo('should show ETA')
      test.todo('should show percentage')
      test.todo('should show RESYNC button')

      test.todo('should show wallet url')
      test.todo('should show network connected at')
      describe('should show block information', () => {
        test.todo('should show blocks left')
        test.todo('should show synched blocks')
      })
    })

    describe('and exists sync error', () => {
      describe('should show an avatar', () => {
        test('should include Avatar', () => {})

        describe('should pass correct props to Avatar', () => {
          test.todo('should pass borderColor with value red')

          test.todo('should pass prop src')
        })
      })

      test.todo('should show the wallet name')
      test.todo('should show syncing label')
      test.todo('should hide ETA')
      test.todo('should show percentage')
      test.todo('should show RESYNC button if node synced')
      test.todo('should hide RESYNC button if node is not synced')
      test.todo('should show wallet url')
      test.todo('should show network connected at')
      describe('should show block information', () => {
        test.todo('should show blocks left previous getting error')
        test.todo('should show synched blocks previous error')
      })
    })

    describe('and node is disconnected', () => {
      describe('should show an avatar', () => {
        test('should include Avatar', () => {})

        describe('should pass correct props to Avatar', () => {
          test.todo('should pass borderColor with value red')

          test.todo('should pass prop src')
        })
      })

      test.todo('should show wallet disconnected as label')
      test.todo('should show the wallet name')
      test.todo('should show wallet url')

      describe('should NOT show block information', () => {
        test.todo('should NOT show blocks left previous getting error')
        test.todo('should NOT synched blocks previous error')
      })
    })
  })
})
