import Vue from 'vue'
import Router from 'vue-router'
import Community from '@/components/Community.vue'
import DataRequest from '@/components/DataRequest.vue'
import Editor from '@/components/Editor.vue'
import FirstTimeUsage from '@/views/FirstTimeUsage.vue'
import Main from '@/views/Main.vue'
import Loading from '@/components/steps/Loading.vue'
import Marketplace from '@/components/Marketplace.vue'
import Templates from '@/components/Templates.vue'
import Transactions from '@/views/Transactions.vue'
import UnlockWallet from '@/components/WelcomeBack/UnlockWallet.vue'
import Wallet from '@/components/Wallet.vue'
import WalletDisclaimer from '@/components/steps/WalletDisclaimer.vue'
import WalletEncryptionPassword from '@/components/steps/WalletEncryptionPassword.vue'
import WalletList from '@/components/WelcomeBack/WalletList.vue'
import WalletSeedBackup from '@/components/steps/WalletSeedBackup.vue'
import WalletSeedValidation from '@/components/steps/WalletSeedValidation.vue'
import WelcomeBack from '@/views/WelcomeBack.vue'
import WelcomeForm from '@/components/steps/WelcomeForm.vue'
import WalletImport from '@/components/steps/WalletImport.vue'
import WalletNotFound from '@/components/WalletNotFound.vue'
import Setup from '@/views/Setup.vue'

import ClaimingProcess from '@/views/ClaimingProcess.vue'
import ClaimingInstructions from '@/components/claiming/Instructions.vue'
import GenerateClaimingAddresses from '@/components/claiming/GenerateAddresses.vue'
import DownloadClaimingFile from '@/components/claiming/DownloadFile.vue'
import UploadClaimingFile from '@/components/claiming/UploadFile.vue'
import Vesting from '@/components/claiming/Vesting.vue'
import Countdown from '@/components/claiming/Countdown.vue'
import ClaimingUnlockWallet from '@/components/claiming/UnlockWallet.vue'
import ClaimingWalletDisclaimer from '@/components/claiming/WalletDisclaimer.vue'
import ClaimingWalletEncryptionPassword from '@/components/claiming/WalletEncryptionPassword.vue'
import ClaimingWalletSeedBackup from '@/components/claiming/WalletSeedBackup.vue'
import ClaimingWalletSeedValidation from '@/components/claiming/WalletSeedValidation.vue'
import ClaimingLoading from '@/components/claiming/Loading.vue'

import store from '@/store'

Vue.use(Router)
function redirectOnReload(to, from, next) {
  if (store.state.wallet.api.client.ws.ready) {
    next()
  } else {
    next('/')
  }
}

