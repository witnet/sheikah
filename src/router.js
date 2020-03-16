import Vue from 'vue'
import Router from 'vue-router'

import Community from '@/components/Community.vue'
import ClaimingProcess from '@/views/ClaimingProcess.vue'
import ClaimingInstructions from '@/components/claiming/Instructions.vue'
import ClaimingCreateWallet from '@/components/claiming/CreateWallet.vue'
import GenerateClaimingAddresses from '@/components/claiming/GenerateAddresses.vue'
import DownloadClaimingFile from '@/components/claiming/DownloadFile.vue'
import ClaimingFileInformation from '@/components/claiming/FileInformation.vue'
import UploadClaimingFile from '@/components/claiming/UploadFile.vue'
import DataRequest from '@/components/DataRequest.vue'
import Editor from '@/components/Editor.vue'
import FirstTimeUsage from '@/views/FirstTimeUsage.vue'
import Home from '@/views/Home.vue'
import Loading from '@/components/steps/Loading.vue'
import Marketplace from '@/components/Marketplace.vue'
import Templates from '@/components/Templates.vue'
import Transactions from '@/components/Transactions.vue'
import UnlockWallet from '@/components/WelcomeBack/UnlockWallet.vue'
import Wallet from '@/components/Wallet.vue'
import WalletDisclaimer from '@/components/steps/WalletDisclaimer.vue'
import WalletEncryptionPassword from '@/components/steps/WalletEncryptionPassword.vue'
import WalletList from '@/components/WelcomeBack/WalletList.vue'
import WalletSeedBackup from '@/components/steps/WalletSeedBackup.vue'
import WalletSeedTypeSelection from '@/components/steps/WalletSeedTypeSelection.vue'
import WalletSeedValidation from '@/components/steps/WalletSeedValidation.vue'
import WelcomeBack from '@/views/WelcomeBack.vue'
import WelcomeForm from '@/components/steps/WelcomeForm.vue'
import WalletImport from '@/components/steps/WalletImport.vue'
import WalletNotFound from '@/components/WalletNotFound.vue'
import Setup from '@/views/Setup.vue'
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

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Home,
      beforeEnter: (to, from, next) => {
        const isReady = store.state.wallet.api.client.ws.ready
        if (isReady) {
          next()
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
            store.dispatch('getWalletInfos')
            const polling = setInterval(() => {
              const isSessionId = store.state.wallet.sessionId
              const walletInfos = store.state.wallet.walletInfos
              const tokenGenerationEventOccurred = store.state.wallet.tokenGenerationEventOccurred
              if (tokenGenerationEventOccurred) {
                clearInterval(polling)
                if (isSessionId) {
                  next()
                } else if (walletInfos.length > 0) {
                  next('/welcome-back/wallet-list')
                } else {
                  next('/ftu/welcome')
                }
              } else {
                clearInterval(polling)
                if (localStorage.getItem('completed')) {
                  // TODO: remove this line, only for development
                  next('/claiming/download-file')
                } else {
                  next('/claiming/claiming-instructions')
                }
              }
            }, 1000)
          })
        }
      },
      children: [
        {
          alias: '',
          name: 'wallet',
          path: 'wallet',
          component: Wallet,
          children: [
            {
              alias: '',
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
        if (store.state.wallet.api.client.ws.ready) {
          next()
        } else {
          let error = true
          setTimeout(() => {
            if (error) {
              next()
            }
          }, 2000)

          store.state.wallet.api.client.ws.on('open', () => {
            error = false
            store.dispatch('getWalletInfos')
            const polling = setInterval(() => {
              const walletInfos = store.state.wallet.walletInfos
              if (Array.isArray(walletInfos)) {
                clearInterval(polling)
                if (walletInfos.length > 0) {
                  next('/welcome-back/wallet-list')
                } else {
                  next('/ftu/welcome')
                }
              }
            }, 1000)
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
          name: 'seedTypeSelection',
          path: 'seed-type-selection',
          component: WalletSeedTypeSelection,
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
          name: 'uploadClaimingFile',
          path: 'upload-file',
          component: UploadClaimingFile,
        },
        {
          name: 'claimingFileInformation',
          path: 'file-information',
          component: ClaimingFileInformation,
        },
        {
          name: 'claimingCreateWallet',
          path: 'create-wallet',
          component: ClaimingCreateWallet,
        },
        {
          name: 'claimingInformation',
          path: 'disclaimer',
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
