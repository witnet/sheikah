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

Vue.use(Router)

// function redirectOnReload(api) {
//   return (to, from, next) => {
//     if (api.wallet.client.ws.ready) {
//       next()
//     } else {
//       next('/')
//     }
//   }
// }

export default function createRouter({ emit }) {
  return new Router({
    routes: [
      {
        path: '/',
        name: 'main',
        component: Main,
        beforeEnter(to, from, next) {
          emit('ROUTER_BEFORE_ENTER_MAIN')
          next()
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
        name: 'walletNotFound',
        beforeEnter: (to, from, next) => {
          emit('ROUTER_BEFORE_ENTER_WALLET_NOT_FOUND')
          next()
        },
        component: WalletNotFound,
      },
      {
        path: '/welcome-back',
        name: 'welcomeBack',
        component: WelcomeBack,
        // beforeEnter: redirectOnReload(api),
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
        // beforeEnter: redirectOnReload(api),
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
        ],
      },
    ],
  })
}