async function redirectOnClaiming(next) {
  await store.dispatch('getWalletInfos')
  const walletInfos = store.state.wallet.walletInfos
  const tokenGenerationEventOccurred =
    store.state.wallet.tokenGenerationEventOccurred
  if (tokenGenerationEventOccurred) {
    if (walletInfos && walletInfos.length > 0) {
      next('/welcome-back/wallet-list')
    } else {
      next('/ftu/welcome')
    }
  } else {
    const walletInfos = store.state.wallet.walletInfos
    if (!walletInfos || !walletInfos.length) {
      localStorage.setItem('completed', false)
    }
    if (localStorage.getItem('completed') === 'true') {
      const index = walletInfos.length - 1
      next(`/claiming/unlock/${walletInfos[index].id}`)
    } else {
      next('/claiming/claiming-instructions')
    }
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      beforeEnter: async (to, from, next) => {
        const isReady = store.state.wallet.api.client.ws.ready
        if (process.env.VUE_APP_CLAIMING_PROCESS) {
          if (isReady) {
            if (!store.state.wallet.sessionId) {
              redirectOnClaiming(next)
            } else {
              next()
            }
            store.state.wallet.api.client.ws.on('close', () => {
              next('/wallet-not-found')
            })
          } else {
            let error = true

            setTimeout(() => {
              if (error) {
                next('/wallet-not-found')
              }
            }, 3000)

            store.state.wallet.api.client.ws.on('open', () => {
              error = false
              redirectOnClaiming(next)
            })
          }
        } else {
          if (isReady) {
            await store.dispatch('getWalletInfos')
            const isSessionId = store.state.wallet.sessionId
            const walletInfos = store.state.wallet.walletInfos
            if (isSessionId) {
              next()
            } else if (walletInfos && walletInfos.length > 0) {
              next('/welcome-back/wallet-list')
            } else {
              next('/ftu/welcome')
            }
            // when the computer is blocked the client closes but it should not redirect to
            // wallet not found if the wallet is not closed
            store.state.wallet.api.client.ws.on('close', () => {
              setTimeout(() => {
                if (!store.state.wallet.api.client.ws.ready) {
                  next('/wallet-not-found')
                }
              }, 1000)
            })
          } else {
            let error = true
            setTimeout(() => {
              if (error) {
                next('/wallet-not-found')
              }
            }, 3000)
            store.state.wallet.api.client.ws.on('open', async () => {
              error = false
              await store.dispatch('getWalletInfos')
              const polling = setInterval(async () => {
                clearInterval(polling)
                const walletInfos = store.state.wallet.walletInfos
                if (walletInfos && walletInfos.length > 0) {
                  next('/welcome-back/wallet-list')
                } else {
                  next('/ftu/welcome')
                }
              }, 5000)
            })
          }
        }
      },
      children: [
        {
          alias: '',
          name: 'wallet/',
          path: 'wallet',
          component: Wallet,
          children: [
            {
              name: 'transactions',
              path: 'transactions',
              component: Transactions,
            },
          ],
        },
        {
          name: 'request',
          path: 'request',
          component: DataRequest,
          children: [
            {
              name: 'templates',
              path: 'templates',
              component: Templates,
            },
            {
              name: 'editor',
              path: 'editor',
              component: Editor,
            },
          ],
        },
        {
          name: 'community',
          path: 'community',
          component: Community,
        },
        {
          name: 'marketplace',
          path: 'marketplace',
          component: Marketplace,
        },
      ],
    },

    {
      path: '/setup',
      name: 'setup',
      component: Setup,
    },
    {
      path: '/wallet-not-found',
      name: 'runWalletAlert',
      beforeEnter: (to, from, next) => {
        if (process.env.VUE_APP_CLAIMING_PROCESS) {
          const isReady = store.state.wallet.api.client.ws.ready
          if (isReady) {
            redirectOnClaiming(next)
          } else {
            let error = true

            setTimeout(() => {
              if (error) {
                next()
              }
            }, 3000)

            store.state.wallet.api.client.ws.on('open', () => {
              error = false
              redirectOnClaiming(next)
            })
          }
        } else {
          if (store.state.wallet.api.client.ws.ready) {
            const walletInfos = store.state.wallet.walletInfos
            if (walletInfos.length > 0) {
              next('/welcome-back/wallet-list')
            } else {
              next('/ftu/welcome')
            }
          } else {
            let error = true
            setTimeout(() => {
              if (error) {
                next()
              }
            }, 2000)

            store.state.wallet.api.client.ws.on('open', async () => {
              error = false
              await store.dispatch('getWalletInfos')
              const polling = setInterval(() => {
                const walletInfos = store.state.wallet.walletInfos
                clearInterval(polling)
                if (walletInfos.length > 0) {
                  next('/welcome-back/wallet-list')
                } else {
                  next('/ftu/welcome')
                }
              }, 2000)
            })
          }
        }
      },
      component: WalletNotFound,
    },
    {
      path: '/welcome-back',
      name: 'welcomeBack',
      component: WelcomeBack,
      beforeEnter: redirectOnReload,
      children: [
        {
          path: 'unlock/:id',
          component: UnlockWallet,
        },
        {
          path: 'wallet-list',
          component: WalletList,
        },
      ],
    },
    {
      path: `/ftu`,
      name: 'ftu',
      beforeEnter: redirectOnReload,
      component: FirstTimeUsage,
      children: [
        {
          name: 'importWallet',
          path: 'import-wallet',
          component: WalletImport,
        },
        {
          name: 'welcome',
          path: 'welcome',
          component: WelcomeForm,
        },
        {
          name: 'disclaimer',
          path: 'disclaimer',
          component: WalletDisclaimer,
        },
        {
          name: 'encryptionPass',
          path: 'encryption-pass',
          component: WalletEncryptionPassword,
        },
        {
          name: 'seedBackup',
          path: 'seed-backup',
          component: WalletSeedBackup,
        },
        {
          name: 'seedValidation',
          path: 'seed-validation',
          component: WalletSeedValidation,
        },
        {
          name: 'createWallet',
          path: 'create-wallet',
          component: Loading,
        },
      ],
    },
    {
      path: `/claiming`,
      name: 'claiming',
      beforeEnter: redirectOnReload,
      component: ClaimingProcess,
      children: [
        {
          name: 'claimingInstructions',
          path: 'claiming-instructions',
          component: ClaimingInstructions,
        },
        {
          path: 'unlock/:id',
          component: ClaimingUnlockWallet,
        },
        {
          name: 'uploadClaimingFile',
          path: 'upload-file',
          component: UploadClaimingFile,
        },
        {
          name: 'countdown',
          path: 'countdown',
          component: Countdown,
        },
        {
          name: 'claimingVesting',
          path: 'vesting',
          component: Vesting,
        },
        {
          name: 'claimingInformation',
          path: 'disclaimer/:index',
          component: ClaimingWalletDisclaimer,
        },
        {
          name: 'claimingEncryptionPass',
          path: 'encryption-pass',
          component: ClaimingWalletEncryptionPassword,
        },
        {
          name: 'claimingSeedBackup',
          path: 'seed-backup',
          component: ClaimingWalletSeedBackup,
        },
        {
          name: 'claimingSeedValidation',
          path: 'seed-validation',
          component: ClaimingWalletSeedValidation,
        },
        {
          name: 'loading',
          path: 'loading',
          component: ClaimingLoading,
        },
        {
          name: 'generateClaimingAddresses',
          path: 'generate-addresses',
          component: GenerateClaimingAddresses,
        },

        {
          name: 'downloadClaimingFile',
          path: 'download-file',
          component: DownloadClaimingFile,
        },
      ],
    },
  ],
})
