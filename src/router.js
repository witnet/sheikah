import { createRouter } from 'vue-router'
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
import WalletDescription from '@/components/steps/WalletDescription.vue'
import WalletSeedValidation from '@/components/steps/WalletSeedValidation.vue'
import WelcomeBack from '@/views/WelcomeBack.vue'
import WelcomeForm from '@/components/steps/WelcomeForm.vue'
import WalletImport from '@/components/steps/WalletImport.vue'
import ImportXprv from '@/components/steps/ImportXprv.vue'
import DecryptXprv from '@/components/steps/DecryptXprv.vue'
import WalletNotFound from '@/components/WalletNotFound.vue'
import RepeatedWalletDisclaimer from '@/components/steps/RepeatedWalletDisclaimer.vue'
import Setup from '@/views/Setup.vue'
import Settings from '@/views/Settings.vue'
import WalletBirthdate from '@/components/steps/WalletBirthdate.vue'

import store from '@/store'
import { SETTINGS_SECTIONS } from '@/constants'

// Vue.use(Router)
function redirectOnReload(to, from, next) {
  if (store.state.wallet.api.client.ws.ready) {
    next()
  } else {
    next('/')
  }
}

export default createRouter({
  routes: [
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      // Settings view will pass as prop the settings that SettingsSection will render
      children: [
        {
          name: SETTINGS_SECTIONS.GENERAL,
          path: 'general',
        },
        {
          name: SETTINGS_SECTIONS.ADVANCED,
          path: 'advanced',
        },
        {
          name: SETTINGS_SECTIONS.NOTIFICATIONS,
          path: 'notifications',
        },
        {
          name: SETTINGS_SECTIONS.ABOUT,
          path: 'about',
        },
      ],
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      beforeEnter: async (to, from, next) => {
        const isReady = store.state.wallet.api.client.ws.ready

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
            const polling = setInterval(async () => {
              error = false
              clearInterval(polling)
              await store.dispatch('getWalletInfos')
              const walletInfos = store.state.wallet.walletInfos
              const isSessionId = store.state.wallet.sessionId
              if (isSessionId) {
                next()
              } else if (walletInfos && walletInfos.length > 0) {
                next('/welcome-back/wallet-list')
              } else {
                next('/ftu/welcome')
              }
            }, 5000)
          })
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
      beforeEnter: async (to, from, next) => {
        if (store.state.wallet.api.client.ws.ready) {
          await store.dispatch('getWalletInfos')
          const walletInfos = store.state.wallet.walletInfos
          if (walletInfos && walletInfos.length > 0) {
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
              clearInterval(polling)
              const walletInfos = store.state.wallet.walletInfos
              if (walletInfos && walletInfos.length > 0) {
                next('/welcome-back/wallet-list')
              } else {
                next('/ftu/welcome')
              }
            }, 2000)
          })
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
          name: 'importXprv',
          path: 'import-xprv',
          component: ImportXprv,
        },
        {
          name: 'decryptXprv',
          path: 'decrypt-xprv',
          component: DecryptXprv,
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
          name: 'walletDescription',
          path: 'wallet-description',
          component: WalletDescription,
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
        {
          name: 'repeatedWallet',
          path: 'repeated-wallet',
          component: RepeatedWalletDisclaimer,
        },
        {
          name: 'walletBirthDate',
          path: 'wallet-birthdate',
          component: WalletBirthdate,
        },
      ],
    },
  ],
})
