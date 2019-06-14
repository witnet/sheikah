import Vue from 'vue'
import Router from 'vue-router'

import Community from '@/components/Community.vue'
import DataRequest from '@/components/DataRequest.vue'
import Editor from '@/components/Editor.vue'
import Marketplace from '@/components/Marketplace.vue'
import Receive from '@/components/Receive.vue'
import Send from '@/components/Send.vue'
import Templates from '@/components/Templates.vue'
import Transaction from '@/components/Transaction.vue'
import Wallet from '@/components/Wallet.vue'
import Loading from '@/components/steps/Loading.vue'
import WalletDisclaimer from '@/components/steps/WalletDisclaimer.vue'
import WalletEncryptionPassword from '@/components/steps/WalletEncryptionPassword.vue'
import WalletSeedBackup from '@/components/steps/WalletSeedBackup.vue'
import WalletSeedTypeSelection from '@/components/steps/WalletSeedTypeSelection.vue'
import WalletSeedValidation from '@/components/steps/WalletSeedValidation.vue'
import WelcomeForm from '@/components/steps/WelcomeForm.vue'
import FirstTimeUsage from '@/views/FirstTimeUsage.vue'
import Home from '@/views/Home.vue'
import WelcomeBack from '@/views/WelcomeBack.vue'
import WalletList from '@/components/WelcomeBack/WalletList.vue'
import UnlockWallet from '@/components/WelcomeBack/UnlockWallet.vue'

import store from '@/store'

Vue.use(Router)

function checkWalletIsOpen (to, from, next) {
  if (store.state.wallet) {
    next()
  } else {
    next('/ftu/welcome')
  }
}

function checkWalletIsNotOpen (to, from, next) {
  if (store.state.wallet) {
    next('/wallet/transactions')
  } else {
    next()
  }
}

export default new Router({
  routes: [
    {
      path: '/welcome-back',
      name: 'welcome-back',
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
      beforeEnter: checkWalletIsNotOpen,
      children: [
        {
          path: 'welcome',
          component: WelcomeForm,
        },
        {
          path: 'disclaimer',
          component: WalletDisclaimer,
        },
        {
          path: 'encryption-pass',
          component: WalletEncryptionPassword,
        },
        {
          path: 'seed-backup',
          component: WalletSeedBackup,
        },
        {
          path: 'seed-type-selection',
          component: WalletSeedTypeSelection,
        },
        {
          path: 'seed-validation',
          component: WalletSeedValidation,
        },
        {
          path: 'create-wallet',
          component: Loading,
        },
      ],
    },
    {
      path: '/',
      name: 'main',
      component: Home,
      beforeEnter: checkWalletIsOpen,
      children: [
        {
          path: 'wallet',
          component: Wallet,
          children: [
            {
              path: 'transactions',
              component: Transaction,
            },
            {
              path: 'receive',
              component: Receive,
            },
            {
              path: 'send',
              component: Send,
            },
          ],
        },
        {
          path: 'request',
          component: DataRequest,
          children: [
            {
              path: 'templates',
              component: Templates,
            },
            {
              path: 'editor',
              component: Editor,
            },
          ],
        },
        {
          path: 'community',
          component: Community,
        },
        {
          path: 'marketplace',
          component: Marketplace,
        },
      ],
    },
  ],
})
