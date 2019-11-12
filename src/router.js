import Vue from 'vue'
import Router from 'vue-router'

import Community from '@/components/Community.vue'
import DataRequest from '@/components/DataRequest.vue'
import Editor from '@/components/Editor.vue'
import FirstTimeUsage from '@/views/FirstTimeUsage.vue'
import Home from '@/views/Home.vue'
import Loading from '@/components/steps/Loading.vue'
import Marketplace from '@/components/Marketplace.vue'
import Receive from '@/components/Receive.vue'
import Send from '@/components/Send.vue'
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

import store from '@/store'

Vue.use(Router)

function redirectIfNeccesary(to, from, next) {
  if (store.state.wallet.sessionId) {
    next()
  } else if (store.state.wallet.walletInfos) {
    next('/welcome-back/wallet-list')
  } else {
    next('/ftu/welcome')
  }
}

export default new Router({
  routes: [
    {
      path: '/welcome-back',
      name: 'welcomeBack',
      component: WelcomeBack,
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
      component: FirstTimeUsage,
      children: [
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
      path: '/',
      name: 'main',
      component: Home,
      beforeEnter: redirectIfNeccesary,
      children: [
        {
          name: 'wallet',
          path: 'wallet',
          component: Wallet,
          children: [
            {
              name: 'transactions',
              path: 'transactions',
              component: Transactions,
              // beforeEnter: callGetTransactions,
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
  ],
})
