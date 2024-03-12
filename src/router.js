import { createRouter, createWebHashHistory } from 'vue-router'
import { api } from './main'

import Community from '@/components/Community.vue'
import DataRequest from '@/components/DataRequest.vue'
import Editor from '@/components/Editor.vue'
import FirstTimeUsage from '@/views/FirstTimeUsage.vue'
import Main from '@/views/Main.vue'
import Loading from '@/components/steps/Loading.vue'
import Templates from '@/components/Templates.vue'
import Transactions from '@/views/Transactions.vue'
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

import { SETTINGS_SECTIONS } from '@/constants'

function redirectOnReload(to, from, next) {
  if (api.client.ws.ready || to.href.includes('setup')) {
    next()
  } else {
    next('/')
  }
}

export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
          component: Settings,
        },
        {
          name: SETTINGS_SECTIONS.ADVANCED,
          path: 'advanced',
          component: Settings,
        },
        {
          name: SETTINGS_SECTIONS.NOTIFICATIONS,
          path: 'notifications',
          component: Settings,
        },
        {
          name: SETTINGS_SECTIONS.ABOUT,
          path: 'about',
          component: Settings,
        },
      ],
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        {
          alias: '',
          name: 'wallet',
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
      component: WalletNotFound,
    },
    {
      path: '/welcome-back',
      name: 'welcomeBack',
      component: WelcomeBack,
      beforeEnter: redirectOnReload,
      children: [
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
